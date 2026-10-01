import { useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

// A client-side route change keeps the old scroll position, so following the
// footer's Privacy link from the bottom of a page would open the new page at its
// bottom. Jump to the top instead. "instant" so the smooth scrolling in index.css
// doesn't glide there. Skips the first render (a reload keeps the browser's own
// restored position) and any URL with a hash, which Home scrolls to itself.
export function useScrollToTop() {
  const [path] = useLocation();
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);
}
