// Blocky tints behind each mock-up, so the orange reads as a lit surface rather
// than a flat fill. Positions are percentages of the panel.
const LAYOUTS = [
  [
    { l: 0, t: 0, w: 16, h: 100, c: "#e8490f" },
    { l: 84, t: 0, w: 16, h: 100, c: "#ff7a45" },
    { l: 90, t: 0, w: 10, h: 38, c: "#ff9d73" },
    { l: 0, t: 70, w: 34, h: 30, c: "#c93b08" },
    { l: 0, t: 88, w: 100, h: 12, c: "#ff7a45" },
    { l: 95, t: 74, w: 5, h: 26, c: "#ffb000" },
  ],
  [
    { l: 0, t: 0, w: 100, h: 14, c: "#ff7a45" },
    { l: 0, t: 0, w: 12, h: 60, c: "#ff9d73" },
    { l: 82, t: 14, w: 18, h: 86, c: "#e8490f" },
    { l: 0, t: 78, w: 58, h: 22, c: "#c93b08" },
    { l: 88, t: 0, w: 12, h: 14, c: "#ffb000" },
  ],
  [
    { l: 0, t: 0, w: 20, h: 100, c: "#ff7a45" },
    { l: 0, t: 0, w: 20, h: 26, c: "#ff9d73" },
    { l: 80, t: 0, w: 20, h: 62, c: "#c93b08" },
    { l: 50, t: 86, w: 50, h: 14, c: "#e8490f" },
    { l: 0, t: 92, w: 30, h: 8, c: "#ffb000" },
  ],
];

export function Mosaic({ variant }: { variant: number }) {
  return (
    <div className="mosaic" aria-hidden="true">
      {LAYOUTS[variant % LAYOUTS.length].map((b, i) => (
        <i key={i} style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%`, background: b.c }} />
      ))}
    </div>
  );
}
