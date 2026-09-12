// Instrument palette. Contrast on --ground (#0D1013): ink 15.5:1, dim 6.1:1,
// signal 10.3:1 — all clear AA. Signal amber means machine-reported state, and
// nothing else: live measurements and validation faults. Used anywhere it isn't
// reporting state, it stops reading as a signal and becomes decoration.
export const ink = {
  primary: "text-[var(--ink)]",
  supporting: "text-[var(--ink-dim)]",
  signal: "text-[var(--signal)]",
} as const;

export const surface = {
  ground: "bg-[var(--ground)]",
  panel: "bg-[var(--panel)]",
} as const;

export const line = {
  rule: "border-[var(--rule)]",
  strong: "border-[var(--rule-strong)]",
} as const;

// Modest scale. Nothing is large purely to be large — the information carries
// the page, not the type size.
export const heading = {
  hero: "text-[1.75rem] leading-[1.2] md:text-[2.5rem]",
  section: "text-xl md:text-2xl",
  card: "text-base md:text-lg",
} as const;

export const mono = "font-mono tabular-nums";

export const shell = "px-6 md:px-10 lg:px-16";
export const block = "py-20 md:py-28";
export const container = "max-w-5xl mx-auto";
