"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { type NavItem as NavItemType } from "@/config/navigation";
import { NavItem } from "./nav-item";

interface NavSectionProps {
  item: NavItemType;
  isExpanded: boolean;
  onToggle: () => void;
  isActive: boolean;
}

export function NavSection({
  item,
  isExpanded,
  onToggle,
  isActive,
}: NavSectionProps) {
  // If no submenu, render a simple link item
  if (!item.submenu || item.submenu.length === 0) {
    return (
      <NavItem
        href={item.href}
        label={item.label}
        isActive={isActive}
        icon={item.icon}
        isTopLevel
      />
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium sidebar-icon-hover-transition",
          "hover:bg-secondary-panel-hover",
          isActive
            ? "text-secondary-panel-foreground"
            : "text-secondary-panel-muted hover:text-secondary-panel-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon
            className={cn(
              "h-4 w-4",
              isActive ? "text-propai-accent" : "text-secondary-panel-muted"
            )}
          />
          <span>{item.label}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-secondary-panel-muted sidebar-chevron-transition",
            isExpanded && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="sidebar-section-transition overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
        <ul className="mt-1 space-y-0.5 pl-7">
          {item.submenu.map((subItem) => (
            <li key={subItem.href}>
              <NavItem href={subItem.href} label={subItem.label} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

