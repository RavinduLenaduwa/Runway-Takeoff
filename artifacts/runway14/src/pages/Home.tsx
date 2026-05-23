import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });
  const glow1X = useTransform(smoothX, (v) => v * 40);
  const glow1Y = useTransform(smoothY, (v) => v * 40);
  const glow2X = useTransform(smoothX, (v) => v * -60);
  const glow2Y = useTransform(smoothY, (v) => v * -30);
  const glow3X = useTransform(smoothX, (v) => v * -30);
  const glow3Y = useTransform(smoothY, (v) => v * 50);
  const gridX = useTransform(smoothX, (v) => v * -20);
  const gridY = useTransform(smoothY, (v) => v * -20);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

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
              className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[120vmin] w-[120vmin]"
              style={{ x: glow1X, y: glow1Y }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16)_0%,transparent_60%)]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-1/3 -left-1/4 h-[90vmin] w-[90vmin]"
              style={{ x: glow2X, y: glow2Y }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute -top-1/4 -right-1/4 h-[80vmin] w-[80vmin]"
              style={{ x: glow3X, y: glow3Y }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
                maskImage:
                  "radial-gradient(circle at center, black 10%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 10%, transparent 80%)",
                x: gridX,
                y: gridY,
              }}
              animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              initial={{ top: "10%", opacity: 0 }}
              animate={{ top: ["5%", "95%"], opacity: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
              initial={{ left: "15%", opacity: 0 }}
              animate={{ left: ["15%", "85%"], opacity: [0, 0.8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {[
              { top: "18%", left: "12%", d: 4 },
              { top: "32%", left: "82%", d: 5 },
              { top: "68%", left: "22%", d: 6 },
              { top: "78%", left: "70%", d: 4.5 },
              { top: "46%", left: "92%", d: 5.5 },
              { top: "22%", left: "55%", d: 7 },
              { top: "58%", left: "8%", d: 5 },
              { top: "85%", left: "45%", d: 6 },
              { top: "12%", left: "38%", d: 5 },
            ].map((p, i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{ top: p.top, left: p.left }}
                animate={{ opacity: [0.2, 1, 0.2], y: [0, -24, 0] }}
                transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
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
              Global Digital Product Studio
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">
              LAUNCH FASTER.<br />
              <span className="text-white/20">SCALE SMARTER.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 max-w-2xl font-light mb-12">
              We design and build high-performance websites, business systems, and digital products that help ambitious businesses move faster and scale smarter.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/work-with-us" className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-sm uppercase bg-white text-black overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start Your Project</span>
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
              <a href="/#work" className="inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-sm uppercase border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors duration-300">
                Explore Our Work
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
              Trusted by ambitious businesses worldwide
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

        {/* STATS */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
            >
              {[
                { value: 12, suffix: "", label: "Launches Shipped" },
                { value: 4, suffix: "", label: "Industries Served" },
                { value: 2, suffix: " wks", label: "Avg Ramp Time" },
                { value: 100, suffix: "%", label: "Founder Focus" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center md:text-left">
                  <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-3">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs tracking-[0.25em] uppercase text-white/40">
                    {stat.label}
                  </div>
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
              <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">[ 01 — Studio ]</h2>
              <div className="text-3xl md:text-5xl font-light leading-tight">
                Ideas into<br />
                <span className="font-bold">powerful products.</span>
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
                Runway 14 is a digital product studio helping businesses transform ideas into powerful digital experiences.
              </p>
              <p>
                By combining strategic thinking, rapid development workflows, and modern product execution, we deliver software solutions built for speed, scalability, and impact.
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
              <div className="text-4xl md:text-6xl font-bold tracking-tight">What We Build</div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { title: "Product Development", statement: "End-to-end.", support: "Full digital product design and development from concept to launch." },
                { title: "Website Engineering", statement: "Performance first.", support: "Conversion-focused websites built for growth and speed." },
                { title: "Business Systems", statement: "Streamline everything.", support: "Custom internal platforms that automate workflows and operations." },
                { title: "MVP Launch", statement: "Validate fast.", support: "Rapid validation and launch for startup ideas." },
                { title: "Digital Transformation", statement: "Modernise at scale.", support: "Solutions that optimise business processes for the long run." },
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
              <div className="text-4xl md:text-6xl font-bold tracking-tight">Discover → Define → Build → Launch → Scale</div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
              {[
                { step: "01", title: "Discover", desc: "Understand business goals, identify opportunities, and map the clearest path forward." },
                { step: "02", title: "Define", desc: "Shape the product strategy, scope, and architecture before a single line of code is written." },
                { step: "03", title: "Build", desc: "Rapid development and iteration — shipping working software at every milestone." },
                { step: "04", title: "Launch", desc: "Deploy with precision. Go live with confidence and remove friction from day one." },
                { step: "05", title: "Scale", desc: "Optimise, automate, and evolve the product for long-term growth and impact." }
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
                <h2 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">[ 04 — Portfolio ]</h2>
                <div className="text-4xl md:text-6xl font-bold tracking-tight">Digital products crafted for modern businesses.</div>
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
        <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/10 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100vmin] w-[100vmin]"
              style={{ x: glow1X, y: glow1Y }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,transparent_60%)]"
                animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-1/4 -right-1/4 h-[70vmin] w-[70vmin]"
              style={{ x: glow2X, y: glow2Y }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
                maskImage:
                  "radial-gradient(circle at center, black 10%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 10%, transparent 80%)",
                x: gridX,
                y: gridY,
              }}
              animate={{ backgroundPosition: ["0px 0px", "70px 70px"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
              BUILD WHAT’S<br />NEXT.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 font-light mb-12">
              Let’s create digital products that move your business forward.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/work-with-us" className="inline-block border border-white px-12 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                Book a Discovery Call
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
