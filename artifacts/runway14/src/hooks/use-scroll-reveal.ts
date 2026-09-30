import { useEffect } from "react";
import { useLocation } from "wouter";

// Watches every [data-reveal] element on the current page and marks it .is-in
// once it scrolls into view, so the CSS can animate it. Runs again on each
// route change, since each page mounts its own elements.
export function useScrollReveal() {
  const [location] = useLocation();

  useEffect(() => {
    // Tells main.tsx the reveal system is running, so its failsafe can stand down.
    document.documentElement.setAttribute("data-reveal-live", "");

    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")];

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);
}
