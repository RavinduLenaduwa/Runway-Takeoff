import type { PageMeta } from "./site";

// The four service pages. Written to say what each service is and how it is
// quoted, and nothing that needs evidence the studio does not have yet: no
// clients, results, prices or turnaround promises.

export type ServiceSlug = "websites" | "web-apps" | "seo" | "ai-automation";

export interface ServicePage {
  slug: ServiceSlug;
  /** Matches the id in serviceCopy, so the home list and these pages stay linked. */
  id: number;
  name: string;
  meta: PageMeta;
  heading: string;
  lede: string;
  includes: { title: string; body: string }[];
  fits: string[];
  /** When this is the wrong service, and which one to look at instead. */
  elsewhere: { text: string; slug: ServiceSlug; label: string };
  quoteStates: string[];
  faqs: { value: string; question: string; answer: string }[];
  related: ServiceSlug[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "websites",
    id: 1,
    name: "Websites",
    meta: {
      title: "Website Development for Sri Lanka and Abroad | Runway 14",
      description: "Fast marketing websites you can edit yourself, for businesses in Sri Lanka and abroad. Written quote and a fixed price, free, before you commit.",
      path: "services/websites",
    },
    heading: "Websites you can edit yourself.",
    lede: "A fast, clear marketing site for your business, built so you can change the words and photos without asking us.",
    includes: [
      { title: "Design and build", body: "Pages designed around your brief and built to load quickly on a phone." },
      { title: "Editing that makes sense", body: "You change text and images yourself. We show you how before launch." },
      { title: "Ready to be found", body: "Page titles, descriptions, a sitemap and structured data are set up from the start, so the basics of search are not an afterthought." },
      { title: "A way to reach you", body: "A contact form or enquiry flow that sends messages somewhere you will read them." },
      { title: "Yours at handover", body: "You get the code and the content. The quote states where the site is hosted and who pays for it." },
    ],
    fits: [
      "A business or professional launching a first site.",
      "An existing site that is slow, dated or hard to update.",
      "A landing page for a campaign, a product or an event.",
    ],
    elsewhere: {
      text: "If visitors need to log in, book, pay or manage something, you need a web app rather than a website.",
      slug: "web-apps",
      label: "See web apps",
    },
    quoteStates: [
      "The pages, and what goes on each one",
      "Who edits what, and how",
      "Milestones by week, and the launch date",
      "One fixed price, and the currency it is in",
    ],
    faqs: [
      { value: "edit", question: "Can I really edit it myself?", answer: "Yes, that is the point of the brief. Text and images are yours to change. If something should only be touched by a developer, your quote says what it is." },
      { value: "hosting", question: "Who hosts the site?", answer: "It depends on the project. Your quote says where the site will be hosted and who pays for it, so hosting is never a surprise after you approve." },
      { value: "google", question: "Will it show up on Google?", answer: "We set up the technical basics, but nobody can promise a ranking. If you want more than the basics, that is our SEO work." },
    ],
    related: ["seo", "web-apps"],
  },
  {
    slug: "web-apps",
    id: 2,
    name: "Web apps",
    meta: {
      title: "Web App Development for Sri Lanka and Abroad | Runway 14",
      description: "Customer portals, internal tools and SaaS products for clients in Sri Lanka and abroad. Written scope and a fixed price, free, before you commit.",
      path: "services/web-apps",
    },
    heading: "Portals, tools and products on the web.",
    lede: "Software that runs in the browser: customer portals, internal tools and SaaS products, built to a scope you have approved in writing.",
    includes: [
      { title: "A written scope first", body: "We turn your brief into a plain-language list of what the app does before any code is written." },
      { title: "Accounts and roles", body: "Login, and different views for different people, such as customers and staff." },
      { title: "Your data, kept properly", body: "A real database and an admin view, so you can see and manage what is stored." },
      { title: "Payments and integrations when needed", body: "Online payments, email and connections to other tools, where the project calls for them." },
      { title: "Updates until launch, then handover", body: "Weekly progress updates, a staging copy you can try before it goes live, and the code handed over." },
    ],
    fits: [
      "A spreadsheet or inbox that has outgrown the way you use it.",
      "A portal where customers book, order or check the status of something.",
      "An internal tool for your team.",
      "The first version of a software product.",
    ],
    elsewhere: {
      text: "If you only need pages that describe your business, a website is simpler to build and to run.",
      slug: "websites",
      label: "See websites",
    },
    quoteStates: [
      "What the app does, screen by screen",
      "Who can see and do what",
      "Milestones by week, including a staging date",
      "One fixed price, and the currency it is in",
    ],
    faqs: [
      { value: "smaller", question: "Can we start with a smaller first version?", answer: "Yes. A quote can cover a first release and list what comes after, so you can launch sooner and add to it later." },
      { value: "change", question: "What if the scope changes halfway?", answer: "The price is fixed for the scope in the quote. A change is discussed and agreed in writing before it affects the price or the dates." },
      { value: "progress", question: "How will I know how it is going?", answer: "You get a written update every week until launch, and a staging copy to try before anything goes live." },
    ],
    related: ["ai-automation", "websites"],
  },
  {
    slug: "seo",
    id: 3,
    name: "SEO",
    meta: {
      title: "Technical SEO for Sri Lanka and Abroad | Runway 14",
      description: "Technical SEO for sites in Sri Lanka and abroad: audit, fixes, structured data and pages AI assistants can read. No ranking promises. Quoted free.",
      path: "services/seo",
    },
    heading: "Technical SEO, with no promised rankings.",
    lede: "We fix what stops search engines and AI assistants from reading, understanding and trusting your site.",
    includes: [
      { title: "An audit in plain language", body: "What is keeping your pages from being found, in the order that matters most." },
      { title: "Fixes in the code", body: "Titles, descriptions, page structure, speed, sitemaps and redirects, done on your site or handed to your developer as exact instructions." },
      { title: "Structured data", body: "Markup that tells search engines and AI assistants who you are, what you offer and where you work." },
      { title: "Pages AI assistants can read", body: "Content that is in the page itself rather than hidden behind scripts, so tools that summarise the web can read it." },
      { title: "Search Console set up", body: "Your sitemap submitted and your pages checked, so you can see what has been indexed." },
    ],
    fits: [
      "A site that exists but does not appear when people search for what you do.",
      "A rebuilt site that lost visitors after launch.",
      "A business that wants to be found by customers in Sri Lanka and abroad.",
    ],
    elsewhere: {
      text: "SEO cannot fix a site that does not say what you do. If the site itself needs rebuilding, that is a website project.",
      slug: "websites",
      label: "See websites",
    },
    quoteStates: [
      "What we will check and fix",
      "What we change ourselves and what we hand to you",
      "Milestones by week",
      "One fixed price, and the currency it is in",
    ],
    faqs: [
      { value: "guarantee", question: "Can you guarantee a first-page ranking?", answer: "No, and be wary of anyone who does. Rankings depend on competitors, search engines and time. We commit to specific fixes that you can check." },
      { value: "results", question: "How long until I see results?", answer: "Search engines take weeks or months to react. Your quote gives dates for the fixes themselves, not a date for a ranking." },
      { value: "content", question: "Do you write the content?", answer: "Technical SEO is about how the site is built, not what it says. If you want help with content, mention it in your brief and the quote will say what is and is not covered." },
    ],
    related: ["websites", "web-apps"],
  },
  {
    slug: "ai-automation",
    id: 4,
    name: "AI automation",
    meta: {
      title: "AI Automation for Sri Lanka and Abroad | Runway 14",
      description: "AI automation for repetitive work: sorting, data entry, reports and drafted replies, for clients in Sri Lanka and abroad. Fixed price, quoted free.",
      path: "services/ai-automation",
    },
    heading: "Hand repetitive work to software.",
    lede: "We automate the routine tasks that eat your week: sorting messages, moving data between tools, drafting replies for you to approve.",
    includes: [
      { title: "Start with the task", body: "We map how the work is done today, step by step, before suggesting what to automate." },
      { title: "Tested on your real examples", body: "We run it on your actual emails, forms or documents and show you the results." },
      { title: "A person stays in charge", body: "Where a mistake would cost you, the software drafts and a person approves." },
      { title: "Connected to your tools", body: "Email, spreadsheets, forms and the systems you already use, rather than a new place to log in to." },
      { title: "Handed over with notes", body: "Written instructions for how it works, what it costs to run and what to do if it stops." },
    ],
    fits: [
      "Sorting enquiries or orders into the right place.",
      "Copying data from documents or emails into a spreadsheet or system.",
      "A weekly report pulled together from several tools.",
      "First-draft replies for your staff to review.",
    ],
    elsewhere: {
      text: "If the work needs a whole new system, such as a portal or a database of its own, that is a web app.",
      slug: "web-apps",
      label: "See web apps",
    },
    quoteStates: [
      "The task, step by step, and what will be automated",
      "What stays with a person",
      "Which services will see your data",
      "Milestones by week, and one fixed price in its currency",
    ],
    faqs: [
      { value: "which", question: "Which tasks are worth automating?", answer: "Tasks that repeat often, follow clear rules and take real time. Your brief is enough to start, and we will say honestly if a task is not worth it." },
      { value: "data", question: "Will my data be sent to AI companies?", answer: "It depends on how the automation is built. Your quote names every service that would see your data, and you approve that before work starts." },
      { value: "wrong", question: "What if the AI gets something wrong?", answer: "It can. That is why we build in checks, keep a person in the loop for anything costly, and test on your real examples before launch." },
    ],
    related: ["web-apps", "seo"],
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((page) => page.slug === slug);
