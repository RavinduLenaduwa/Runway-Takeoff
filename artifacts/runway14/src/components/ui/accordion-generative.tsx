import { Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionStreamingContent,
  AccordionTrigger,
} from "@/components/ui/accordion-generative-utils/accordion";
import { cn } from "@/lib/utils";

export interface GenerativeAnswer {
  value: string;
  question: string;
  answer: string;
}

interface AccordionGenerativeProps {
  items: GenerativeAnswer[];
  /** Open this item on first render. */
  defaultValue?: string;
  /** Milliseconds per character while an answer streams in. */
  speed?: number;
  className?: string;
}

export default function AccordionGenerative({ items, defaultValue, speed = 12, className }: AccordionGenerativeProps) {
  return (
    <Accordion
      type="single"
      collapsible
      variant="card"
      defaultValue={defaultValue}
      className={cn("w-full max-w-lg", className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <Sparkles aria-hidden="true" className="size-4 shrink-0 text-[var(--sign)]" strokeWidth={2} />
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionStreamingContent text={item.answer} speed={speed} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
