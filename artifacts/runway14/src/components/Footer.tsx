import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 md:px-12 lg:px-24 text-sm text-white/40 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <div className="font-bold tracking-tight text-white/60 mb-1">Runway 14</div>
        <div className="text-xs tracking-[0.15em] uppercase">Digital Products. Built to Scale.</div>
      </div>
      <div className="text-xs tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Runway 14. All rights reserved.
      </div>
      <div className="flex flex-col md:items-end gap-3">
        <div className="flex gap-6 uppercase tracking-widest text-xs">
          <a href="mailto:hello@runway14.com" className="hover:text-white transition-colors">hello@runway14.com</a>
        </div>
        <div className="flex gap-6 uppercase tracking-widest text-xs">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
