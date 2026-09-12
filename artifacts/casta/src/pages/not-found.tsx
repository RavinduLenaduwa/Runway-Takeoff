import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { container, ink, line, mono, shell } from "@/lib/theme";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page Not Found | Casta";

    const robotsEl = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsEl?.getAttribute("content") ?? null;
    robotsEl?.setAttribute("content", "noindex, follow");

    return () => {
      document.title = previousTitle;
      if (previousRobots !== null) robotsEl?.setAttribute("content", previousRobots);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar />

      <main className={`${shell} flex-1 flex items-center pt-28 pb-20`}>
        <div className={`${container} w-full`}>
          <div className="max-w-xl">
            <div className={`${mono} text-sm ${ink.supporting}`}>HTTP 404</div>
            <h1 className="mt-3 text-[1.75rem] md:text-[2.25rem] font-semibold tracking-tight">
              This page doesn't exist.
            </h1>
            <p className={`mt-4 text-base ${ink.supporting} leading-relaxed`}>
              The address is wrong or the page has moved. Everything else is still where you left it.
            </p>
            <Link
              href="/"
              className={`mt-8 inline-block border ${line.strong} px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)]`}
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
