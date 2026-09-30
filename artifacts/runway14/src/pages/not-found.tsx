import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { reveal } from "@/lib/reveal";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page Not Found | Runway 14";

    const robotsEl = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsEl?.getAttribute("content") ?? null;
    robotsEl?.setAttribute("content", "noindex, follow");

    return () => {
      document.title = previousTitle;
      if (previousRobots !== null) robotsEl?.setAttribute("content", previousRobots);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="wrap page">
        <div className="intro">
          <span className="loc" {...reveal(0)}><b>404</b>Not found</span>
          <h1 {...reveal(80)}>This page doesn't exist.</h1>
          <p {...reveal(160)}>The link may be wrong, or the page has moved.</p>
          <div className="ctas" {...reveal(240)}>
            <Link href="/" className="btn">Back to the homepage</Link>
            <Link href="/work-with-us" className="btn ghost">Start a project</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
