import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { container, ink, shell } from "@/lib/theme";

const link = "underline underline-offset-4 hover:text-[var(--signal)] transition-colors";

export default function Terms() {
  useDocumentMeta({
    title: "Terms of Service | Casta",
    description: "The terms governing use of the Casta website and how Casta project engagements are agreed.",
    path: "terms",
  });

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <main className={shell}>
        <section className="pt-28 md:pt-36 pb-20 md:pb-28">
          <div className={container}>
            <div className="max-w-2xl">
              <PageBreadcrumb label="Terms of Service" path="terms" />
              <h1 className="text-[1.75rem] md:text-[2.25rem] font-semibold tracking-tight">Terms of Service</h1>
              <p className={`mt-3 text-sm ${ink.supporting}`}>Last updated 2026</p>

              <div className={`mt-10 space-y-8 text-base ${ink.supporting} leading-relaxed`}>
                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">This website</h2>
                  <p>
                    This site is provided as-is, to introduce Casta and let you get in touch about a project. It's provided without warranties of any kind, and we may update or change it at any time.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">Project engagements</h2>
                  <p>
                    Reaching out through the <Link href="/work-with-us" className={link}>Work With Us</Link> form or by email doesn't create a contract. Actual project work, scope, pricing, timelines, and deliverables are agreed separately in writing before any work begins.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">Intellectual property</h2>
                  <p>
                    The content, design, and branding on this site belong to Casta. For client projects, ownership and licensing of the delivered work is defined in that project's own agreement.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">Contact</h2>
                  <p>
                    Questions about these terms can go to <a href="mailto:hello@casta.dev" className={link}>hello@casta.dev</a>. See also our <Link href="/privacy" className={link}>Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
