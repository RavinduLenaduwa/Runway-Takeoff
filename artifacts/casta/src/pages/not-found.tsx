import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { container, ink, shell } from "@/lib/theme";

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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex flex-col">
      <Navbar />

      <main className={`${shell} flex-1 flex items-center pt-32 pb-24`}>
        <div className={`${container} w-full`}>
          <div className="max-w-xl">
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tight">404</h1>
            <p className={`mt-6 text-base md:text-lg ${ink.supporting} leading-relaxed`}>
              This page doesn't exist. Head back to the homepage to find what you need.
            </p>
            <Link
              href="/"
              className="mt-10 inline-block border border-white px-8 py-4 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
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
