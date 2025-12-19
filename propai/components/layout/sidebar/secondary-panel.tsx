"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanelLeftClose } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navigationConfig, type NavItem as NavItemType } from "@/config/navigation";

interface SecondaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string | null;
}

export function SecondaryPanel({
  isOpen,
  onClose,
  activeSection,
}: SecondaryPanelProps) {
  const pathname = usePathname();

  // Find the active navigation item
  const activeItem = activeSection
    ? navigationConfig.find((item) => item.id === activeSection)
    : null;

  // Get panel title
  const panelTitle = activeItem?.label || "Dashboard";

  // Get submenu items for active section
  const submenuItems = activeItem?.submenu || [];

  // Check if a submenu item is active
  const isSubmenuItemActive = (href: string) => {
    return pathname === href || 
      (href !== "/dashboard" && pathname.startsWith(href) && pathname.charAt(href.length) === "/");
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-icon-rail sidebar-panel-transition",
        isOpen ? "w-60 opacity-100" : "w-0 opacity-0 overflow-hidden"
      )}
    >
      {/* Header with title and collapse button */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-secondary-panel-border">
        <span className="text-base font-semibold">{panelTitle}</span>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Close panel"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 py-3">
          {/* Submenu Items */}
          {submenuItems.length > 0 ? (
            <ul className="space-y-1">
              {submenuItems.map((subItem) => (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      isSubmenuItemActive(subItem.href)
                        ? "bg-propai-accent/10 text-propai-accent font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground/60 px-3 py-4">
              No submenu items
            </p>
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}
