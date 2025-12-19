"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { SettingsPanelProvider, SettingsPanel } from "@/components/layout/settings-panel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsPanelProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Dual-Rail Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden pt-2 pr-2 bg-icon-rail">
          {/* Rounded Content Container */}
          <main className="flex-1 overflow-auto rounded-tl-2xl rounded-tr-2xl bg-secondary-panel border-t border-l border-r border-secondary-panel-border">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>

          {/* Settings Panel Overlay */}
          <SettingsPanel>
            {children}
          </SettingsPanel>
        </div>
      </div>
    </SettingsPanelProvider>
  );
}
