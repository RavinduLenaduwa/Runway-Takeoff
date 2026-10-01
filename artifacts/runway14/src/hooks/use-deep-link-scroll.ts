import { useEffect } from "react";

// Arriving at /#faq from another page or a shared link: the browser tries its
// hash jump before React has rendered the section and silently gives up, so
// this does the jump itself. "instant" so a fresh page opens at the section
// instead of gliding down to it from the top, which the smooth scrolling in
// index.css would otherwise do.
//
// One jump is not enough. The page is still set in the fallback font when it
// jumps, and the real fonts swap in a moment later, which shortens the page and
// leaves the section a little off where it was put. So the jump is repeated
// whenever the page's height changes, for a short while, and stops for good as
// soon as the visitor takes over (touch, wheel, key, click or a new hash).
const SETTLE_MS = 3000;

export function useDeepLinkScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    const takeOver = ["wheel", "touchstart", "keydown", "pointerdown", "hashchange"] as const;

    const frame = requestAnimationFrame(jump);
    const observer = new ResizeObserver(jump);
    observer.observe(document.body);
    const timer = window.setTimeout(stop, SETTLE_MS);
    takeOver.forEach((type) => window.addEventListener(type, stop, { passive: true }));

    function stop() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(timer);
      takeOver.forEach((type) => window.removeEventListener(type, stop));
    }
    return stop;
  }, []);
}
