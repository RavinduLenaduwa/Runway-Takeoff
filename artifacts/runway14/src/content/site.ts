// Facts about the site that more than one place needs: the pages, the build's
// structured data, and the per-route <head> tags. Keeping them here means the
// FAQ a visitor reads and the FAQ a crawler is told about cannot drift apart.

export const SITE_URL = "https://ravindulenaduwa.github.io/Runway-Takeoff/";
export const SITE_NAME = "Runway 14";
export const SITE_EMAIL = "hello@runway14.com";

export interface PageMeta {
  title: string;
  description: string;
  /** Path relative to SITE_URL, "" for the home page. */
  path: string;
}

export const pageMeta = {
  home: {
    title: "Websites, Web Apps, SEO & AI for Sri Lanka | Runway 14",
    description: "Websites, web apps, SEO and AI automation for clients in Sri Lanka and abroad. Send a brief and get a written plan and a fixed price, free, before you commit.",
    path: "",
  },
  workWithUs: {
    title: "Start a Project | Runway 14",
    description: "Send Runway 14 a short brief. You get a written plan and a fixed price, free, before you commit to anything.",
    path: "work-with-us",
  },
  privacy: {
    title: "Privacy Policy | Runway 14",
    description: "How Runway 14 handles the information you share in a project brief. No tracking, no cookies, and the site itself stores nothing.",
    path: "privacy",
  },
  terms: {
    title: "Terms of Service | Runway 14",
    description: "The terms governing use of the Runway 14 website and how Runway 14 project engagements are agreed.",
    path: "terms",
  },
} satisfies Record<string, PageMeta>;

export const serviceCopy = [
  { id: 1, title: "Websites", content: "Fast marketing sites you can edit yourself." },
  { id: 2, title: "Web apps", content: "Portals, internal tools and SaaS products." },
  { id: 3, title: "SEO", content: "Technical fixes that help people find you." },
  { id: 4, title: "AI automation", content: "Repetitive work handed to software." },
];

export const faqs = [
  { value: "price-list", question: "Why no price list?", answer: "Every project is different, so we quote each one in writing after reading your brief." },
  { value: "free-quote", question: "Is the quote really free?", answer: "Yes. You only pay once you approve it and work starts." },
  { value: "where", question: "Do you work with clients in Sri Lanka and abroad?", answer: "Yes, both. We work remotely and in writing, and your quote states the price and the currency." },
  { value: "code", question: "Who owns the code?", answer: "You do, from day one." },
];
