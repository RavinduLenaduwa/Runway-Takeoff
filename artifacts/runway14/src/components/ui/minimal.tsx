import { useEffect, useRef } from "react";

import video from "@/assets/ascii-minimal.mp4";
import poster from "@/assets/ascii-minimal-poster.webp";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// AsciiArt: "Minimal", made with the 21st.dev ASCII editor and baked to a
// looping video plus poster. Self-hosted rather than loaded from 21st.dev's
// CDN, so visiting the page makes no third-party request.
// Source recipe: https://21st.dev/community/ascii/editor?from=488f05af-0110-4873-87e7-5afea99778ac
//
// Decorative, so it is hidden from assistive tech. It holds on the poster
// frame when the visitor prefers reduced motion, and pauses while scrolled out
// of view so an unseen background isn't decoding video.
export function AsciiArt({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      // play() rejects if the browser blocks autoplay; the poster stays up.
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      src={video}
      poster={poster}
      autoPlay={!reduced}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
