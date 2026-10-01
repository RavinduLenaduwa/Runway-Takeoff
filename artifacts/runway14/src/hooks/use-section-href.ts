import { useLocation } from "wouter";

const base = import.meta.env.BASE_URL;

// Links to a section of the home page.
//
// On the home page this is a bare "#id", which the browser resolves against the
// current URL, so it is always a same-page scroll, even if the visitor arrived
// with a query string (?utm_source=...). A path-qualified "/base/#id" would
// differ from that URL by its missing query and reload the page instead.
//
// From any other page it carries the deploy base path. A bare "/#id" would be an
// absolute URL and, on GitHub Pages, resolve to the domain root and leave the
// site entirely.
export function useSectionHref() {
  const [location] = useLocation();
  const onHome = location === "/";
  return (id: string) => (onHome ? `#${id}` : `${base}#${id}`);
}
