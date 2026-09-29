import { Link } from "wouter";

const base = import.meta.env.BASE_URL;

// Lit pixels sit on the 9px LED pitch so they land exactly on a cell.
const PIXELS = [
  { x: 27, y: 3, d: 0 },
  { x: 44, y: 9, d: 1.1 },
  { x: 71, y: 5, d: 2.3 },
  { x: 96, y: 12, d: 0.6 },
  { x: 118, y: 4, d: 1.8 },
  { x: 139, y: 10, d: 2.9 },
];

function LedBand() {
  return (
    <div className="led-band" aria-hidden="true">
      {PIXELS.map((p) => (
        <span key={`${p.x}-${p.y}`} className="px" style={{ left: p.x * 9 + 3, top: p.y * 9 + 3, animationDelay: `${p.d}s` }} />
      ))}
      <span className="col" />
      <span className="label">RWY 14 &middot; HDG 140&deg;</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <LedBand />
      <div className="foot-grid">
        <div className="foot-col">
          <div className="foot-label">Explore</div>
          <div className="foot-links">
            <a href={`${base}#services`}>Services</a>
            <a href={`${base}#process`}>How it works</a>
            <a href={`${base}#faq`}>FAQ</a>
            <Link href="/work-with-us">Start a project</Link>
          </div>
        </div>
        <div className="foot-col">
          <div className="foot-label">Start with a brief</div>
          <p>A few lines on what you need, about ten minutes. The quote is free, and you decide from there.</p>
          <Link href="/work-with-us" className="btn">Start a project</Link>
        </div>
      </div>
      <div className="foot-bar">
        <span>&copy; {new Date().getFullYear()} Runway 14</span>
        <a href="mailto:hello@runway14.com">hello@runway14.com</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <span className="rt">Remote &middot; USD</span>
      </div>
    </footer>
  );
}
