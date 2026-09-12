import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { container, ink, shell } from "@/lib/theme";

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy Policy | Casta",
    description: "How Casta handles the information you share through the Work With Us form. No tracking, no cookies, no data stored on our servers.",
    path: "privacy",
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />

      <main className={shell}>
        <section className="pt-32 md:pt-44 pb-24 md:pb-32">
          <div className={container}>
            <div className="max-w-3xl">
              <PageBreadcrumb label="Privacy Policy" path="privacy" />
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Privacy Policy</h1>
              <p className={`mt-4 text-sm ${ink.faint}`}>Last updated 2026</p>

              <div className={`mt-14 space-y-10 text-base ${ink.supporting} leading-relaxed`}>
                <div className="space-y-3">
                  <h2 className="text-white text-lg md:text-xl font-semibold">What we collect</h2>
                  <p>
                    The <Link href="/work-with-us" className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity">Work With Us</Link> form asks for your name, email, company or project name, and details about what you're building. That's the only personal information this site collects.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-white text-lg md:text-xl font-semibold">How it's handled</h2>
                  <p>
                    Submitting the form opens a draft email in your own email client, addressed to hello@casta.dev. Your information is not sent to or stored on any Casta server, and it doesn't touch a database, a form backend, or a third-party service. If you don't send the email, we never receive anything.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-white text-lg md:text-xl font-semibold">Cookies and tracking</h2>
                  <p>
                    This site doesn't use analytics, tracking cookies, or advertising pixels. Nothing about your visit is recorded.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-white text-lg md:text-xl font-semibold">Questions</h2>
                  <p>
                    Reach us at <a href="mailto:hello@casta.dev" className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity">hello@casta.dev</a> with any questions about this policy. See also our <Link href="/terms" className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity">Terms of Service</Link>.
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
