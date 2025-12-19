"use client";

import { X } from "lucide-react";

import { useSettingsPanel } from "./settings-panel-provider";

interface SettingsHeaderProps {
  title: string;
  description?: string;
}

export function SettingsHeader({ title, description }: SettingsHeaderProps) {
  const { close } = useSettingsPanel();

  return (
    <div className="flex items-start justify-between border-b border-border pb-6 mb-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={close}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        aria-label="Close settings"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

