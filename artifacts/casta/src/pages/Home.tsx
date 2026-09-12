import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { block, container, heading, ink, shell } from "@/lib/theme";

const services = [
  { title: "Web Apps", support: "Full-stack web applications tailored to your business logic, workflows, and users." },
  { title: "Websites", support: "Fast, modern marketing and brochure sites that convert visitors into customers." },
  { title: "SEO", support: "On-page and technical SEO fundamentals: structure, speed, and content that search engines actually rank." },
  { title: "AI Automations", support: "Custom AI-powered workflows that cut manual, repetitive work out of your business." },
];

const phases = [
  { title: "Scope", desc: "We get into the details (requirements, constraints, edge cases) so nothing gets lost in translation." },
  { title: "Architect", desc: "Before writing a line of code, we design the technical foundation: stack, data models, APIs, and infrastructure." },
  { title: "Code", desc: "Focused sprints, clean commits, and continuous delivery: you see progress every week, not every quarter." },
  { title: "Ship", desc: "CI/CD pipelines, staging environments, and production-ready deployments. We don't just hand you files." },
  { title: "Iterate", desc: "Software is never done. We stay involved, fixing, improving, and evolving based on real usage." },
];

/**
 * The wordmark as a cast slug: a solid block with CASTA struck out of it, so the
 * page's own black shows through the letterforms. textLength pins the glyph run to
 * the block's width, which keeps the cut identical whether or not Archivo has loaded.
 */
function CastMark() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <svg viewBox="0 0 1000 300" className="block w-full h-auto" role="img" aria-label="Casta">
        <mask id="casta-slug" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="300">
          <rect width="1000" height="300" fill="white" />
          <text
            x="500"
            y="235"
            textAnchor="middle"
            textLength="860"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="Archivo, sans-serif"
            fontWeight="800"
            fontStretch="125%"
            fontSize="230"
            fill="black"
          >
            CASTA
          </text>
        </mask>
        <rect width="1000" height="300" fill="white" mask="url(#casta-slug)" />
      </svg>
    </motion.div>
  );
}

export default function Home() {
  useDocumentMeta({
    title: "Casta | Web Apps, Websites, SEO & AI Automation",
    description: "Casta builds web apps, websites, SEO, and AI automation for companies that want software that actually works.",
    path: "",
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />

      <main>
        {/* HERO */}
        <section className={`${shell} pt-32 pb-24 md:pt-44 md:pb-32`}>
          <div className={container}>
            <CastMark />

            <div className="mt-12 md:mt-16 max-w-2xl">
              <h1 className={`${heading.hero} font-semibold tracking-tight`}>
                We build things that work.
              </h1>
              <p className={`mt-5 text-base md:text-lg ${ink.supporting} leading-relaxed`}>
                Web apps, websites, SEO, and AI automation for businesses that need software to actually work, not just launch.
              </p>
              <Link
                href="/work-with-us"
                className="mt-10 inline-block border border-white px-8 py-4 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
              >
                Start building
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`${shell} ${block} border-t border-white/10`}>
          <div className={`${container} grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}>
            <h2 className={`${heading.section} font-semibold tracking-tight`}>
              Code that actually ships.
            </h2>
            <div className={`space-y-6 text-base md:text-lg ${ink.supporting} leading-relaxed`}>
              <p>
                Casta is a software development studio that turns complex problems into clean, production-ready web applications, built with modern stacks and shipped without the bloat.
              </p>
              <p>
                We work closely with founders, product teams, and growing businesses to deliver custom software that performs from day one and evolves with your needs.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className={`${shell} ${block} border-t border-white/10`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-14 md:mb-20`}>
              What we do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-b border-white/10 gap-x-10">
              {services.map((service) => (
                <div key={service.title} className="border-t border-white/10 py-8 xl:py-10">
                  <h3 className={`${heading.card} font-semibold mb-3`}>{service.title}</h3>
                  <p className={`text-sm ${ink.supporting} leading-relaxed`}>{service.support}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className={`${shell} ${block} border-t border-white/10`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-14 md:mb-20`}>
              Scope → Architect → Code → Ship → Iterate
            </h2>
            <ol className="border-b border-white/10">
              {phases.map((phase) => (
                <li
                  key={phase.title}
                  className="border-t border-white/10 py-6 md:py-8 grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr] md:gap-10"
                >
                  <h3 className={`${heading.card} font-semibold`}>{phase.title}</h3>
                  <p className={`text-sm md:text-base ${ink.supporting} leading-relaxed max-w-2xl`}>{phase.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${shell} ${block} border-t border-white/10`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-10 md:mb-14`}>
              Common questions
            </h2>
            <Accordion type="single" collapsible className="max-w-3xl">
              {[
                { q: "What do you actually build?", a: "Web apps, websites, SEO foundations, and AI-driven automations. If it needs to work and actually ship, it's the kind of project we take on." },
                { q: "How much does a project cost?", a: <>It depends on scope, so we don't publish flat pricing. Tell us what you're building through <Link href="/work-with-us" className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity">Work With Us</Link> and we'll follow up with a clear quote before anything begins.</> },
                { q: "How long does a project take?", a: "Timelines vary by scope. We'll give you a realistic estimate upfront, before you commit to anything, not after." },
                { q: "Do you work with early-stage startups, or only established businesses?", a: "Both. We build MVPs for founders getting started, and add capacity for teams that already have a product and need to move faster." },
                { q: "What happens after launch? Do you offer ongoing support?", a: "Software isn't done at launch. We stay involved, fixing, improving, and evolving what we build based on real usage." },
                { q: "How do I get started?", a: <>Fill out the <Link href="/work-with-us" className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity">Work With Us</Link> form with a few details about your project. We'll follow up to map out next steps.</> },
              ].map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-white/10">
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white hover:no-underline hover:opacity-70 py-6">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className={`${ink.supporting} text-sm md:text-base leading-relaxed pb-6 max-w-2xl`}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className={`${shell} ${block} border-t border-white/10`}>
          <div className={container}>
            <div className="max-w-3xl">
              <h2 className={`${heading.section} font-semibold tracking-tight`}>
                Got an idea? Let's build it.
              </h2>
              <p className={`mt-5 text-base md:text-lg ${ink.supporting} leading-relaxed`}>
                Tell us what you're trying to build. We'll find the fastest path to make it real.
              </p>
              <Link
                href="/work-with-us"
                className="mt-10 inline-block border border-white px-8 py-4 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
