import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_NAME, SITE_URL, pageUrl } from "@/content/site";
import { useSectionHref } from "@/hooks/use-section-href";

interface PageBreadcrumbProps {
  label: string;
  /** Path relative to SITE_URL, e.g. "work-with-us" */
  path: string;
  /** A home page section this page sits under, e.g. Services for each service page. */
  parent?: { label: string; section: string };
}

export function PageBreadcrumb({ label, path, parent }: PageBreadcrumbProps) {
  const sectionHref = useSectionHref();
  const trail = [
    { name: SITE_NAME, item: SITE_URL },
    ...(parent ? [{ name: parent.label, item: `${SITE_URL}#${parent.section}` }] : []),
    { name: label, item: pageUrl(path) },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb className="crumbs">
        <BreadcrumbList className="text-[12.5px] uppercase tracking-[0.08em] text-[var(--dim)]">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-[var(--ink)] transition-colors">
              <Link href="/">{SITE_NAME}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="[&>svg]:w-3 [&>svg]:h-3 text-[var(--line-2)]" />
          {parent && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-[var(--ink)] transition-colors">
                  <a href={sectionHref(parent.section)}>{parent.label}</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:w-3 [&>svg]:h-3 text-[var(--line-2)]" />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[var(--mid)]">{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
