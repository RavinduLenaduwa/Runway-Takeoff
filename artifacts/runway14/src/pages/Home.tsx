import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BoardingPass } from "@/components/BoardingPass";
import { PixelIcon, type PixelIconName } from "@/components/PixelIcon";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const services: { icon: PixelIconName; title: string; body: string }[] = [
  { icon: "web", title: "Websites", body: "Fast marketing sites you can edit yourself." },
  { icon: "app", title: "Web apps", body: "Portals, internal tools and SaaS products." },
  { icon: "seo", title: "SEO", body: "Technical fixes that help people find you." },
  { icon: "ai", title: "AI automation", body: "Repetitive work handed to software." },
];

const steps: { icon: PixelIconName; title: string; body: ReactNode }[] = [
  { icon: "brief", title: "Send a short brief", body: "A few lines on what you need. About ten minutes." },
  { icon: "quote", title: "Get a written quote", body: <>Scope, milestones and a fixed price. <span className="hl">Free</span>.</> },
  { icon: "plane", title: "Approve, and we build", body: "Weekly updates until launch. You own the code." },
];

const faqs = [
  { q: "Why no price list?", a: "Every project is different, so we quote each one in writing after reading your brief." },
  { q: "Is the quote really free?", a: "Yes. You only pay once you approve it and work starts." },
  { q: "Do you work with clients abroad?", a: "Yes. We work remotely, in writing, and invoice in USD." },
  { q: "Who owns the code?", a: "You do, from day one." },
];

export default function Home() {
  useDocumentMeta({
    title: "Runway 14 | Websites, Web Apps, SEO & AI Automation",
    description: "Websites, web apps, SEO and AI automation for clients worldwide. Send a short brief and get a written plan and a fixed USD price, free, before you commit.",
    path: "",
  });

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
          <BoardingPass />
        </div>

        <section id="services" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc"><b>A</b>Services</span>
              <h2>Four things we build.</h2>
            </div>
            <div className="svc">
              {services.map((service) => (
                <div key={service.title}>
                  <div className="t">
                    <PixelIcon name={service.icon} />
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.body}</p>
                </div>
              ))}
              <p className="note">Not sure which one you need? Describe the problem and we'll suggest one.</p>
            </div>
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
          </div>
        </section>

        <section id="faq" className="band">
          <div className="wrap">
            <div className="head">
              <span className="loc"><b>C</b>FAQ</span>
              <h2>Common questions</h2>
            </div>
            <div className="faq">
              {faqs.map((item) => (
                <div key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
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
