"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

type SettingsPanelMode = "user" | "org" | null;

interface SettingsPanelContextType {
  isOpen: boolean;
  mode: SettingsPanelMode;
  openUserSettings: () => void;
  openOrgSettings: () => void;
  close: () => void;
}

const SettingsPanelContext = React.createContext<SettingsPanelContextType | undefined>(
  undefined
);

export function useSettingsPanel() {
  const context = React.useContext(SettingsPanelContext);
  if (!context) {
    throw new Error("useSettingsPanel must be used within a SettingsPanelProvider");
  }
  return context;
}

interface SettingsPanelProviderProps {
  children: React.ReactNode;
}

export function SettingsPanelProvider({ children }: SettingsPanelProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<SettingsPanelMode>(null);

  // Auto-detect mode based on current route
  React.useEffect(() => {
    if (pathname.startsWith("/dashboard/account")) {
      setIsOpen(true);
      setMode("user");
    } else if (pathname.startsWith("/dashboard/settings")) {
      setIsOpen(true);
      setMode("org");
    }
  }, [pathname]);

  const openUserSettings = React.useCallback(() => {
    setMode("user");
    setIsOpen(true);
    router.push("/dashboard/account");
  }, [router]);

  const openOrgSettings = React.useCallback(() => {
    setMode("org");
    setIsOpen(true);
    router.push("/dashboard/settings");
  }, [router]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    setMode(null);
    router.push("/dashboard");
  }, [router]);

  // Handle ESC key to close panel
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const value = React.useMemo(
    () => ({
      isOpen,
      mode,
      openUserSettings,
      openOrgSettings,
      close,
    }),
    [isOpen, mode, openUserSettings, openOrgSettings, close]
  );

  return (
    <SettingsPanelContext.Provider value={value}>
      {children}
    </SettingsPanelContext.Provider>
  );
}

