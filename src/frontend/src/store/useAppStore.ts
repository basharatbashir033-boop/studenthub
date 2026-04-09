import { create } from "zustand";
import type { AdSettings, Announcement, Tool } from "../types";

interface AppStore {
  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Tools
  tools: Tool[];
  setTools: (tools: Tool[]) => void;

  // Announcements
  announcements: Announcement[];
  setAnnouncements: (announcements: Announcement[]) => void;
  dismissedAnnouncements: string[];
  dismissAnnouncement: (id: string) => void;

  // Ad Settings
  adSettings: AdSettings | null;
  setAdSettings: (settings: AdSettings) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const getStoredTheme = (): "light" | "dark" => {
  try {
    const stored = localStorage.getItem("studenthub-theme");
    if (stored === "dark" || stored === "light") return stored;
    // Default to dark mode for first-time visitors
  } catch {
    // ignore
  }
  return "dark";
};

export const useAppStore = create<AppStore>((set) => ({
  theme: getStoredTheme(),
  setTheme: (theme) => {
    try {
      localStorage.setItem("studenthub-theme", theme);
    } catch {
      // ignore
    }
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    set({ theme });
  },

  tools: [],
  setTools: (tools) => set({ tools }),

  announcements: [],
  setAnnouncements: (announcements) => set({ announcements }),
  dismissedAnnouncements: [],
  dismissAnnouncement: (id) =>
    set((state) => ({
      dismissedAnnouncements: [...state.dismissedAnnouncements, id],
    })),

  adSettings: null,
  setAdSettings: (adSettings) => set({ adSettings }),

  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
