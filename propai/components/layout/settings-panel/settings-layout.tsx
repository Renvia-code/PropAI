"use client";

import * as React from "react";

import { SettingsNav } from "./settings-nav";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-icon-rail">
      {/* Settings Navigation Sidebar */}
      <SettingsNav />

      {/* Settings Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden pt-2 pr-2">
        <main className="flex-1 overflow-auto rounded-tl-2xl rounded-tr-2xl bg-secondary-panel border-t border-l border-r border-secondary-panel-border">
          <div className="mx-auto max-w-2xl p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

