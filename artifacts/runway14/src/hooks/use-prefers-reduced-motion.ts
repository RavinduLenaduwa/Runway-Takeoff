import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Tracks the visitor's reduced-motion preference, including changes made while
// the page is open. The server snapshot is "no preference": the pre-rendered
// HTML is built without a visitor, and React switches to the real value right
// after hydrating, so the two never disagree about what was rendered.
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
