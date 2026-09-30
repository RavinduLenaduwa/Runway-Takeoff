import { useEffect, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BoardingPass } from "@/components/BoardingPass";
import { BrowserWire } from "@/components/BrowserWire";
import { AsciiArt } from "@/components/ui/minimal";
import { PixelIcon, type PixelIconName } from "@/components/PixelIcon";
import AccordionGenerative, { type GenerativeAnswer } from "@/components/ui/accordion-generative";
import RadialOrbitalTimeline, { type OrbitalItem } from "@/components/ui/radial-orbital-timeline";
import { AppWindow, Bot, Globe, Search } from "lucide-react";
import { useDocumentMeta } from "@/hooks/use-document-meta";

// A site needs to be found, and an app is where automation plugs in, so those
// are the pairings each card offers.
const services: OrbitalItem[] = [
  { id: 1, label: "Service 01", title: "Websites", icon: Globe, relatedIds: [3, 2], content: "Fast marketing sites you can edit yourself." },
  { id: 2, label: "Service 02", title: "Web apps", icon: AppWindow, relatedIds: [4, 1], content: "Portals, internal tools and SaaS products." },
  { id: 3, label: "Service 03", title: "SEO", icon: Search, relatedIds: [1], content: "Technical fixes that help people find you." },
  { id: 4, label: "Service 04", title: "AI automation", icon: Bot, relatedIds: [2], content: "Repetitive work handed to software." },
];

const steps: { icon: PixelIconName; title: string; body: ReactNode }[] = [
  { icon: "brief", title: "Send a short brief", body: "A few lines on what you need. About ten minutes." },
  { icon: "quote", title: "Get a written quote", body: <>Scope, milestones and a fixed price. <span className="hl">Free</span>.</> },
  { icon: "plane", title: "Approve, and we build", body: "Weekly updates until launch. You own the code." },
];

const faqs: GenerativeAnswer[] = [
  { value: "price-list", question: "Why no price list?", answer: "Every project is different, so we quote each one in writing after reading your brief." },
  { value: "free-quote", question: "Is the quote really free?", answer: "Yes. You only pay once you approve it and work starts." },
  { value: "abroad", question: "Do you work with clients abroad?", answer: "Yes. We work remotely, in writing, and invoice in USD." },
  { value: "code", question: "Who owns the code?", answer: "You do, from day one." },
];

export default function Home() {
  useDocumentMeta({
    title: "Runway 14 | Websites, Web Apps, SEO & AI Automation",
    description: "Websites, web apps, SEO and AI automation for clients worldwide. Send a short brief and get a written plan and a fixed USD price, free, before you commit.",
    path: "",
  });
  const [activeService, setActiveService] = useState<number | null>(null);

  // Arriving at /#faq from another page or a shared link: the browser tries its
  // hash jump before React has rendered the section and silently gives up.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
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
              <span className="loc"><b>14</b>Software studio</span>
              <h1>Websites, web apps, SEO and AI automation, quoted before we start.</h1>
              <p className="sub">
                Send a short brief. You get a written plan and a fixed price in USD, <span className="hl">free</span>, before you commit to anything.
              </p>
              <div className="ctas">
                <Link href="/work-with-us" className="btn">Start a project <span className="arrow">&rarr;</span></Link>
                <a href="#process" className="btn ghost">How it works</a>
              </div>
            </div>
            <BrowserWire />
          </div>
        </div>

        <section id="services" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc"><b>A</b>Services</span>
              <h2>Four things we build.</h2>
              <p className="mid">Choose one, from the list or the orbit, to see what it pairs with.</p>
            </div>
            <div className="svc-layout">
              <ol className="svc-list">
                {services.map((service) => {
                  const pairs = service.relatedIds
                    .map((id) => services.find((s) => s.id === id)?.title)
                    .filter(Boolean)
                    .join(", ");
                  return (
                    <li key={service.id}>
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
                          <span className="pair">Pairs with {pairs}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <RadialOrbitalTimeline
                items={services}
                hubLabel="14"
                cta={{ href: "/work-with-us", label: "Start a brief" }}
                activeId={activeService}
                onActiveChange={setActiveService}
              />
            </div>
            <p className="svc-note">Not sure which one you need? Describe the problem and we'll suggest one.</p>
          </div>
        </section>

        <section id="process" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc"><b>B</b>How it works</span>
              <h2>Nothing to pay until you approve the quote.</h2>
            </div>
            <ol className="steps">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <div className="t">
                    <span className="n">STEP {i + 1}</span>
                    <PixelIcon name={step.icon} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="example">
              <div className="cap">
                <span className="hl">Example</span>
                <p>A quote for a booking portal: milestones by week, what's included, and one fixed price.</p>
              </div>
              <BoardingPass />
            </div>
          </div>
        </section>

        <section id="faq" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc"><b>C</b>FAQ</span>
              <h2>Common questions</h2>
            </div>
            <AccordionGenerative items={faqs} defaultValue="price-list" className="faq-acc max-w-3xl" />
          </div>
        </section>

        <div id="start" className="wrap close">
          <div>
            <h2>Tell us what you're building.</h2>
            <p>Start with a brief. The quote is <span className="hl">free</span>, and you decide from there.</p>
          </div>
          <div className="ctas">
            <Link href="/work-with-us" className="btn">Start a project <span className="arrow">&rarr;</span></Link>
            <a href="mailto:hello@runway14.com" className="btn ghost">hello@runway14.com</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
