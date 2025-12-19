"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { navigationConfig } from "@/config/navigation";

interface PageHeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

// Helper to format path segment to title case
function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper to get label from navigation config
function getLabelFromConfig(
  path: string,
  segments: string[]
): string | undefined {
  // Try to find in main nav items
  const mainItem = navigationConfig.find((item) => {
    const itemPath = item.href.replace("/dashboard", "").replace(/^\//, "");
    return itemPath === segments.join("/");
  });

  if (mainItem) return mainItem.label;

  // Try to find in submenu items
  for (const navItem of navigationConfig) {
    if (navItem.submenu) {
      const subItem = navItem.submenu.find((sub) => {
        const subPath = sub.href.replace("/dashboard", "").replace(/^\//, "");
        return subPath === segments.join("/");
      });
      if (subItem) return subItem.label;
    }
  }

  return undefined;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
  const pathname = usePathname();

  // Parse the pathname into breadcrumb items
  const segments = pathname
    .replace("/dashboard", "")
    .split("/")
    .filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems: Array<{ label: string; href: string; isLast: boolean }> = [];

  // Add home/dashboard
  breadcrumbItems.push({
    label: "Dashboard",
    href: "/dashboard",
    isLast: segments.length === 0,
  });

  // Add each segment
  segments.forEach((segment, index) => {
    const pathSegments = segments.slice(0, index + 1);
    const href = `/dashboard/${pathSegments.join("/")}`;
    const isLast = index === segments.length - 1;

    // Try to get label from config, fall back to formatted segment
    const configLabel = getLabelFromConfig(href, pathSegments);
    const label = configLabel || formatSegment(segment);

    breadcrumbItems.push({ label, href, isLast });
  });

  // Get the page title (use prop or last breadcrumb)
  const pageTitle =
    title || breadcrumbItems[breadcrumbItems.length - 1]?.label || "Dashboard";

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={item.href}>
                {index === 0 ? (
                  // Home icon for first item
                  item.isLast ? (
                    <BreadcrumbPage className="flex items-center gap-1.5">
                      <Home className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-1.5"
                        >
                          <Home className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only">
                            {item.label}
                          </span>
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )
                ) : item.isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Actions slot */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

