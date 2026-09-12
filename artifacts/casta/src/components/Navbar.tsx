import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { ink, line } from "@/lib/theme";

const sectionLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 border-b ${line.rule} bg-[var(--ground)]/90 px-6 py-4 backdrop-blur md:px-10 lg:px-16`}
      >
        <Link href="/" className="font-semibold tracking-tight text-base leading-none">
          Casta
        </Link>

        <div className={`hidden md:flex items-center gap-7 text-sm ${ink.supporting}`}>
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[var(--ink)] transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/work-with-us"
            className={`hidden sm:inline-block border ${line.strong} px-4 py-2 text-sm transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)]`}
          >
            Work With Us
          </Link>
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 -m-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 overflow-y-auto bg-[var(--ground)] px-6 transition-opacity duration-200 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold tracking-tight"
          >
            {link.label}
          </a>
        ))}
        <Link
          href="/work-with-us"
          onClick={() => setIsOpen(false)}
          className={`mt-2 inline-flex border ${line.strong} px-5 py-3 text-sm transition-colors hover:border-[var(--ink)]`}
        >
          Work With Us
        </Link>
      </div>
    </>
  );
}
