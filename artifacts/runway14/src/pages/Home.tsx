import { motion, useScroll } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { caption, heading, ink } from "@/lib/theme";

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
  useDocumentMeta({
    title: "Runway 14 | Web Apps, Websites, SEO & AI Automation",
    description: "Runway 14 builds web apps, websites, SEO, and AI automation for companies that want software that actually works.",
    path: "",
  });
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
        <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-auto opacity-[0.07] lg:left-auto lg:right-[-6%] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:h-[80%] lg:w-auto lg:opacity-[0.16]"
              viewBox="0 0 620 400"
              fill="none"
              aria-hidden="true"
            >
              {/* "1": flag stroke into the stem, drawn as one line */}
              <motion.path
                d="M370,90 L420,25 L420,320"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
              />
              {/* "4": diagonal + crossbar, then the vertical stroke drawn separately through it */}
              <motion.path
                d="M520,25 L450,235 L600,235"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 1.2 }}
              />
              <motion.path
                d="M520,25 L520,320"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 1.9 }}
              />
            </svg>
            <motion.div
              className="absolute left-0 right-0 top-1/2 h-px bg-white/10"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative w-full max-w-7xl mx-auto flex flex-col items-start text-left mt-20"
          >
            <motion.div variants={fadeUp} className={`${caption} mb-8`}>
              Web Apps · Websites · SEO · AI Automation
            </motion.div>
            <motion.h1 variants={fadeUp} className={`${heading.hero} font-bold tracking-tighter leading-none mb-8`}>
              WE BUILD<br />
              THINGS THAT WORK.
            </motion.h1>
            <motion.p variants={fadeUp} className={`text-lg md:text-xl ${ink.supporting} max-w-2xl font-light mb-12`}>
              Web apps, websites, SEO, and AI automation for businesses that need software to actually work, not just launch.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/work-with-us" className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-sm bg-white text-black overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start Building</span>
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </Link>
              <a href="/#services" className="inline-flex items-center justify-center px-8 py-4 font-medium text-sm border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors duration-300">
                See What We Do
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="hidden sm:flex flex-col items-start gap-2 text-white/30 text-xs mt-16"
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
          </motion.div>
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
              <div className={`${caption} mb-4`}>Studio</div>
              <h2 className={`${heading.section} font-light leading-tight`}>
                Code that<br />
                <span className="font-bold">actually ships.</span>
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`text-lg md:text-xl ${ink.supporting} space-y-8 font-light`}
            >
              <p>
                Runway 14 is a software development startup that turns complex problems into clean, production-ready web applications, built with modern stacks and shipped without the bloat.
              </p>
              <p>
                We work closely with founders, product teams, and growing businesses to deliver custom software that performs from day one and evolves with your needs.
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
              <div className="text-sm text-black/45 mb-4">Capabilities</div>
              <h2 className={`${heading.section} font-bold tracking-tight`}>What We Do</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 border-t border-black/10">
              {[
                { title: "Web Apps", support: "Full-stack web applications tailored to your business logic, workflows, and users." },
                { title: "Websites", support: "Fast, modern marketing and brochure sites that convert visitors into customers." },
                { title: "SEO", support: "On-page and technical SEO fundamentals: structure, speed, and content that search engines actually rank." },
                { title: "AI Automations", support: "Custom AI-powered workflows that cut manual, repetitive work out of your business." },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className={`p-8 md:p-10 ${i > 0 ? "md:border-l border-black/10" : ""}`}
                >
                  <h3 className={`${heading.card} font-bold mb-4`}>{service.title}</h3>
                  <div className="text-black/60 leading-relaxed">{service.support}</div>
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
              <div className={`${caption} mb-4`}>Execution</div>
              <h2 className={`${heading.section} font-bold tracking-tight`}>Scope → Architect → Code → Ship → Iterate</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="flex items-center mb-12"
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="h-2 w-2 rounded-full bg-white shrink-0" />
                  {i < 4 && <div className="h-px flex-1 bg-white/15 mx-2" />}
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
              {[
                { title: "Scope", desc: "We get into the details (requirements, constraints, edge cases) so nothing gets lost in translation." },
                { title: "Architect", desc: "Before writing a line of code, we design the technical foundation: stack, data models, APIs, and infrastructure." },
                { title: "Code", desc: "Focused sprints, clean commits, and continuous delivery: you see progress every week, not every quarter." },
                { title: "Ship", desc: "CI/CD pipelines, staging environments, and production-ready deployments. We don't just hand you files." },
                { title: "Iterate", desc: "Software is never done. We stay involved, fixing, improving, and evolving based on real usage." }
              ].map((phase) => (
                <motion.div
                  key={phase.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                >
                  <h3 className={`${heading.card} font-bold mb-4`}>{phase.title}</h3>
                  <p className={`${ink.supporting} text-sm leading-relaxed`}>{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-16"
            >
              <div className={`${caption} mb-4`}>FAQ</div>
              <h2 className={`${heading.section} font-bold tracking-tight`}>Common Questions</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <Accordion type="single" collapsible>
                {[
                  { q: "What do you actually build?", a: "Web apps, websites, SEO foundations, and AI-driven automations. If it needs to work and actually ship, it's the kind of project we take on." },
                  { q: "How much does a project cost?", a: <>It depends on scope, so we don't publish flat pricing. Tell us what you're building through <Link href="/work-with-us" className="text-white hover:opacity-70 transition-opacity">Work With Us</Link> and we'll follow up with a clear quote before anything begins.</> },
                  { q: "How long does a project take?", a: "Timelines vary by scope. We'll give you a realistic estimate upfront, before you commit to anything, not after." },
                  { q: "Do you work with early-stage startups, or only established businesses?", a: "Both. We build MVPs for founders getting started, and add capacity for teams that already have a product and need to move faster." },
                  { q: "What happens after launch? Do you offer ongoing support?", a: "Software isn't done at launch. We stay involved, fixing, improving, and evolving what we build based on real usage." },
                  { q: "How do I get started?", a: <>Fill out the <Link href="/work-with-us" className="text-white hover:opacity-70 transition-opacity">Work With Us</Link> form with a few details about your project. We'll follow up to map out next steps.</> },
                ].map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="border-white/10">
                    <AccordionTrigger className="text-left text-lg md:text-xl font-medium text-white hover:no-underline hover:opacity-70 py-6">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className={`${ink.supporting} text-base leading-relaxed pb-6`}>
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
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
              GOT AN IDEA?<br />LET’S BUILD IT.
            </motion.h2>
            <motion.p variants={fadeUp} className={`text-lg md:text-xl ${ink.supporting} font-light mb-12`}>
              Tell us what you’re trying to build. We’ll find the fastest path to make it real.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/work-with-us" className="inline-block border border-white px-12 py-6 text-sm font-bold hover:bg-white hover:text-black transition-all duration-300">
                Start a Conversation
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

