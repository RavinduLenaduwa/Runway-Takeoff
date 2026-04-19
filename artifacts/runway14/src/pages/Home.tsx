import { useState, type FormEvent } from "react";
import { motion, useScroll } from "framer-motion";
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
  const [hasExistingProduct, setHasExistingProduct] = useState("no");
  const [submitted, setSubmitted] = useState(false);

  function handleWorkWithUsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const details = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company / Project: ${formData.get("company") || "Not provided"}`,
      "",
      `What are you building?`,
      `${formData.get("project")}`,
      "",
      `Goal:`,
      `${formData.get("goal")}`,
      "",
      `Existing website or product: ${formData.get("existingProduct")}`,
      formData.get("existingProduct") === "yes" ? `URL: ${formData.get("url")}` : "",
      "",
      `Budget: ${formData.get("budget")}`
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:hello@runway14.com?subject=${encodeURIComponent("New RWY14 project inquiry")}&body=${encodeURIComponent(details)}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <Navbar />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />

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
        <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start">
              <motion.div variants={fadeUp}>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
                  READY FOR<br />TAKEOFF?
                </h2>
                <p className="text-lg md:text-xl text-white/50 font-light max-w-xl">
                  Tell us what you’re building. We’ll map the shortest path from idea to launch.
                </p>
              </motion.div>

              <motion.form variants={fadeUp} onSubmit={handleWorkWithUsSubmit} className="space-y-12">
                <div className="space-y-6">
                  <div className="text-xs tracking-[0.25em] uppercase text-white/40">01 / Basics</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Name *</span>
                      <input required name="name" type="text" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                    </label>
                    <label className="block">
                      <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Email *</span>
                      <input required name="email" type="email" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Company / Project Name</span>
                    <input name="company" type="text" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                  </label>
                </div>

                <div className="space-y-6">
                  <div className="text-xs tracking-[0.25em] uppercase text-white/40">02 / Project</div>
                  <label className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">What are you building? *</span>
                    <textarea required name="project" rows={4} className="w-full resize-none bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                  </label>
                  <label className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Goal *</span>
                    <textarea required name="goal" rows={3} className="w-full resize-none bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" placeholder="What are you trying to achieve?" />
                  </label>
                </div>

                <div className="space-y-6">
                  <div className="text-xs tracking-[0.25em] uppercase text-white/40">03 / Product Context</div>
                  <fieldset className="space-y-4">
                    <legend className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Do you have an existing website or product?</legend>
                    <div className="grid grid-cols-2 gap-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className="cursor-pointer border border-white/15 px-4 py-4 text-sm tracking-[0.18em] uppercase text-white/60 transition-colors has-[:checked]:border-white has-[:checked]:text-white">
                          <input
                            required
                            type="radio"
                            name="existingProduct"
                            value={option}
                            checked={hasExistingProduct === option}
                            onChange={() => setHasExistingProduct(option)}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {hasExistingProduct === "yes" && (
                    <motion.label initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="block">
                      <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">URL *</span>
                      <input required name="url" type="url" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" placeholder="https://" />
                    </motion.label>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="text-xs tracking-[0.25em] uppercase text-white/40">04 / Budget</div>
                  <fieldset>
                    <legend className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Budget Range *</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"].map((budget) => (
                        <label key={budget} className="cursor-pointer border border-white/15 px-4 py-4 text-sm tracking-[0.18em] uppercase text-white/60 transition-colors has-[:checked]:border-white has-[:checked]:text-white">
                          <input required type="radio" name="budget" value={budget} className="sr-only" />
                          {budget}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button type="submit" className="border border-white bg-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase text-black transition-all duration-300 hover:bg-black hover:text-white">
                    Send Inquiry
                  </button>
                  {submitted && (
                    <div className="text-sm text-white/50">
                      Draft created. Send it from your email client.
                    </div>
                  )}
                </div>
              </motion.form>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
