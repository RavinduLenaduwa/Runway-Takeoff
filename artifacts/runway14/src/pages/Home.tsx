import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-20"
          >
            <motion.div variants={fadeUp} className="text-xs md:text-sm tracking-[0.3em] text-white/50 uppercase mb-8">
              System 14 Online
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">
              LAUNCH FASTER.<br />
              <span className="text-white/20">SCALE SMARTER.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 max-w-2xl font-light mb-12">
              We build AI-powered products and systems that take your idea from runway to reality.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-sm uppercase bg-white text-black overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Work With Us</span>
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
          >
            <span>Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </section>

        {/* LOGOS / SOCIAL PROOF */}
        <section className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-50 grayscale"
            >
              {["VERTEX", "NEURAL", "QUANTUM", "SYNAPSE", "AETHER"].map((logo) => (
                <motion.div key={logo} variants={fadeUp} className="text-xl md:text-2xl font-bold tracking-widest">
                  {logo}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">[ 01 — Mission ]</h2>
              <div className="text-3xl md:text-5xl font-light leading-tight">
                Less noise.<br />
                <span className="font-bold">More signal.</span>
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-lg md:text-xl text-white/50 space-y-8 font-light"
            >
              <p>
                In an era of endless possibilities, constraint is your greatest asset. We engineer digital products stripped of the non-essential, leaving only what drives growth.
              </p>
              <p>
                Runway 14 was founded on a singular premise: bold ideas require disciplined execution. We don't just build software; we build the infrastructure for acceleration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-24"
            >
              <h2 className="text-xs tracking-[0.2em] text-black/50 uppercase mb-8">[ 02 — Capabilities ]</h2>
              <div className="text-4xl md:text-6xl font-bold tracking-tight">System Architecture</div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { title: "AI Development", desc: "Production-grade AI systems shaped around real use cases, clean data flows, and fast iteration cycles." },
                { title: "Product Engineering", desc: "Focused product builds with the architecture, interfaces, and reliability needed to reach market quickly." },
                { title: "Automation Systems", desc: "Operational workflows that remove drag, connect tools, and turn repeatable work into scalable systems." },
                { title: "Startup Launch Support", desc: "Launch planning, technical execution, and post-launch refinement for teams moving from idea to traction." }
              ].map((service, i) => (
                <motion.div 
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="border-t border-black/10 pt-8"
                >
                  <div className="text-sm font-bold tracking-widest mb-6">0{i + 1}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-black/60 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-24"
            >
              <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">[ 03 — Execution ]</h2>
              <div className="text-4xl md:text-6xl font-bold tracking-tight">Discover → Build → Launch → Scale</div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { step: "01", title: "Discover", desc: "Define the opportunity, the user, and the smallest path to meaningful traction." },
                { step: "02", title: "Build", desc: "Engineer the core product and systems with speed, clarity, and scalable foundations." },
                { step: "03", title: "Launch", desc: "Ship the experience, validate in market, and remove friction from the first mile." },
                { step: "04", title: "Scale", desc: "Refine the system, automate operations, and prepare the product for accelerated growth." }
              ].map((phase, i) => (
                <motion.div 
                  key={phase.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="border-t border-white/10 pt-8 relative"
                >
                  <div className="text-xs font-mono tracking-widest text-white/50 mb-6">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / CASE STUDIES */}
        <section id="work" className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
            >
              <div>
                <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">[ 04 — Deployment ]</h2>
                <div className="text-4xl md:text-6xl font-bold tracking-tight">Recent Launches</div>
              </div>
            </motion.div>

            <div className="space-y-32">
              {[
                { name: "Aura AI", role: "AI Workflow Platform", metric: "10x Faster Processing" },
                { name: "Nexus", role: "Fintech Infrastructure", metric: "$50M Processed Monthly" },
                { name: "Vanguard", role: "Enterprise Analytics", metric: "Zero Downtime" }
              ].map((project, i) => (
                <motion.div 
                  key={project.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className="group cursor-pointer"
                >
                  <div className="w-full h-[40vh] md:h-[60vh] bg-white/5 mb-8 relative overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                    <div className="w-1/2 h-1/2 bg-white/10 rotate-45 group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{project.name}</h3>
                      <p className="text-white/50">{project.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tracking-widest uppercase text-white/30 mb-1">Impact</div>
                      <div className="font-mono">{project.metric}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/10 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
              READY FOR<br />TAKEOFF?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 font-light mb-12">
              Your runway is finite. Let's accelerate your timeline.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="mailto:hello@runway14.com" className="inline-block border border-white px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                Work With Us
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
