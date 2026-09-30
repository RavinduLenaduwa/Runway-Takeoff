import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSectionHref } from "@/hooks/use-section-href";

const sections = [
  { id: "services", label: "Services" },
  { id: "process", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const sectionHref = useSectionHref();
  const sectionLinks = sections.map((s) => ({ href: sectionHref(s.id), label: s.label }));

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
            Start a project
          </Link>
        </div>
      )}
    </nav>
  );
}
