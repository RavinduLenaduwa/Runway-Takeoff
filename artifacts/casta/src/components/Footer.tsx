import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 md:px-12 lg:px-24 text-sm text-white/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <div className="font-semibold tracking-tight text-white mb-1">Casta</div>
          <div>Digital products, built to scale.</div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a href="mailto:hello@casta.dev" className="hover:text-white transition-colors">hello@casta.dev</a>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-white/50">&copy; {new Date().getFullYear()} Casta. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
