"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanelLeftClose } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navigationConfig } from "@/config/navigation";

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
  const isSubmenuItemActive = (href: string, index: number) => {
    // Exact match
    if (pathname === href) return true;
    
    // For the first item (Overview/All), also match base section URL
    if (index === 0 && pathname === activeItem?.href) return true;
    
    // For filter URLs, check if they match exactly including query
    if (href.includes("?")) {
      const [baseHref] = href.split("?");
      return pathname === baseHref;
    }
    
    // For nested routes (not the base section)
    if (href !== activeItem?.href && pathname.startsWith(href) && !href.includes("?")) {
      // Make sure it's a true child path
      const nextChar = pathname.charAt(href.length);
      if (nextChar === "/" || nextChar === "") {
        return true;
      }
    }
    
    return false;
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-icon-rail sidebar-panel-transition",
        isOpen ? "w-56 opacity-100" : "w-0 opacity-0 overflow-hidden"
      )}
    >
      {/* Header */}
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

      {/* Navigation Links */}
      <ScrollArea className="flex-1">
        <nav className="px-3 py-3">
          {submenuItems.length > 0 ? (
            <ul className="space-y-0.5">
              {submenuItems.map((subItem, index) => {
                const isActive = isSubmenuItemActive(subItem.href, index);
                
                return (
                  <li key={subItem.href}>
                    <Link
                      href={subItem.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-propai-accent/10 text-propai-accent font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground/60 px-3 py-4">
              No submenu items
            </p>
          )}
        </nav>
      </ScrollArea>

      {/* Footer hint */}
      <div className="px-4 py-3 border-t border-secondary-panel-border/50">
        <p className="text-[10px] text-muted-foreground/50 text-center">
          <kbd className="px-1 py-0.5 bg-muted rounded text-[9px] font-mono">⌘K</kbd> to search
        </p>
      </div>
    </div>
  );
}
