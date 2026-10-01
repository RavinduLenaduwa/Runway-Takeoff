import { Link } from "wouter";

export function Footer() {
  return (
    <>
      <div className="threshold" aria-hidden="true" />
      <footer className="site-footer">
        <div className="wrap">
          <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Runway 14</span>
          <a href="mailto:hello@runway14.com">hello@runway14.com</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span className="rt" aria-hidden="true">RWY 14 &middot; HDG 140&deg;</span>
        </div>
      </footer>
    </>
  );
}
