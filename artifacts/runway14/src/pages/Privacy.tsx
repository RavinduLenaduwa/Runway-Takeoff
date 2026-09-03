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

export default function Privacy() {
  useDocumentTitle("Privacy Policy | Runway 14");
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
                PRIVACY<br />POLICY.
              </h1>
              <p className="text-lg text-white/50 font-light">Last updated 2026</p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-12 text-white/60 font-light leading-relaxed">
              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">What we collect</h2>
                <p>
                  The Work With Us form asks for your name, email, company or project name, and details about what you're building. That's the only personal information this site collects.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">How it's handled</h2>
                <p>
                  Submitting the form opens a draft email in your own email client, addressed to hello@runway14.com. Your information is not sent to or stored on any Runway 14 server, and it doesn't touch a database, a form backend, or a third-party service. If you don't send the email, we never receive anything.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Cookies and tracking</h2>
                <p>
                  This site doesn't use analytics, tracking cookies, or advertising pixels. Nothing about your visit is recorded.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Questions</h2>
                <p>
                  Reach us at <a href="mailto:hello@runway14.com" className="text-white hover:opacity-60 transition-opacity">hello@runway14.com</a> with any questions about this policy.
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
