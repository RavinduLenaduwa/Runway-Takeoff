import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { pageMeta } from "@/content/site";
import { reveal } from "@/lib/reveal";

export default function Terms() {
  useDocumentMeta(pageMeta.terms);

  return (
    <>
      <Navbar />

      <main className="wrap page">
        <div className="intro">
          <PageBreadcrumb label="Terms of Service" path="terms" />
          <span className="loc" {...reveal(0)}><b>14</b>Legal</span>
          <h1 {...reveal(80)}>Terms of Service</h1>
          <p className="mid" {...reveal(160)}>Last updated 1 October 2026</p>
        </div>

        <div className="prose">
          <div {...reveal()}>
            <h2>This website</h2>
            <p>
              This site is provided as-is, to introduce Runway 14 and let you get in touch about a project. It's provided without warranties of any kind, and we may update or change it at any time.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Project engagements</h2>
            <p>
              Sending a <Link href="/work-with-us">project brief</Link> or an email doesn't create a contract. Actual project work, scope, pricing, timelines, and deliverables are agreed separately in writing before any work begins.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Intellectual property</h2>
            <p>
              The content, design, and branding on this site belong to Runway 14. For client projects, ownership and licensing of the delivered work is defined in that project's own agreement.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Contact</h2>
            <p>
              Questions about these terms can go to <a href="mailto:hello@runway14.com">hello@runway14.com</a>. See also our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
