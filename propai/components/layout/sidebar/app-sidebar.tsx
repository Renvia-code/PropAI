"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { navigationConfig, type NavItem } from "@/config/navigation";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { IconRail } from "./icon-rail";
import { SecondaryPanel } from "./secondary-panel";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    isPanelOpen,
    setIsPanelOpen,
    togglePanel,
    isHydrated,
  } = useSidebarState();

  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Find active section based on current path
  React.useEffect(() => {
    const active = navigationConfig.find((item) => {
      // Special handling for grouped navigation
      if (item.id === "inbox") {
        return pathname.startsWith("/dashboard/conversations") || pathname.startsWith("/dashboard/voice");
      }
      if (item.id === "leads") {
        return pathname.startsWith("/dashboard/leads") || 
               pathname.startsWith("/dashboard/site-visits") || 
               pathname.startsWith("/dashboard/properties");
      }
      if (item.id === "agent") {
        return pathname.startsWith("/dashboard/agent") || pathname.startsWith("/dashboard/knowledge");
      }
      if (item.id === "channels") {
        return pathname.startsWith("/dashboard/channels") || pathname.startsWith("/dashboard/integrations");
      }
      if (item.id === "settings") {
        return pathname.startsWith("/dashboard/settings") || pathname.startsWith("/dashboard/team");
      }
      // Default matching
      if (item.href === "/dashboard" && pathname === "/dashboard") {
        return true;
      }
      if (item.href !== "/dashboard" && pathname.startsWith(item.href)) {
        return true;
      }
      return false;
    });

    if (active) {
      setActiveSection(active.id);
    }
  }, [pathname]);

  /**
   * Handle icon click - Psychologically optimized behavior:
   * 
   * 1. If clicking an icon WITHOUT submenu (Home) → Navigate directly
   * 2. If clicking an icon WITH submenu:
   *    a. If clicking SAME section that's already open → Toggle panel (close)
   *    b. If clicking DIFFERENT section → Open panel + Navigate to first submenu item
   * 
   * This ensures users always land on the default page when switching sections.
   */
  const handleIconClick = (item: NavItem) => {
    if (isMobile) {
      // Mobile: Open sheet with submenu, navigate to first item
      if (item.submenu && item.submenu.length > 0) {
        setActiveSection(item.id);
        setMobileOpen(true);
        // Navigate to first submenu item (default page)
        router.push(item.submenu[0].href);
      } else {
        // No submenu, navigate directly
        router.push(item.href);
      }
    } else {
      // Desktop
      if (item.submenu && item.submenu.length > 0) {
        // If clicking the SAME section that's already active and panel is open
        if (activeSection === item.id && isPanelOpen) {
          // Just toggle the panel (close it)
          togglePanel();
        } else {
          // Switching to a DIFFERENT section or panel was closed
          setActiveSection(item.id);
          
          // Open panel if not already open
          if (!isPanelOpen) {
            setIsPanelOpen(true);
          }
          
          // Navigate to the first submenu item (default/overview page)
          // This is the key UX improvement - auto-navigate when switching sections
          router.push(item.submenu[0].href);
        }
      } else {
        // No submenu (like Home), navigate directly
        router.push(item.href);
      }
    }
  };

  // Render loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="flex h-full">
        <div className="w-20 bg-icon-rail" />
        <div className="w-60 bg-icon-rail" />
      </div>
    );
  }

  // Mobile layout
  if (isMobile) {
    return (
      <>
        <IconRail
          isPanelOpen={false}
          onTogglePanel={() => setMobileOpen(true)}
          activeSection={activeSection}
          onIconClick={handleIconClick}
        />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-icon-rail"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SecondaryPanel
              isOpen={true}
              onClose={() => setMobileOpen(false)}
              activeSection={activeSection}
            />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop layout
  return (
    <div className="flex h-full">
      <IconRail
        isPanelOpen={isPanelOpen}
        onTogglePanel={togglePanel}
        activeSection={activeSection}
        onIconClick={handleIconClick}
      />
      <SecondaryPanel
        isOpen={isPanelOpen}
        onClose={togglePanel}
        activeSection={activeSection}
      />
    </div>
  );
}
