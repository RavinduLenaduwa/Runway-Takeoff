import { useEffect } from "react";

import { pageUrl } from "@/content/site";

interface DocumentMeta {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "" for home or "work-with-us" for /work-with-us */
  path: string;
}

function setAttr(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  const previous = el?.getAttribute(attr) ?? null;
  el?.setAttribute(attr, value);
  return () => {
    if (previous !== null) el?.setAttribute(attr, previous);
  };
}

/**
 * Keeps the live <head> in sync during client-side navigation (wouter <Link>
 * doesn't reload the page, so the static per-route meta tags baked in at build
 * time by scripts/postbuild.mjs only apply on a fresh load).
 */
export function useDocumentMeta({ title, description, path }: DocumentMeta) {
  useEffect(() => {
    const url = pageUrl(path);
    const previousTitle = document.title;
    document.title = title;

    const restores = [
      setAttr('meta[name="description"]', "content", description),
      setAttr('link[rel="canonical"]', "href", url),
      setAttr('meta[property="og:title"]', "content", title),
      setAttr('meta[property="og:description"]', "content", description),
      setAttr('meta[property="og:url"]', "content", url),
      setAttr('meta[name="twitter:title"]', "content", title),
      setAttr('meta[name="twitter:description"]', "content", description),
    ];

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
    };
  }, [title, description, path]);
}
