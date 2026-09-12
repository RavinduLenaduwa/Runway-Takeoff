import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageMetrics } from "@/components/PageMetrics";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { block, container, heading, ink, line, shell } from "@/lib/theme";

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

const faqs = [
  { q: "What do you actually build?", a: "Web apps, websites, SEO foundations, and AI-driven automations. If it needs to work and actually ship, it's the kind of project we take on." },
  { q: "How much does a project cost?", a: <>It depends on scope, so we don't publish flat pricing. Tell us what you're building through <Link href="/work-with-us" className="underline underline-offset-4 hover:text-[var(--signal)] transition-colors">Work With Us</Link> and we'll follow up with a clear quote before anything begins.</> },
  { q: "How long does a project take?", a: "Timelines vary by scope. We'll give you a realistic estimate upfront, before you commit to anything, not after." },
  { q: "Do you work with early-stage startups, or only established businesses?", a: "Both. We build MVPs for founders getting started, and add capacity for teams that already have a product and need to move faster." },
  { q: "What happens after launch? Do you offer ongoing support?", a: "Software isn't done at launch. We stay involved, fixing, improving, and evolving what we build based on real usage." },
  { q: "How do I get started?", a: <>Fill out the <Link href="/work-with-us" className="underline underline-offset-4 hover:text-[var(--signal)] transition-colors">Work With Us</Link> form with a few details about your project. We'll follow up to map out next steps.</> },
];

export default function Home() {
  useDocumentMeta({
    title: "Casta | Web Apps, Websites, SEO & AI Automation",
    description: "Casta builds web apps, websites, SEO, and AI automation for companies that want software that actually works.",
    path: "",
  });

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <main>
        {/* HERO: the claim, and the page measuring itself against it */}
        <section className={`${shell} pt-28 pb-20 md:pt-36 md:pb-28`}>
          <div className={`${container} grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center`}>
            <div>
              <h1 className={`${heading.hero} font-semibold tracking-tight`}>
                We build things that work.
              </h1>
              <p className={`mt-5 text-base md:text-lg ${ink.supporting} leading-relaxed max-w-xl`}>
                Web apps, websites, SEO, and AI automation for businesses that need software to actually work, not just launch.
              </p>
              <Link
                href="/work-with-us"
                className={`mt-8 inline-block border ${line.strong} px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)]`}
              >
                Start a project
              </Link>
            </div>

            <PageMetrics />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`${shell} ${block} border-t ${line.rule}`}>
          <div className={`${container} grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}>
            <h2 className={`${heading.section} font-semibold tracking-tight`}>
              Code that actually ships.
            </h2>
            <div className={`space-y-5 text-base ${ink.supporting} leading-relaxed max-w-2xl`}>
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
        <section id="services" className={`${shell} ${block} border-t ${line.rule}`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-10`}>What we do</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-16 border-b ${line.rule}`}>
              {services.map((service) => (
                <div key={service.title} className={`border-t ${line.rule} py-6`}>
                  <h3 className={`${heading.card} font-semibold mb-2`}>{service.title}</h3>
                  <p className={`text-sm ${ink.supporting} leading-relaxed`}>{service.support}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className={`${shell} ${block} border-t ${line.rule}`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-10`}>
              Scope, architect, code, ship, iterate
            </h2>
            <ol className={`border-b ${line.rule}`}>
              {phases.map((phase) => (
                <li
                  key={phase.title}
                  className={`border-t ${line.rule} py-5 grid grid-cols-1 gap-1.5 md:grid-cols-[160px_1fr] md:gap-10`}
                >
                  <h3 className="text-base font-semibold">{phase.title}</h3>
                  <p className={`text-sm ${ink.supporting} leading-relaxed max-w-2xl`}>{phase.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`${shell} ${block} border-t ${line.rule}`}>
          <div className={container}>
            <h2 className={`${heading.section} font-semibold tracking-tight mb-8`}>Common questions</h2>
            <Accordion type="single" collapsible className="max-w-3xl">
              {faqs.map((item) => (
                <AccordionItem key={item.q} value={item.q} className={line.rule}>
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-[var(--signal)] py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className={`text-sm ${ink.supporting} leading-relaxed pb-5 max-w-2xl`}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className={`${shell} ${block} border-t ${line.rule}`}>
          <div className={container}>
            <div className="max-w-2xl">
              <h2 className={`${heading.section} font-semibold tracking-tight`}>
                Got an idea? Let's build it.
              </h2>
              <p className={`mt-4 text-base ${ink.supporting} leading-relaxed`}>
                Tell us what you're trying to build. We'll find the fastest path to make it real.
              </p>
              <Link
                href="/work-with-us"
                className={`mt-8 inline-block border ${line.strong} px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)]`}
              >
                Start a project
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
