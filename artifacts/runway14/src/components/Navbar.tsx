import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const mobileLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] px-6 py-6 mix-blend-difference text-white"
      >
        <Link href="/" className="col-start-1 flex items-center gap-2 font-bold tracking-tight text-base md:text-lg leading-none">
          <span>Runway</span>
          <span className="inline-flex items-center justify-center border border-current px-1.5 py-1 text-xs leading-none">14</span>
        </Link>

        <div className="col-start-2 hidden md:flex items-center justify-center gap-8 text-sm tracking-widest font-medium uppercase">
          {mobileLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-50 transition-opacity">{link.label}</a>
          ))}
        </div>

        <div className="col-start-3 flex items-center justify-self-end gap-4">
          <Link href="/work-with-us" className="text-sm font-medium tracking-widest uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300">
            Work With Us
          </Link>
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 -m-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-black text-white md:hidden"
          >
            {mobileLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                className="text-3xl font-bold tracking-tight uppercase"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + mobileLinks.length * 0.05, duration: 0.4 }}
            >
              <Link
                href="/work-with-us"
                onClick={() => setIsOpen(false)}
                className="inline-flex text-sm font-medium tracking-widest uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
              >
                Work With Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
