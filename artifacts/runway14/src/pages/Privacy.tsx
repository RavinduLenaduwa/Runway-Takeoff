import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { reveal } from "@/lib/reveal";

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy Policy | Runway 14",
    description: "How Runway 14 handles the information you share in a project brief. No tracking, no cookies, no data stored on our servers.",
    path: "privacy",
  });

  return (
    <>
      <Navbar />

      <main className="wrap page">
        <div className="intro">
          <PageBreadcrumb label="Privacy Policy" path="privacy" />
          <span className="loc" {...reveal(0)}><b>14</b>Legal</span>
          <h1 {...reveal(80)}>Privacy Policy</h1>
          <p className="mid" {...reveal(160)}>Last updated 2026</p>
        </div>

        <div className="prose">
          <div {...reveal()}>
            <h2>What we collect</h2>
            <p>
              The <Link href="/work-with-us">project brief</Link> form asks for your name, email, company or project name, and details about what you're building. That's the only personal information this site collects.
            </p>
          </div>

          <div {...reveal()}>
            <h2>How it's handled</h2>
            <p>
              Submitting the form opens a draft email in your own email client, addressed to hello@runway14.com. Your information is not sent to or stored on any Runway 14 server, and it doesn't touch a database, a form backend, or a third-party service. If you don't send the email, we never receive anything.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Cookies and tracking</h2>
            <p>
              This site doesn't use analytics, tracking cookies, or advertising pixels. Nothing about your visit is recorded.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Questions</h2>
            <p>
              Reach us at <a href="mailto:hello@runway14.com">hello@runway14.com</a> with any questions about this policy. See also our <Link href="/terms">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
