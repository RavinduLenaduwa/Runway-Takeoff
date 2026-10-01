import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { reveal } from "@/lib/reveal";

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy Policy | Runway 14",
    description: "How Runway 14 handles the information you share in a project brief. No tracking, no cookies, and the site itself stores nothing.",
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
          <p className="mid" {...reveal(160)}>Last updated 1 October 2026</p>
        </div>

        <div className="prose">
          <div {...reveal()}>
            <h2>Who we are</h2>
            <p>
              Runway 14 is a software studio that works remotely with clients in Sri Lanka and abroad. We are responsible for the information you send us through this site. You can reach us at <a href="mailto:hello@runway14.com">hello@runway14.com</a>.
            </p>
          </div>

          <div {...reveal()}>
            <h2>What we collect</h2>
            <p>
              The <Link href="/work-with-us">project brief</Link> form asks for your name, email, company or project name, a rough budget, and details about what you're building. That's the only personal information this site asks for.
            </p>
          </div>

          <div {...reveal()}>
            <h2>How the form works</h2>
            <p>
              Submitting the form opens a draft email in your own email client, addressed to hello@runway14.com. The site itself doesn't send, store or process your details: there is no database, form backend or third-party service behind it. If you don't send the email, we never receive anything.
            </p>
          </div>

          <div {...reveal()}>
            <h2>What we do with your brief</h2>
            <p>
              Once you send the email, it reaches us like any other email and is handled by our email provider. We use what you send to reply to you and to prepare your quote, and to run the project if you go ahead. We don't sell it, and we don't share it for marketing. We keep it only as long as we need it for those purposes.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Your choices</h2>
            <p>
              You can ask us to show you what we hold about you, correct it, or delete it, and you can withdraw your consent to us using it. Email <a href="mailto:hello@runway14.com">hello@runway14.com</a> and we'll respond.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Cookies and tracking</h2>
            <p>
              This site doesn't use analytics, tracking cookies, or advertising pixels, and it doesn't load fonts, scripts or media from other companies. The site is hosted on GitHub Pages, and GitHub may keep standard server logs, such as IP addresses, under its own privacy terms.
            </p>
          </div>

          <div {...reveal()}>
            <h2>Changes and questions</h2>
            <p>
              If we change how this site handles information, we'll update this page and its date. Questions about it can go to <a href="mailto:hello@runway14.com">hello@runway14.com</a>. See also our <Link href="/terms">Terms of Service</Link>.
            </p>
          </div>
        </div>
            </main>

      <Footer />
    </>
  );
}
