import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", "dist", "public");
const baseUrl = "https://ravindulenaduwa.github.io/Casta/";

const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

// GitHub Pages has no server, so client-side routing alone can't give crawlers or
// social unfurlers a distinct <title>/description/canonical per route. This writes
// a real static index.html per route (GitHub Pages resolves /work-with-us the same
// way it resolves / — via that path's own index.html), each with the same JS bundle
// so wouter takes over normally once it loads.
const routes = [
  {
    path: "work-with-us",
    title: "Work With Us | Casta",
    description: "Tell Casta what you're building. Get a clear quote and a realistic timeline before any work begins.",
  },
  {
    path: "privacy",
    title: "Privacy Policy | Casta",
    description: "How Casta handles the information you share through the Work With Us form. No tracking, no cookies, no data stored on our servers.",
  },
  {
    path: "terms",
    title: "Terms of Service | Casta",
    description: "The terms governing use of the Casta website and how Casta project engagements are agreed.",
  },
];

function withMeta(html, { title, description, url }) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
}

for (const route of routes) {
  const html = withMeta(template, { ...route, url: `${baseUrl}${route.path}` });
  const dir = path.join(outDir, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// SPA fallback: GitHub Pages serves 404.html for any unmatched path, so wouter's
// client-side router can pick up the real route once the bundle loads. Genuinely
// unmatched paths shouldn't be indexed, so this gets noindex even before JS runs.
const notFoundHtml = template.replace(
  /(<meta name="robots" content=")[^"]*(")/,
  `$1noindex, follow$2`,
);
fs.writeFileSync(path.join(outDir, "404.html"), notFoundHtml);
