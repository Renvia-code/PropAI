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

  // Handle icon click
  const handleIconClick = (item: NavItem) => {
    if (isMobile) {
      // On mobile, open the sheet if clicking a different section with submenu
      if (item.submenu && item.submenu.length > 0) {
        setActiveSection(item.id);
        setMobileOpen(true);
      } else {
        // For items without submenu, navigate directly
        router.push(item.href);
      }
    } else {
      // On desktop
      if (item.submenu && item.submenu.length > 0) {
        // If clicking the same section, toggle the panel
        if (activeSection === item.id && isPanelOpen) {
          togglePanel();
        } else {
          // Switch to new section and open panel
          setActiveSection(item.id);
          if (!isPanelOpen) {
            setIsPanelOpen(true);
          }
        }
      } else {
        // For items without submenu (like Home), navigate directly
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
