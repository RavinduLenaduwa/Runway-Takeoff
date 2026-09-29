import { useId, useState } from "react";

const FAQS = [
  { q: "Why no price list?", a: "Every project is different, so we quote each one in writing after reading your brief." },
  { q: "Is the quote really free?", a: "Yes. You only pay once you approve it and work starts." },
  { q: "Do you work with clients abroad?", a: "Yes. We work remotely, in writing, and invoice in USD." },
  { q: "Who owns the code?", a: "You do, from day one." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.q} className={isOpen ? "faq-item open" : "faq-item"}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="i">0{i + 1}</span>
                <span>{item.q}</span>
                <span className="pm" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-a" hidden={!isOpen}>
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
