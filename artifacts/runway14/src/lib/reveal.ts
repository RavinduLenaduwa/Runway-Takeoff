import type { CSSProperties } from "react";

export type RevealKind = "up" | "left" | "right" | "scale";

// Spread onto any element to have it ease into view. The delay staggers
// siblings; the kind picks where it comes from. The CSS and the observer that
// act on these attributes live in index.css and use-scroll-reveal.ts.
export const reveal = (delay = 0, kind: RevealKind = "up") => ({
  "data-reveal": kind,
  style: { "--d": `${delay}ms` } as CSSProperties,
});
