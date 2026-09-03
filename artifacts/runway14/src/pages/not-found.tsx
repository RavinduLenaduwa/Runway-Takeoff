import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function NotFound() {
  useDocumentTitle("Page Not Found | Runway 14");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-32 pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="text-xs md:text-sm tracking-[0.3em] text-white/50 uppercase mb-8">
            Off Course
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8">
            404
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 max-w-md mx-auto font-light mb-12">
            This page doesn't exist. Let's get you back on the runway.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-sm uppercase bg-white text-black hover:bg-white/90 transition-colors duration-300">
              Back to Runway
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
