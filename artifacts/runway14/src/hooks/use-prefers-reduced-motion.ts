import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Tracks the visitor's reduced-motion preference, including changes made while
// the page is open.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
