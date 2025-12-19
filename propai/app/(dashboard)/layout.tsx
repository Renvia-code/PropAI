"use client";

import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if we're on settings or account pages
  const isSettingsPage = pathname.startsWith("/dashboard/settings") || pathname.startsWith("/dashboard/account");

  // For settings/account pages, render children directly (they have their own layout)
  if (isSettingsPage) {
    return <>{children}</>;
  }

  // Regular dashboard layout with sidebar
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Dual-Rail Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden pt-2 pr-2 bg-icon-rail">
        {/* Rounded Content Container */}
        <main className="flex-1 overflow-auto rounded-tl-2xl rounded-tr-2xl bg-secondary-panel border-t border-l border-r border-secondary-panel-border">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
