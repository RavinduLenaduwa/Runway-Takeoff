export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 md:px-12 lg:px-24 text-center md:text-left text-sm text-white/40 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        RWY14 &copy; {new Date().getFullYear()}
      </div>
      <div className="flex gap-6 uppercase tracking-widest text-xs">
        <a href="mailto:hello@runway14.com" className="hover:text-white transition-colors">hello@runway14.com</a>
      </div>
    </footer>
  );
}
