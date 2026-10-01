import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "dist", "public");

// The server bundle is built from src/entry-server.tsx just before this runs. It
// renders a route to HTML and re-exports the site facts (page meta, FAQs,
// services) from src/content/site.ts, so this script never keeps its own copy.
const { render, pageMeta, faqs, serviceCopy, servicePages, identity, pageUrl, SITE_URL, SITE_NAME, SITE_EMAIL } = await import(
  pathToFileURL(path.join(root, "dist", "server", "entry-server.js")).href
);

// The fonts the first screen of every page is set in. Their filenames carry a
// content hash, so they can only be named once the build has run. Without a
// preload the browser finds them only after the stylesheet arrives, and the page
// first paints in a fallback font and swaps a second or so later. Barlow 500 is
// left out on purpose: only the form labels use it, and a preload that is not
// needed costs bandwidth on exactly the slow connections this is for.
const PRELOAD_FONTS = [
  "barlow-400",
  "barlow-semi-condensed-600",
  "barlow-semi-condensed-700",
  "ibm-plex-mono-400",
  "ibm-plex-mono-500",
];

function addFontPreloads(html) {
  const assets = fs.readdirSync(path.join(outDir, "assets"));
  // The deploy base (/Runway-Takeoff/) is whatever the built stylesheet link uses.
  const base = html.match(/href="([^"]*?)assets\/index-[^"]+\.css"/)?.[1];
  if (base === undefined) throw new Error("Could not find the stylesheet link to work out the base path");
  const tags = PRELOAD_FONTS.map((name) => {
    const file = assets.find((f) => f.startsWith(`${name}-`) && f.endsWith(".woff2"));
    if (!file) throw new Error(`No built font file for "${name}", so it cannot be preloaded`);
    return `<link rel="preload" href="${base}assets/${file}" as="font" type="font/woff2" crossorigin>`;
  });
  return html.replace(/(<meta name="viewport"[^>]*>)/, (_, viewport) => `${viewport}\n    ${tags.join("\n    ")}`);
}

const template = addFontPreloads(fs.readFileSync(path.join(outDir, "index.html"), "utf8"));

const routes = [
  { route: "/", meta: pageMeta.home },
  { route: "/work-with-us", meta: pageMeta.workWithUs },
  { route: "/privacy", meta: pageMeta.privacy },
  { route: "/terms", meta: pageMeta.terms },
  ...servicePages.map((page) => ({ route: `/${page.meta.path}`, meta: page.meta, service: page })),
];

const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// GitHub Pages has no server, so client-side routing alone can't give crawlers or
// social unfurlers a distinct <title>/description/canonical per route, or any
// page content at all. This writes a real static index.html per route (GitHub
// Pages resolves /work-with-us the same way it resolves / via that path's own
// index.html), with the page already rendered into the root, and the same JS
// bundle so React takes over the existing markup once it loads.
function withMeta(html, { title, description, url }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return html
    .replace(/<title>.*?<\/title>/, () => `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${d}${b}`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => `${a}${t}${b}`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => `${a}${d}${b}`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, (_, a, b) => `${a}${t}${b}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, (_, a, b) => `${a}${d}${b}`);
}

const areaServed = [{ "@type": "Country", name: "Sri Lanka" }, "Worldwide"];
const orgId = `${SITE_URL}#organization`;

function structuredData({ home, service }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: SITE_NAME,
      alternateName: `${SITE_NAME} software studio`,
      url: SITE_URL,
      logo: `${SITE_URL}favicon.svg`,
      email: SITE_EMAIL,
      description: "A remote software studio building websites, web apps, SEO and AI automation. Every project is quoted in writing, with a fixed price, before work starts.",
      ...(identity.legalName && { legalName: identity.legalName }),
      ...(identity.location && {
        address: {
          "@type": "PostalAddress",
          ...(identity.location.locality && { addressLocality: identity.location.locality }),
          addressCountry: identity.location.country,
        },
      }),
      ...(identity.founders?.length && { founder: identity.founders.map((name) => ({ "@type": "Person", name })) }),
      ...(identity.sameAs?.length && { sameAs: identity.sameAs }),
      areaServed,
      knowsAbout: ["Web development", "Web applications", "Search engine optimization", "AI automation"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: serviceCopy.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.content,
            provider: { "@id": orgId },
            areaServed,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
  ];
  if (home) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  if (service) {
    const url = pageUrl(service.meta.path);
    graph.push(
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        description: service.lede,
        url,
        provider: { "@id": orgId },
        areaServed,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    );
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>\n  `;
}

// SPA fallback: GitHub Pages serves 404.html for any unmatched path, so wouter's
// client-side router can pick up the real route once the bundle loads. Genuinely
// unmatched paths shouldn't be indexed, so this gets noindex even before JS runs.
// It keeps the empty root, so the browser renders whatever route was requested.
const notFoundHtml = template.replace(
  /(<meta name="robots" content=")[^"]*(")/,
  `$1noindex, follow$2`,
);

for (const { route, meta, service } of routes) {
  const url = pageUrl(meta.path);
  const body = render(route);
  // A silent failure here would ship an empty page to every crawler, which is
  // the problem this step exists to prevent, so fail the build instead.
  if (!body.includes("<h1")) throw new Error(`Pre-rendering ${route} produced no <h1>`);

  let html = withMeta(template, { ...meta, url });
  if (!html.includes('<div id="root"></div>')) throw new Error("index.html has no empty #root to render into");
  html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  html = html.replace("</head>", () => `${structuredData({ home: route === "/", service })}</head>`);

  const dir = path.join(outDir, meta.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

fs.writeFileSync(path.join(outDir, "404.html"), notFoundHtml);
