import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export interface OrbitalItem {
  id: number;
  title: string;
  content: string;
  icon: ElementType;
  /** Items shown under "Pairs with", which open that item when chosen. */
  relatedIds: number[];
  /** Small caption at the top of the open card. */
  label?: string;
}

interface RadialOrbitalTimelineProps {
  items: OrbitalItem[];
  /** Text in the centre of the orbit. */
  hubLabel?: string;
  /** Link shown at the bottom of every open card. */
  cta?: { href: string; label: string };
  className?: string;
}

const DEGREES_PER_MS = 0.006;
const SNAP_MS = 700;
const TOP = 270;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const wrap = (deg: number) => ((deg % 360) + 360) % 360;

// Adapted from the 21st.dev radial orbital timeline: items orbit a hub, and
// choosing one turns the orbit to bring it to the top, opens its card, and
// highlights the items it pairs with.
export default function RadialOrbitalTimeline({ items, hubLabel, cta, className }: RadialOrbitalTimelineProps) {
  const reduced = usePrefersReducedMotion();
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState({ width: 480, radius: 200 });
  const stageRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const tweenRef = useRef<number | null>(null);

  const setRotation = (deg: number) => {
    angleRef.current = deg;
    setAngle(deg);
  };

  // The orbit radius follows the space available, so it fits a phone as well
  // as a desktop instead of assuming a fixed 200px.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, radius: Math.max(110, Math.min(210, Math.min(width, height) / 2 - 56)) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Drifts only while nothing is open, nobody is pointing at or tabbing
  // through it, it is on screen, and motion is welcome. Hover and focus give
  // the pause control that continuous movement needs.
  const drifting = activeId === null && !hovering && visible && !reduced;
  useEffect(() => {
    if (!drifting) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      setRotation(wrap(angleRef.current + (now - last) * DEGREES_PER_MS));
      last = now;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [drifting]);

  useEffect(() => () => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
  }, []);

  // Turns along the arc the short way round, so nodes travel on the orbit
  // rather than cutting straight across it.
  const rotateTo = (target: number) => {
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const from = angleRef.current;
    const delta = ((target - from + 540) % 360) - 180;
    if (reduced) {
      setRotation(wrap(target));
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SNAP_MS);
      setRotation(from + delta * easeOutCubic(t));
      tweenRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    tweenRef.current = requestAnimationFrame(step);
  };

  const open = (id: number) => {
    const index = items.findIndex((item) => item.id === id);
    setActiveId(id);
    rotateTo(TOP - (index / items.length) * 360);
  };

  const toggle = (id: number) => (activeId === id ? setActiveId(null) : open(id));

  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setActiveId(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || activeId === null) return;
    const closing = activeId;
    setActiveId(null);
    buttonRefs.current[closing]?.focus();
  };

  const related = new Set(items.find((item) => item.id === activeId)?.relatedIds ?? []);

  return (
    <div
      ref={stageRef}
      className={cn("orbit", className)}
      onClick={onStageClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div className="orbit-ring" style={{ width: size.radius * 2, height: size.radius * 2 }} aria-hidden="true" />
      <div className="orbit-hub" aria-hidden="true">{hubLabel}</div>

      {items.map((item, index) => {
        const deg = (index / items.length) * 360 + angle;
        const rad = (deg * Math.PI) / 180;
        const x = size.radius * Math.cos(rad);
        const y = size.radius * Math.sin(rad);
        // Top of the circle reads as further away: dimmer and drawn beneath.
        const nearness = (1 + Math.sin(rad)) / 2;
        const isActive = activeId === item.id;
        const isRelated = related.has(item.id);
        const Icon = item.icon;
        const cardId = `orbit-card-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn("orbit-node", isActive && "is-active", isRelated && "is-related")}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              zIndex: isActive ? 200 : Math.round(100 + 50 * Math.sin(rad)),
              opacity: isActive || isRelated ? 1 : 0.55 + 0.45 * nearness,
            }}
          >
            <button
              ref={(el) => { buttonRefs.current[item.id] = el; }}
              type="button"
              className="orbit-btn"
              aria-expanded={isActive}
              aria-controls={isActive ? cardId : undefined}
              onClick={() => toggle(item.id)}
            >
              <span className="orbit-dot">
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="orbit-label">{item.title}</span>
            </button>

            {isActive && (
              <div
                id={cardId}
                role="region"
                aria-label={item.title}
                className="orbit-card"
                style={{ width: Math.min(300, size.width - 24) }}
              >
                {item.label && <span className="orbit-cap">{item.label}</span>}
                <h3>{item.title}</h3>
                <p>{item.content}</p>

                {item.relatedIds.length > 0 && (
                  <div className="orbit-rel">
                    <span className="orbit-cap">Pairs with</span>
                    <div className="orbit-chips">
                      {item.relatedIds.map((relatedId) => {
                        const relatedItem = items.find((i) => i.id === relatedId);
                        if (!relatedItem) return null;
                        return (
                          <button
                            key={relatedId}
                            type="button"
                            className="orbit-chip"
                            onClick={() => {
                              open(relatedId);
                              requestAnimationFrame(() => buttonRefs.current[relatedId]?.focus());
                            }}
                          >
                            {relatedItem.title}
                            <ArrowRight size={12} aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {cta && (
                  <Link href={cta.href} className="orbit-cta">
                    {cta.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
