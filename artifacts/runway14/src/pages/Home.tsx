import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RunwayNight } from "@/components/RunwayNight";
import { LedIcon, type LedIconName } from "@/components/LedIcon";
import { StepsStack } from "@/components/StepsStack";
import { Faq } from "@/components/Faq";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const services: { icon: LedIconName; label: string; lead: string; strong: string; tail?: string }[] = [
  { icon: "web", label: "Websites", lead: "Fast marketing sites ", strong: "you can edit yourself." },
  { icon: "app", label: "Web apps", lead: "", strong: "Portals, internal tools", tail: " and SaaS products." },
  { icon: "seo", label: "SEO", lead: "Technical fixes that ", strong: "help people find you." },
  { icon: "ai", label: "AI automation", lead: "", strong: "Repetitive work", tail: " handed to software." },
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
        <section className="hero">
          <div className="hero-art"><RunwayNight /></div>
          <div className="wrap">
            <div className="copy">
              <span className="tag">Software studio</span>
              <h1>
                Websites, web apps, SEO and AI automation,
                <br />
                <span className="accent">quoted before we start.</span>
              </h1>
              <p className="sub">
                Send a short brief. You get a written plan and a fixed price in USD, <span className="hl">free</span>, before you commit to anything.
              </p>
              <div className="ctas">
                <Link href="/work-with-us" className="btn">Start a project</Link>
                <a href="#process" className="btn ghost">How it works</a>
              </div>
              <p className="fine">Remote, in writing, and invoiced in USD.</p>
            </div>
          </div>
        </section>

        <section id="services" className="band">
          <div className="wrap">
            <div className="head">
              <div className="lead">
                <span className="tag">Services</span>
                <h2>
                  Four things we build.
                  <br />
                  <span className="accent">One brief to start any of them.</span>
                </h2>
              </div>
              <p>Not sure which one you need? Describe the problem in your brief and we'll suggest one.</p>
            </div>
            <div className="rows">
              {services.map((s) => (
                <div key={s.label} className="row">
                  <LedIcon name={s.icon} />
                  <p className="big">
                    {s.lead}
                    <strong>{s.strong}</strong>
                    {s.tail}
                  </p>
                  <span className="note">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="band">
          <div className="wrap">
            <div className="head">
              <div className="lead">
                <span className="tag">How it works</span>
                <h2>
                  Nothing to pay
                  <br />
                  <span className="accent">until you approve the quote.</span>
                </h2>
              </div>
              <p>Three steps, all in writing. You see the plan and the price before anything is built.</p>
            </div>
            <StepsStack />
          </div>
        </section>

        <section id="faq" className="band">
          <div className="wrap faq-wrap">
            <div className="faq-side">
              <span className="tag">FAQ</span>
              <h2>
                Common
                <br />
                <span className="accent">questions.</span>
              </h2>
              <div className="side-card">
                <p>Something not covered here? Ask us by email and we'll answer in writing.</p>
                <a href="mailto:hello@runway14.com" className="btn">hello@runway14.com</a>
              </div>
            </div>
            <Faq />
          </div>
        </section>

        <section className="close">
          <div className="close-art">
            <LedIcon name="plane" factor={2} pad={3} size={520} />
          </div>
          <div className="close-body">
            <h2>
              Tell us what
              <br />
              <span className="accent">you're building.</span>
            </h2>
            <p>Start with a brief. The quote is <span className="hl">free</span>, and you decide from there.</p>
            <div className="ctas">
              <Link href="/work-with-us" className="btn">Start a project</Link>
              <a href="mailto:hello@runway14.com" className="btn ghost">Email us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
