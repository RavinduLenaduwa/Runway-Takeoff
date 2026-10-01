import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import AccordionGenerative from "@/components/ui/accordion-generative";
import NotFound from "@/pages/not-found";
import { servicePageBySlug, type ServicePage as ServicePageData } from "@/content/service-pages";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useSectionHref } from "@/hooks/use-section-href";
import { reveal } from "@/lib/reveal";

export default function ServicePageRoute({ slug }: { slug: string }) {
  const page = servicePageBySlug(slug);
  return page ? <ServiceView page={page} /> : <NotFound />;
}

function ServiceView({ page }: { page: ServicePageData }) {
  useDocumentMeta(page.meta);
  const sectionHref = useSectionHref();
  const related = page.related.map((relatedSlug) => servicePageBySlug(relatedSlug)!);

  return (
    <>
      <Navbar />

      <main className="wrap page svc-page">
        <div className="intro">
          <PageBreadcrumb label={page.name} path={page.meta.path} parent={{ label: "Services", section: "services" }} />
          <span className="loc" {...reveal(0)}><b>14</b>Service</span>
          <h1 {...reveal(80)}>{page.heading}</h1>
          <p {...reveal(160)}>{page.lede}</p>
          <div className="ctas" {...reveal(240)}>
            <Link href="/work-with-us" className="btn">Start a project <span className="arrow">&rarr;</span></Link>
          </div>
        </div>

        <section className="svc-sec" aria-labelledby="inc">
          <h2 id="inc" {...reveal()}>What you get</h2>
          <ul className="inc">
            {page.includes.map((item, i) => (
              <li key={item.title} {...reveal(i * 70)}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="svc-sec" aria-labelledby="fit">
          <h2 id="fit" {...reveal()}>Who it suits</h2>
          <ul className="ticks" {...reveal(80)}>
            {page.fits.map((fit) => (
              <li key={fit}>{fit}</li>
            ))}
          </ul>
          <p className="elsewhere" {...reveal(120)}>
            {page.elsewhere.text} <Link href={`/services/${page.elsewhere.slug}`}>{page.elsewhere.label}</Link>.
          </p>
        </section>

        <section className="svc-sec" aria-labelledby="quote">
          <h2 id="quote" {...reveal()}>Your written quote will state</h2>
          <ul className="ticks" {...reveal(80)}>
            {page.quoteStates.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="elsewhere" {...reveal(120)}>
            The quote is <span className="hl">free</span>, and nothing is owed until you approve it. <a href={sectionHref("process")}>See how it works</a>.
          </p>
        </section>

        <section className="svc-sec" aria-labelledby="questions">
          <h2 id="questions" {...reveal()}>Questions</h2>
          <div {...reveal(80)}>
            <AccordionGenerative items={page.faqs} defaultValue={page.faqs[0].value} className="faq-acc max-w-3xl" />
          </div>
        </section>

        <section className="svc-sec" aria-labelledby="related">
          <h2 id="related" {...reveal()}>Related services</h2>
          <ul className="related" {...reveal(80)}>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.meta.path}`}>
                  <span className="t">{item.name}</span>
                  <span className="d">{item.lede}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
