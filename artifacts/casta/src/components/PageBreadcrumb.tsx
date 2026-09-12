import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BASE_URL = "https://ravindulenaduwa.github.io/Casta/";

interface PageBreadcrumbProps {
  label: string;
  /** Path relative to BASE_URL, e.g. "work-with-us" */
  path: string;
}

export function PageBreadcrumb({ label, path }: PageBreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Casta", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: label, item: `${BASE_URL}${path}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-sm text-white/50">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-white transition-colors">
              <Link href="/">Casta</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="[&>svg]:w-3 [&>svg]:h-3 text-white/30" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">{label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
