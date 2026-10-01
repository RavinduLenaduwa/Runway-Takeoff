import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type AccordionVariant = "default" | "card";

const VariantContext = React.createContext<AccordionVariant>("default");

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant;
};

function Accordion({ variant = "default", className, ...props }: AccordionProps) {
  return (
    <VariantContext.Provider value={variant}>
      <AccordionPrimitive.Root
        data-variant={variant}
        className={cn(variant === "card" && "grid gap-3", className)}
        {...props}
      />
    </VariantContext.Provider>
  );
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(VariantContext);
  return (
    <AccordionPrimitive.Item
      className={cn(
        variant === "card"
          ? "border border-[var(--line)] bg-[var(--panel)] transition-colors data-[state=open]:border-[var(--line-2)]"
          : "border-b border-[var(--line)]",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const variant = React.useContext(VariantContext);
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-4 text-left font-medium transition-colors hover:text-[var(--ink)]",
          variant === "card" ? "px-5 py-5 md:px-6" : "py-4",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-[var(--dim)] transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--sign)]"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const variant = React.useContext(VariantContext);
  return (
    <AccordionPrimitive.Content className="acc-content overflow-hidden" {...props}>
      <div className={cn(variant === "card" ? "px-5 pb-5 md:px-6" : "pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

// How long to hold after a character before the next one, so the text reads
// with the rhythm of writing rather than a constant tick.
function pauseAfter(char: string, speed: number) {
  if (/[.!?]/.test(char)) return speed * 10;
  if (/[,;:]/.test(char)) return speed * 4;
  return 0;
}

function StreamingText({ text, speed, startDelay, active }: { text: string; speed: number; startDelay: number; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  // Closed answers hold their full text, so the page source carries every
  // answer. Only the one that is open at load starts empty and streams.
  const [shown, setShown] = React.useState(active && !reduced ? 0 : text.length);

  // Layout effect so reopening restarts from empty before the browser paints,
  // rather than flashing the finished answer first.
  React.useLayoutEffect(() => {
    if (!active || reduced) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let count = 0;
    let timer: number;
    const tick = () => {
      count += 1;
      setShown(count);
      if (count < text.length) timer = window.setTimeout(tick, speed + pauseAfter(text[count - 1], speed));
    };
    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
  }, [text, speed, startDelay, reduced, active]);

  const done = shown >= text.length;

  // The finished text sits underneath. It holds the panel at its final height
  // from the first frame, so nothing below jumps as words arrive, and it stays
  // in the accessibility tree as the copy a screen reader reads. It is only
  // made invisible once scripts are running (.stream-under in index.css), so
  // without JavaScript the answer is plain text. The streamed overlay on top is
  // hidden from assistive tech.
  return (
    <p className="relative">
      <span className="stream-under">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, shown)}
        {active && !done && <span className="stream-caret" />}
      </span>
    </p>
  );
}

type AccordionStreamingContentProps = Omit<React.ComponentProps<typeof AccordionPrimitive.Content>, "children" | "forceMount"> & {
  text: string;
  /** Whether this item is the open one. Each time it becomes true the answer streams in again. */
  open: boolean;
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds to wait after opening before the first character. */
  startDelay?: number;
};

// Mounted even while closed (forceMount), so the answer is in the page for
// crawlers and the closed panel is hidden by CSS instead of being removed.
function AccordionStreamingContent({ text, open, speed = 18, startDelay = 160, className, ...props }: AccordionStreamingContentProps) {
  return (
    <AccordionContent forceMount className={className} {...props}>
      <StreamingText text={text} speed={speed} startDelay={startDelay} active={open} />
    </AccordionContent>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionStreamingContent };
