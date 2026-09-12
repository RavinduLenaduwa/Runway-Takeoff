import { useEffect, useState } from "react";
import { ink, line, mono, surface } from "@/lib/theme";

interface Reading {
  label: string;
  value: string;
}

const PENDING: Reading[] = [
  { label: "loaded", value: "—" },
  { label: "transferred", value: "—" },
  { label: "requests", value: "—" },
  { label: "cookies", value: "—" },
];

function measure(): Reading[] {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];

  // Deliberately DOMContentLoaded and nothing else. First Contentful Paint is
  // the nicer number but browsers throttle painting in a backgrounded tab, so
  // it reports wildly inflated times through no fault of the page — and a panel
  // that silently swapped between two definitions of "how fast" would be lying.
  const loaded = nav ? `${Math.round(nav.domContentLoadedEventEnd)} ms` : "n/a";
  // A repeat view served entirely from cache genuinely transfers 0 bytes, so
  // this is reported as measured rather than floored to something flattering.
  const bytes = (nav?.transferSize ?? 0) + resources.reduce((total, r) => total + (r.transferSize || 0), 0);
  const cookies = document.cookie.split(";").filter((c) => c.trim()).length;

  return [
    { label: "loaded", value: loaded },
    { label: "transferred", value: `${Math.round(bytes / 1024)} KB` },
    { label: "requests", value: `${resources.length + (nav ? 1 : 0)}` },
    { label: "cookies", value: `${cookies}` },
  ];
}

export function PageMetrics() {
  const [readings, setReadings] = useState<Reading[]>(PENDING);

  useEffect(() => {
    // Settle briefly after load so late resources (webfonts) are counted.
    let timer: number;
    const run = () => {
      timer = window.setTimeout(() => setReadings(measure()), 250);
    };

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", run);
    };
  }, []);

  return (
    <div className={`${surface.panel} w-full max-w-md lg:max-w-none border ${line.rule} px-6 py-5 md:px-8 md:py-6`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-medium">This page</h2>
        <span className={`text-xs ${ink.supporting}`}>measured in your browser</span>
      </div>

      <dl className="mt-4">
        {readings.map((reading) => (
          <div
            key={reading.label}
            className={`flex items-baseline justify-between gap-6 border-t ${line.rule} py-2.5`}
          >
            <dt className={`text-sm ${ink.supporting}`}>{reading.label}</dt>
            <dd className={`${mono} text-sm ${ink.signal}`}>{reading.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className={`mt-5 border ${line.strong} px-4 py-2 text-xs ${ink.supporting} transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]`}
      >
        Run it again
      </button>
    </div>
  );
}
