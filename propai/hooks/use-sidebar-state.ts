"use client";

import { useState, useEffect, useCallback } from "react";

const SIDEBAR_STATE_KEY = "propai-sidebar-state";
const SIDEBAR_SECTIONS_KEY = "propai-sidebar-sections";

interface SidebarState {
  isPanelOpen: boolean;
  expandedSections: string[];
}

const defaultState: SidebarState = {
  isPanelOpen: true,
  expandedSections: [],
};

function loadState(): SidebarState {
  if (typeof window === "undefined") return defaultState;

  try {
    const panelState = localStorage.getItem(SIDEBAR_STATE_KEY);
    const sectionsState = localStorage.getItem(SIDEBAR_SECTIONS_KEY);

    return {
      isPanelOpen: panelState ? JSON.parse(panelState) : true,
      expandedSections: sectionsState ? JSON.parse(sectionsState) : [],
    };
  } catch {
    return defaultState;
  }
}

export function useSidebarState() {
  const [isPanelOpen, setIsPanelOpenState] = useState(true);
  const [expandedSections, setExpandedSectionsState] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const state = loadState();
    setIsPanelOpenState(state.isPanelOpen);
    setExpandedSectionsState(state.expandedSections);
    setIsHydrated(true);
  }, []);

  // Persist panel state
  const setIsPanelOpen = useCallback((open: boolean) => {
    setIsPanelOpenState(open);
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(open));
    }
  }, []);

  // Persist expanded sections
  const setExpandedSections = useCallback((sections: string[]) => {
    setExpandedSectionsState(sections);
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_SECTIONS_KEY, JSON.stringify(sections));
    }
  }, []);

  // Toggle panel
  const togglePanel = useCallback(() => {
    setIsPanelOpen(!isPanelOpen);
  }, [isPanelOpen, setIsPanelOpen]);

  // Toggle section expansion
  const toggleSection = useCallback(
    (sectionId: string) => {
      const newSections = expandedSections.includes(sectionId)
        ? expandedSections.filter((id) => id !== sectionId)
        : [...expandedSections, sectionId];
      setExpandedSections(newSections);
    },
    [expandedSections, setExpandedSections]
  );

  // Check if section is expanded
  const isSectionExpanded = useCallback(
    (sectionId: string) => expandedSections.includes(sectionId),
    [expandedSections]
  );

  // Expand a section (used for auto-expanding active section)
  const expandSection = useCallback(
    (sectionId: string) => {
      if (!expandedSections.includes(sectionId)) {
        setExpandedSections([...expandedSections, sectionId]);
      }
    },
    [expandedSections, setExpandedSections]
  );

  // Collapse a section
  const collapseSection = useCallback(
    (sectionId: string) => {
      if (expandedSections.includes(sectionId)) {
        setExpandedSections(expandedSections.filter((id) => id !== sectionId));
      }
    },
    [expandedSections, setExpandedSections]
  );

  return {
    isPanelOpen,
    setIsPanelOpen,
    togglePanel,
    expandedSections,
    setExpandedSections,
    toggleSection,
    isSectionExpanded,
    expandSection,
    collapseSection,
    isHydrated,
  };
}

export type UseSidebarStateReturn = ReturnType<typeof useSidebarState>;

