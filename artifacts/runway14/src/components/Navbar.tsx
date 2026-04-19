import { motion } from "framer-motion";
import { Link } from "wouter";
import logoPath from "@assets/Runway_14_1776607219168.png";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white"
    >
      <Link href="/" className="flex items-center gap-2">
        <img src={logoPath} alt="RWY14" className="h-6 w-auto object-contain invert" />
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm tracking-widest font-medium uppercase">
        <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
        <a href="#services" className="hover:opacity-50 transition-opacity">Services</a>
        <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
        <a href="#process" className="hover:opacity-50 transition-opacity">Process</a>
      </div>

      <a href="#contact" className="text-sm font-medium tracking-widest uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300">
        Start Your Project
      </a>
    </motion.nav>
  );
}
