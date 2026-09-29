import { useEffect, useState } from "react";
import { Link } from "wouter";

// Section links must carry the deploy base path. A bare "/#services" is an
// absolute URL, so on GitHub Pages it resolves to the domain root and leaves the
// site entirely.
const base = import.meta.env.BASE_URL;
const sectionLinks = [
  { href: `${base}#services`, label: "Services" },
  { href: `${base}#process`, label: "How it works" },
  { href: `${base}#faq`, label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label="Runway 14, home">
          Runway<i>14</i>
        </Link>
        <div className="links">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
        <Link href="/work-with-us" className="btn sm nav-cta">Start a project</Link>
        <button
          type="button"
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="wrap menu-panel">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <Link href="/work-with-us" className="btn" onClick={() => setOpen(false)}>
            Start a project <span className="arrow">&rarr;</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
