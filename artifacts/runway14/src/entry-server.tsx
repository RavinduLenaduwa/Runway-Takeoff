import { renderToString } from "react-dom/server";
import App from "./App";

// Used by scripts/postbuild.mjs to pre-render each route into its own HTML file,
// so crawlers that don't run JavaScript still get the page's content.
export function render(route: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return renderToString(<App ssrPath={`${base}${route}`} />);
}

export * from "./content/site";
