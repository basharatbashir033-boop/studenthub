import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import type { Announcement } from "../types";

// Mock announcements for demo (in production these come from backend)
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Welcome to StudentHub!",
    message:
      "Explore our free tools: GPA Calculator, PDF Tools, and Percentage Calculator.",
    type: "info",
    active: true,
    createdAt: Date.now(),
  },
];

export function useAnnouncements() {
  const {
    announcements,
    setAnnouncements,
    dismissedAnnouncements,
    dismissAnnouncement,
  } = useAppStore();

  useEffect(() => {
    // Load mock announcements (replace with actor call when backend is ready)
    setAnnouncements(MOCK_ANNOUNCEMENTS);
  }, [setAnnouncements]);

  const visibleAnnouncements = announcements.filter(
    (ann) => ann.active && !dismissedAnnouncements.includes(ann.id),
  );

  return { announcements: visibleAnnouncements, dismissAnnouncement };
}
