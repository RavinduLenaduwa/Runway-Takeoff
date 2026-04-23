import { motion, useScroll } from "framer-motion";
import { Link } from "wouter";
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
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <Navbar />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[120vmin] w-[120vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_60%)]"
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/3 -left-1/4 h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]"
              animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-1/4 -right-1/4 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,transparent_70%)]"
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                maskImage:
                  "radial-gradient(circle at center, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 0%, transparent 70%)",
              }}
              animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ top: "10%", opacity: 0 }}
              animate={{ top: ["10%", "90%"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
              initial={{ left: "20%", opacity: 0 }}
              animate={{ left: ["20%", "80%"], opacity: [0, 0.4, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            {[
              { top: "18%", left: "12%", d: 6 },
              { top: "32%", left: "82%", d: 8 },
              { top: "68%", left: "22%", d: 10 },
              { top: "78%", left: "70%", d: 7 },
              { top: "46%", left: "92%", d: 9 },
              { top: "22%", left: "55%", d: 11 },
            ].map((p, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/40"
                style={{ top: p.top, left: p.left }}
                animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -12, 0] }}
                transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              />
            ))}
          </div>
          
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
              <Link href="/work-with-us" className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-sm uppercase bg-white text-black overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Work With Us</span>
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
          >
            <span>Scroll</span>
            <div className="h-12 w-[1px] overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-full origin-top bg-white/50"
                animate={{ scaleY: [0, 1, 0], y: ["-100%", "0%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        {/* LOGOS / SOCIAL PROOF */}
        <section className="py-20 border-y border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-10">
            <div className="text-xs tracking-[0.3em] uppercase text-white/40 text-center">
              Trusted by builders shipping at speed
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            <motion.div
              className="flex gap-20 whitespace-nowrap will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 2 }).flatMap((_, i) =>
                ["VERTEX", "NEURAL", "QUANTUM", "SYNAPSE", "AETHER", "HELIX", "ORBIT", "PARALLAX"].map((logo) => (
                  <div
                    key={`${logo}-${i}`}
                    className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-white/40 shrink-0"
                  >
                    {logo}
                  </div>
                ))
              )}
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
              <div className="text-4xl md:text-6xl font-bold tracking-tight">Services</div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { title: "Scoping", statement: "Define the mission.", support: "Map the fastest path to launch." },
                { title: "Product Design", statement: "Design that moves.", support: "Clear flows. Sharp interfaces. Built for action." },
                { title: "MVPs", statement: "Validate fast.", support: "Test the idea before scaling the build." },
                { title: "Development", statement: "Built to scale.", support: "Fast, secure systems ready for production." },
                { title: "Operations", statement: "Always live.", support: "Deploy, monitor, and keep performance steady." },
                { title: "Automation", statement: "Work less.", support: "Systems that remove drag and compound speed." },
                { title: "Team Design", statement: "Structure for speed.", support: "Roles, workflows, and rituals that scale execution." },
                { title: "AI Strategy", statement: "Apply AI clearly.", support: "Automate, optimize, and unlock product leverage." }
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
                  <div className="space-y-2 leading-relaxed">
                    <div className="text-black font-medium">{service.statement}</div>
                    <div className="text-black/60">{service.support}</div>
                  </div>
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
              Tell us what you’re building. We’ll map the shortest path from idea to launch.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/work-with-us" className="inline-block border border-white px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                Work With Us
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
