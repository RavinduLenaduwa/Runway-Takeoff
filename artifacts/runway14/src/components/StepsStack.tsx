import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { BoardingPass } from "@/components/BoardingPass";
import { Mosaic } from "@/components/Mosaic";

const BriefMock = () => (
  <div className="mock" aria-label="Example brief">
    <div className="mock-hd">
      <span>Brief &middot; Example</span>
      <span className="status">Draft</span>
    </div>
    <div className="mock-row on">
      <span className="i">01</span>
      <div><b>What are you building?</b><span>A booking portal for a small chain of studios.</span></div>
    </div>
    <div className="mock-row">
      <span className="i">02</span>
      <div><b>What should it achieve?</b><span>Fewer bookings taken by phone.</span></div>
    </div>
    <div className="mock-row">
      <span className="i">03</span>
      <div><b>Services</b><span>Web app, SEO</span></div>
    </div>
    <div className="mock-foot"><span>Budget <b>$5k to $10k</b></span><span>About 10 min</span></div>
  </div>
);

const BuildMock = () => (
  <div className="mock" aria-label="Example weekly update">
    <div className="mock-hd">
      <span>Weekly update &middot; Week 3</span>
      <span className="status">On schedule</span>
    </div>
    <div className="mock-row">
      <span className="i done">&#10003;</span>
      <div><b>Booking flow</b><span>Merged and live on staging.</span></div>
    </div>
    <div className="mock-row">
      <span className="i done">&#10003;</span>
      <div><b>Payments</b><span>Test transactions passing.</span></div>
    </div>
    <div className="mock-row on">
      <span className="i">&rarr;</span>
      <div><b>Admin view</b><span>Next up, due in week 4.</span></div>
    </div>
    <div className="mock-foot"><span>Repo <b>yours</b></span><span>Example</span></div>
  </div>
);

interface Step {
  key: string;
  label: string;
  title: string;
  body: ReactNode;
  ticks: string[];
  art: ReactNode;
}

const STEPS: Step[] = [
  {
    key: "brief",
    label: "Brief",
    title: "Send a short brief.",
    body: "A few lines on what you need. About ten minutes.",
    ticks: [
      "What you're building and what it should achieve",
      "The services you need, or let us suggest one",
      "A rough budget range, in USD",
    ],
    art: <BriefMock />,
  },
  {
    key: "quote",
    label: "Quote",
    title: "Get a written quote.",
    body: <>Scope, milestones and a fixed price. <span className="hl">Free</span>.</>,
    ticks: [
      "Scope and milestones, in writing",
      "A fixed price in USD",
      "You only pay once you approve it and work starts",
    ],
    art: <BoardingPass />,
  },
  {
    key: "build",
    label: "Build",
    title: "Approve, and we build.",
    body: "Weekly updates until launch. You own the code.",
    ticks: [
      "An update every week until launch",
      "You own the code, from day one",
      "Remote and in writing, invoiced in USD",
    ],
    art: <BuildMock />,
  },
];

export function StepsStack() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  // The panels are sticky and pile up at the same spot, so several can sit in
  // the band at once; the highest-numbered one is the one drawn on top. Tracking
  // the whole set matters when scrolling back up: the panel underneath never
  // leaves the band, so it never fires an event of its own.
  useEffect(() => {
    const inBand = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }
        if (inBand.size) setActive(Math.max(...inBand));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    panels.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => panels.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="stack">
      <div className="stack-nav">
        <ol className="step-list" aria-label="Steps">
          {STEPS.map((step, i) => (
            <li key={step.key}>
              <button type="button" aria-current={active === i ? "step" : undefined} onClick={() => goTo(i)}>
                <span className="num">0{i + 1}</span>
                {step.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="side-card">
          <p>Start with a short brief. It takes about ten minutes, and the quote is free.</p>
          <Link href="/work-with-us" className="btn">Start a project</Link>
        </div>
      </div>

      <ol className="panels">
        {STEPS.map((step, i) => (
          <li
            key={step.key}
            className="panel"
            data-index={i}
            ref={(el) => { panels.current[i] = el; }}
          >
            <div className="panel-art">
              <Mosaic variant={i} />
              {step.art}
            </div>
            <div className="panel-body">
              <span className="num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <ul className="ticks">
                {step.ticks.map((tick) => <li key={tick}>{tick}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
