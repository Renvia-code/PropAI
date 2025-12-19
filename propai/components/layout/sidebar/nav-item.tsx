"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  icon?: LucideIcon;
  isTopLevel?: boolean;
}

export function NavItem({
  href,
  label,
  isActive: isActiveProp,
  icon: Icon,
  isTopLevel = false,
}: NavItemProps) {
  const pathname = usePathname();

  // Determine active state - check exact match or if it's a parent path
  const isActive =
    isActiveProp !== undefined
      ? isActiveProp
      : pathname === href ||
        (href !== "/dashboard" &&
          pathname.startsWith(href) &&
          pathname.charAt(href.length) === "/");

  if (isTopLevel && Icon) {
    return (
      <Link
        href={href}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium sidebar-icon-hover-transition",
          "hover:bg-secondary-panel-hover",
          isActive
            ? "text-secondary-panel-foreground bg-secondary-panel-hover"
            : "text-secondary-panel-muted hover:text-secondary-panel-foreground"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            isActive ? "text-propai-accent" : "text-secondary-panel-muted"
          )}
        />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex w-full items-center rounded-md px-3 py-1.5 text-sm sidebar-active-border-transition",
        "hover:bg-secondary-panel-hover",
        isActive
          ? "text-secondary-panel-foreground bg-secondary-panel-hover"
          : "text-secondary-panel-muted hover:text-secondary-panel-foreground"
      )}
    >
      {/* Active indicator */}
      <span
        className={cn(
          "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-all duration-150",
          isActive ? "bg-propai-accent" : "bg-transparent group-hover:bg-secondary-panel-border"
        )}
      />
      <span className="pl-2">{label}</span>
    </Link>
  );
}

