// Two ink strengths only: full white for headings/primary, one fixed grey for
// supporting copy. Replaces the previous ad hoc mix of white/40, /50, /60, /70
// used interchangeably across sections for no structural reason.
export const ink = {
  primary: "text-white",
  supporting: "text-white/45",
} as const;

// Named panel/hairline greys instead of stacking translucent whites on
// different backgrounds.
export const panel = {
  bg: "bg-[#141414]",
  border: "border-[#1f1f1f]",
} as const;

// A real graduated scale so headings relate to each other with intention,
// instead of every section reaching for the same text-4xl md:text-6xl combo.
export const heading = {
  hero: "text-6xl md:text-8xl lg:text-9xl",
  section: "text-3xl md:text-5xl",
  card: "text-xl md:text-2xl",
} as const;

// A quiet, non-shouting caption for section labels: normal case, no forced
// letter-spacing. Reserve uppercase+tracking for deliberate one-off moments,
// not the default voice for every label on the page.
export const caption = "text-sm text-white/40";
