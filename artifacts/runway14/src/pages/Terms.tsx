import { motion, useScroll } from "framer-motion";
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

export default function Terms() {
  useDocumentTitle("Terms of Service | Runway 14");
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <Navbar />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="px-6 md:px-12 lg:px-24">
        <section className="pt-40 md:pt-48 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Link href="/" className="inline-block text-xs tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors mb-10">
                Back to runway
              </Link>
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-8">Legal</div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                TERMS OF<br />SERVICE.
              </h1>
              <p className="text-lg text-white/50 font-light">Last updated 2026</p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-12 text-white/60 font-light leading-relaxed">
              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">This website</h2>
                <p>
                  This site is provided as-is, to introduce Runway 14 and let you get in touch about a project. It's provided without warranties of any kind, and we may update or change it at any time.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Project engagements</h2>
                <p>
                  Reaching out through the Work With Us form or by email doesn't create a contract. Actual project work, scope, pricing, timelines, and deliverables are agreed separately in writing before any work begins.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Intellectual property</h2>
                <p>
                  The content, design, and branding on this site belong to Runway 14. For client projects, ownership and licensing of the delivered work is defined in that project's own agreement.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Contact</h2>
                <p>
                  Questions about these terms can go to <a href="mailto:hello@runway14.com" className="text-white hover:opacity-60 transition-opacity">hello@runway14.com</a>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
