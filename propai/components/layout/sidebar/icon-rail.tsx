"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Asterisk, Moon, Sun, PanelLeftClose, PanelLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Robot01Icon, TvSmartIcon, Target02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { navigationConfig, type NavItem } from "@/config/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IconRailProps {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
  activeSection: string | null;
  onIconClick: (item: NavItem) => void;
}

export function IconRail({
  isPanelOpen,
  onTogglePanel,
  activeSection,
  onIconClick,
}: IconRailProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Split navigation into top and bottom sections
  const topNavItems = navigationConfig.filter(item => item.position !== "bottom");
  const bottomNavItems = navigationConfig.filter(item => item.position === "bottom");

  // Determine which nav item is active based on current path
  const getIsActive = (item: NavItem): boolean => {
    // Special handling for inbox (conversations)
    if (item.id === "inbox") {
      return pathname.startsWith("/dashboard/conversations") || pathname.startsWith("/dashboard/voice");
    }
    // Special handling for leads (includes site-visits and properties)
    if (item.id === "leads") {
      return pathname.startsWith("/dashboard/leads") || 
             pathname.startsWith("/dashboard/site-visits") || 
             pathname.startsWith("/dashboard/properties");
    }
    // Special handling for agent (includes knowledge)
    if (item.id === "agent") {
      return pathname.startsWith("/dashboard/agent") || pathname.startsWith("/dashboard/knowledge");
    }
    // Special handling for channels (includes integrations)
    if (item.id === "channels") {
      return pathname.startsWith("/dashboard/channels") || pathname.startsWith("/dashboard/integrations");
    }
    // Special handling for settings (includes team)
    if (item.id === "settings") {
      return pathname.startsWith("/dashboard/settings") || pathname.startsWith("/dashboard/team");
    }
    // Default: exact match for home, startsWith for others
    if (item.href === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (item.href !== "/dashboard" && pathname.startsWith(item.href)) {
      return true;
    }
    return false;
  };

  // Check if user settings is active
  const isUserSettingsActive = pathname.startsWith("/dashboard/account");

  // Render a navigation icon button
  const renderNavIcon = (item: NavItem) => {
    const isActive = getIsActive(item);
    const isCurrentSection = activeSection === item.id;

    // Custom icon mapping for specific items
    const getIcon = () => {
      switch (item.id) {
        case "agent":
          return (
            <HugeiconsIcon
              icon={Robot01Icon}
              size={18}
              className={cn(isActive && "text-propai-accent")}
            />
          );
        case "channels":
          return (
            <HugeiconsIcon
              icon={TvSmartIcon}
              size={18}
              className={cn(isActive && "text-propai-accent")}
            />
          );
        case "leads":
          return (
            <HugeiconsIcon
              icon={Target02Icon}
              size={18}
              className={cn(isActive && "text-propai-accent")}
            />
          );
        default:
          return (
            <item.icon
              className={cn(
                "h-[18px] w-[18px]",
                isActive && "text-propai-accent"
              )}
            />
          );
      }
    };

    return (
      <li key={item.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onIconClick(item)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl sidebar-icon-hover-transition",
                "hover:bg-icon-rail-hover",
                isActive && "bg-icon-rail-active text-propai-accent",
                isCurrentSection &&
                  !isActive &&
                  "bg-icon-rail-hover text-icon-rail-foreground",
                !isActive &&
                  !isCurrentSection &&
                  "text-icon-rail-muted hover:text-icon-rail-foreground"
              )}
            >
              {getIcon()}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={8}
            className="bg-popover text-popover-foreground border border-border shadow-lg"
          >
            {item.label}
          </TooltipContent>
        </Tooltip>
      </li>
    );
  };

  return (
    <div className={cn(
      "flex h-full w-20 flex-col bg-icon-rail",
      isPanelOpen && "border-r border-secondary-panel-border"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center">
        <Link
          href="/dashboard"
          className="flex h-12 w-12 items-center justify-center rounded-xl sidebar-icon-hover-transition hover:bg-icon-rail-hover"
        >
          <Asterisk className="h-10 w-10 text-propai-accent" strokeWidth={2.5} />
        </Link>
      </div>

      {/* Main Navigation Icons (Top) */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 overflow-y-auto py-2 px-2.5">
          <ul className="flex flex-col items-center gap-1.5">
            {topNavItems.map(renderNavIcon)}
          </ul>
        </nav>
      </TooltipProvider>

      {/* Bottom Section: Settings + Controls */}
      <div className="flex flex-col items-center gap-1.5 py-3 px-2.5 border-t border-secondary-panel-border/50">
        {/* Bottom Navigation Items (Settings) */}
        <TooltipProvider delayDuration={0}>
          <ul className="flex flex-col items-center gap-1.5">
            {bottomNavItems.map(renderNavIcon)}
          </ul>
        </TooltipProvider>

        {/* Separator */}
        <div className="w-8 h-px bg-secondary-panel-border/50 my-1" />

        {/* Toggle Panel Button */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onTogglePanel}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-icon-rail-muted sidebar-icon-hover-transition hover:bg-icon-rail-hover hover:text-icon-rail-foreground"
              >
                {isPanelOpen ? (
                  <PanelLeftClose className="h-[17px] w-[17px]" />
                ) : (
                  <PanelLeft className="h-[17px] w-[17px]" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={8}
              className="bg-popover text-popover-foreground border border-border shadow-lg"
            >
              {isPanelOpen ? "Collapse panel" : "Expand panel"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Theme Toggle */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-icon-rail-muted sidebar-icon-hover-transition hover:bg-icon-rail-hover hover:text-icon-rail-foreground"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-[17px] w-[17px]" />
                ) : (
                  <Moon className="h-[17px] w-[17px]" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={8}
              className="bg-popover text-popover-foreground border border-border shadow-lg"
            >
              {mounted && theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Avatar */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => router.push("/dashboard/account")}
                className={cn(
                  "flex items-center justify-center rounded-full sidebar-icon-hover-transition hover:ring-2 hover:ring-propai-accent/30 mt-1",
                  isUserSettingsActive && "ring-2 ring-propai-accent"
                )}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback className="bg-propai-accent text-white text-sm font-medium">
                    NS
                  </AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={8}
              className="bg-popover text-popover-foreground border border-border shadow-lg"
            >
              Account settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
