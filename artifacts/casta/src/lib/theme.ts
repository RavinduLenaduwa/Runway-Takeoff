// Two ink strengths on a true-black ground, both cleared for AA contrast:
// white/60 lands at ~7.4:1 and white/50 at ~5.3:1 against #000.
export const ink = {
  primary: "text-white",
  supporting: "text-white/60",
  faint: "text-white/50",
} as const;

export const heading = {
  hero: "text-3xl md:text-4xl",
  section: "text-2xl md:text-4xl",
  card: "text-lg md:text-xl",
} as const;

export const caption = "text-sm text-white/50";

export const rule = "border-white/10";

export const shell = "px-6 md:px-12 lg:px-24";
export const block = "py-28 md:py-40";
export const container = "max-w-6xl mx-auto";
