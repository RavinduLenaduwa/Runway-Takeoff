import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { container, ink, shell } from "@/lib/theme";

const link = "underline underline-offset-4 hover:text-[var(--signal)] transition-colors";

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy Policy | Casta",
    description: "How Casta handles the information you share through the Work With Us form. No tracking, no cookies, no data stored on our servers.",
    path: "privacy",
  });

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <main className={shell}>
        <section className="pt-28 md:pt-36 pb-20 md:pb-28">
          <div className={container}>
            <div className="max-w-2xl">
              <PageBreadcrumb label="Privacy Policy" path="privacy" />
              <h1 className="text-[1.75rem] md:text-[2.25rem] font-semibold tracking-tight">Privacy Policy</h1>
              <p className={`mt-3 text-sm ${ink.supporting}`}>Last updated 2026</p>

              <div className={`mt-10 space-y-8 text-base ${ink.supporting} leading-relaxed`}>
                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">What we collect</h2>
                  <p>
                    The <Link href="/work-with-us" className={link}>Work With Us</Link> form asks for your name, email, company or project name, and details about what you're building. That's the only personal information this site collects.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">How it's handled</h2>
                  <p>
                    Submitting the form opens a draft email in your own email client, addressed to hello@casta.dev. Your information is not sent to or stored on any Casta server, and it doesn't touch a database, a form backend, or a third-party service. If you don't send the email, we never receive anything.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">Cookies and tracking</h2>
                  <p>
                    This site doesn't use analytics, tracking cookies, or advertising pixels. Nothing about your visit is recorded. The cookie count on the home page is measured live in your own browser, so you can check that yourself.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-[var(--ink)] text-base font-semibold">Questions</h2>
                  <p>
                    Reach us at <a href="mailto:hello@casta.dev" className={link}>hello@casta.dev</a> with any questions about this policy. See also our <Link href="/terms" className={link}>Terms of Service</Link>.
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
