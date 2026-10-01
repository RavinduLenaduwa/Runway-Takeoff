import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BoardingPass } from "@/components/BoardingPass";
import { AsciiArt } from "@/components/ui/minimal";
import { PixelIcon, type PixelIconName } from "@/components/PixelIcon";
import AccordionGenerative from "@/components/ui/accordion-generative";
import RadialOrbitalTimeline, { type OrbitalItem } from "@/components/ui/radial-orbital-timeline";
import { AppWindow, Bot, Globe, Search } from "lucide-react";
import { faqs, pageMeta, serviceCopy } from "@/content/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { reveal } from "@/lib/reveal";

// Two views of the same four services, with different jobs. The list says what
// each one is (`content`). The orbit says how they connect (`related`), so its
// cards carry the reason for each pairing and never repeat the description.
const orbitMeta: Record<number, Pick<OrbitalItem, "icon" | "related">> = {
  1: {
    icon: Globe,
    related: [
      { id: 3, reason: "A fast site is only useful once people can find it." },
      { id: 2, reason: "For when the site needs logins, bookings or payments." },
    ],
  },
  2: {
    icon: AppWindow,
    related: [
      { id: 4, reason: "Automations plug into the app's data and workflows." },
      { id: 1, reason: "The public face that sits in front of the product." },
    ],
  },
  3: { icon: Search, related: [{ id: 1, reason: "Search results start at the pages people land on." }] },
  4: { icon: Bot, related: [{ id: 2, reason: "Automation needs a system to read from and write to." }] },
};

const services: (OrbitalItem & { content: string; slug: string })[] = serviceCopy.map((copy) => ({ ...copy, ...orbitMeta[copy.id] }));

// The orbit gets the connections only; the descriptions live in the list.
const orbitItems: OrbitalItem[] = services.map(({ id, title, icon, related }) => ({ id, title, icon, related }));

const steps: { icon: PixelIconName; title: string; body: ReactNode }[] = [
  { icon: "brief", title: "Send a short brief", body: "A few lines on what you need. About ten minutes." },
  { icon: "quote", title: "Get a written quote", body: <>Scope, milestones and a fixed price. <span className="hl">Free</span>.</> },
  { icon: "plane", title: "Approve, and we build", body: "Weekly updates until launch. You own the code." },
];

export default function Home() {
  useDocumentMeta(pageMeta.home);
  const [activeService, setActiveService] = useState<number | null>(null);

  // Arriving at /#faq from another page or a shared link: the browser tries its
  // hash jump before React has rendered the section and silently gives up.
  // "instant" so a fresh page opens at the section instead of gliding down to it
  // from the top, which the smooth scrolling in index.css would otherwise do.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Navbar />

      <main id="top">
        <div className="hero-band">
          <AsciiArt className="hero-bg" />
          <div className="wrap hero">
            <div className="copy">
              <span className="loc" {...reveal(0)}><b>14</b>Software studio</span>
              <h1 {...reveal(90)}>Quoted before we start.</h1>
              <p className="sub" {...reveal(180)}>
                Websites, web apps, SEO and AI automation. Send a short brief and get a written plan and a fixed price, <span className="hl">free</span>, before you commit to anything.
              </p>
              <div className="ctas" {...reveal(270)}>
                <Link href="/work-with-us" className="btn">Start a project <span className="arrow">&rarr;</span></Link>
                <a href="#process" className="btn ghost">How it works</a>
              </div>
            </div>
            <figure className="hero-pass" {...reveal(240, "right")}>
              <BoardingPass />
              <figcaption>
                <span className="hl">Example quote</span> for a booking portal: milestones by week, what's included, and one fixed price.
              </figcaption>
            </figure>
          </div>
        </div>

        <section id="services" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc" {...reveal(0)}><b>A</b>Services</span>
              <h2 {...reveal(80)}>Four things we build.</h2>
              <p className="mid" {...reveal(160)}>The list says what each one is. The orbit shows how they fit together.</p>
            </div>
            <div className="svc-layout">
              <ol className="svc-list">
                {services.map((service, i) => (
                  <li key={service.id} {...reveal(i * 90)}>
                    <button
                      type="button"
                      className="svc-row"
                      aria-pressed={activeService === service.id}
                      onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                    >
                      <span className="n">0{service.id}</span>
                      <span className="body">
                        <span className="t">{service.title}</span>
                        <span className="d">{service.content}</span>
                      </span>
                    </button>
                    <Link href={`/services/${service.slug}`} className="svc-more" aria-label={`${service.title}: details`}>
                      Details <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <div {...reveal(200, "scale")}>
                <RadialOrbitalTimeline
                  items={orbitItems}
                  hubLabel="14"
                  cta={{ href: "/work-with-us", label: "Start a brief" }}
                  activeId={activeService}
                  onActiveChange={setActiveService}
                />
              </div>
            </div>
            <p className="svc-note" {...reveal()}>Not sure which one you need? Describe the problem and we'll suggest one.</p>
          </div>
        </section>

        <section id="process" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc" {...reveal(0)}><b>B</b>How it works</span>
              <h2 {...reveal(80)}>Nothing to pay until you approve the quote.</h2>
            </div>
            <ol className="steps">
              {steps.map((step, i) => (
                <li key={step.title} {...reveal(i * 130)}>
                  <div className="t">
                    <span className="n">STEP {i + 1}</span>
                    <PixelIcon name={step.icon} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc" {...reveal(0)}><b>C</b>FAQ</span>
              <h2 {...reveal(80)}>Common questions</h2>
            </div>
            <div {...reveal(140)}>
              <AccordionGenerative items={faqs} defaultValue="price-list" className="faq-acc max-w-3xl" />
            </div>
          </div>
        </section>

        <div id="start" className="wrap close">
          <div>
            <h2 {...reveal(0)}>Tell us what you're building.</h2>
            <p {...reveal(90)}>Start with a brief. The quote is <span className="hl">free</span>, and you decide from there.</p>
          </div>
          <div className="ctas" {...reveal(180)}>
            <Link href="/work-with-us" className="btn">Start a project <span className="arrow">&rarr;</span></Link>
            <a href="mailto:hello@runway14.com" className="btn ghost">hello@runway14.com</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
