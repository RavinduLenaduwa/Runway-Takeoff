// A runway at night, seen on final approach, drawn with a plain pinhole
// projection: a light at distance z sits at y = HORIZON + DEPTH / z, and its
// sideways offset shrinks by the same 1/z. That keeps every row of lights
// converging on one vanishing point without hand-placing anything.
const VP_X = 800;
const HORIZON = 330;
const DEPTH = 570;
const HALF_WIDTH = 700;
const THRESHOLD_Z = 2;

const project = (offset: number, z: number) => ({ x: VP_X + offset / z, y: HORIZON + DEPTH / z });
const fade = (z: number) => Math.min(1, Math.max(0.3, 1.15 - z / 28));

const edgeLights: { x: number; y: number; r: number; o: number }[] = [];
for (let z = THRESHOLD_Z; z <= 30; z += 0.5) {
  for (const side of [-1, 1]) {
    const p = project(side * HALF_WIDTH, z);
    edgeLights.push({ ...p, r: Math.max(0.5, 7 / z), o: fade(z) });
  }
}

const centreLights: { x: number; y: number; r: number; o: number }[] = [];
for (let z = THRESHOLD_Z + 0.3; z <= 30; z += 0.6) {
  const p = project(0, z);
  centreLights.push({ ...p, r: Math.max(0.4, 4 / z), o: fade(z) * 0.8 });
}

const thresholdLights = Array.from({ length: 12 }, (_, i) => {
  const offset = -HALF_WIDTH + (i * (HALF_WIDTH * 2)) / 11;
  return { ...project(offset, THRESHOLD_Z), r: 3.2 };
});

// Approach lights before the threshold: narrow barrettes down the centreline,
// one wide crossbar, and a sequenced flasher (the "rabbit") that runs along the
// barrettes toward the runway, one after the next.
const approachBars = [1.03, 1.12, 1.22, 1.33, 1.45, 1.58, 1.72, 1.87].map((z, i) => ({
  z,
  i,
  lights: [-2, -1, 0, 1, 2].map((k) => ({ ...project(k * 24, z), r: 3.4 / z })),
  strobe: { ...project(0, z), r: 7 / z },
}));

const crossbar = Array.from({ length: 17 }, (_, k) => ({ ...project((k - 8) * 36, 1.4), r: 3.4 / 1.4 }))
  .filter((_, k) => Math.abs(k - 8) > 2);

const surface = [
  project(-HALF_WIDTH, THRESHOLD_Z),
  project(HALF_WIDTH, THRESHOLD_Z),
  project(HALF_WIDTH, 30),
  project(-HALF_WIDTH, 30),
]
  .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
  .join(" ");

export function RunwayNight() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {/* Flattened into an ellipse by the transform, and painted on a full-size
            rect so it fades to nothing instead of stopping at a shape's edge. */}
        <radialGradient
          id="rw-horizon"
          cx={VP_X}
          cy={HORIZON}
          r="560"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${VP_X} ${HORIZON}) scale(1.6 0.55) translate(${-VP_X} ${-HORIZON})`}
        >
          <stop offset="0" stopColor="#ff5a1f" stopOpacity="0.24" />
          <stop offset="0.4" stopColor="#ff5a1f" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rw-surface" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#141416" />
          <stop offset="1" stopColor="#0a0a0b" stopOpacity="0" />
        </linearGradient>
        <filter id="rw-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#rw-horizon)" />
      <polygon points={surface} fill="url(#rw-surface)" />

      <g filter="url(#rw-bloom)" opacity="0.65">
        {edgeLights.map((l, i) => <circle key={`eg${i}`} className="rw-edge" cx={l.x} cy={l.y} r={l.r * 2.2} opacity={l.o} />)}
        {thresholdLights.map((l, i) => <circle key={`tg${i}`} className="rw-thr" cx={l.x} cy={l.y} r={l.r * 2.4} />)}
      </g>

      {edgeLights.map((l, i) => <circle key={`e${i}`} className="rw-edge" cx={l.x} cy={l.y} r={l.r} opacity={l.o} />)}
      {centreLights.map((l, i) => <circle key={`c${i}`} className="rw-center" cx={l.x} cy={l.y} r={l.r} opacity={l.o} />)}
      {thresholdLights.map((l, i) => <circle key={`t${i}`} className="rw-thr" cx={l.x} cy={l.y} r={l.r} />)}

      {crossbar.map((l, k) => <circle key={`x${k}`} className="rw-app" cx={l.x} cy={l.y} r={l.r} opacity="0.6" />)}
      {approachBars.map((bar) => (
        <g key={bar.z}>
          {bar.lights.map((l, k) => <circle key={k} className="rw-app" cx={l.x} cy={l.y} r={l.r} opacity="0.7" />)}
          <circle
            className="rw-rabbit"
            cx={bar.strobe.x}
            cy={bar.strobe.y}
            r={bar.strobe.r}
            style={{ animationDelay: `${bar.i * 0.12}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
