import { Link } from "wouter";
import { container, ink, line, shell } from "@/lib/theme";

export function Footer() {
  return (
    <footer className={`border-t ${line.rule} ${shell} py-10 text-sm`}>
      <div className={`${container} flex flex-col gap-8 md:flex-row md:justify-between`}>
        <div>
          <div className="font-semibold tracking-tight mb-1">Casta</div>
          <div className={ink.supporting}>Digital products, built to scale.</div>
        </div>
        <div className={`flex flex-col gap-2 md:items-end ${ink.supporting}`}>
          <a href="mailto:hello@casta.dev" className="hover:text-[var(--ink)] transition-colors">
            hello@casta.dev
          </a>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[var(--ink)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--ink)] transition-colors">Terms</Link>
          </div>
          <div>&copy; {new Date().getFullYear()} Casta. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
