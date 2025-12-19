"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useSettingsPanel } from "./settings-panel-provider";
import { SettingsNav } from "./settings-nav";

interface SettingsPanelProps {
  children: React.ReactNode;
}

export function SettingsPanel({ children }: SettingsPanelProps) {
  const { isOpen } = useSettingsPanel();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex rounded-tl-2xl rounded-tr-2xl overflow-hidden bg-secondary-panel border-t border-l border-r border-secondary-panel-border settings-panel-enter"
      )}
    >
      {/* Settings Navigation */}
      <SettingsNav />

      {/* Settings Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-2xl p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

