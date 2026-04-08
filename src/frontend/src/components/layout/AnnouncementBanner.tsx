import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import type { Announcement } from "../../types";

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
};

const styles = {
  info: "bg-primary/10 border-primary/20 text-primary",
  warning:
    "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
  success:
    "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
};

function AnnouncementItem({
  announcement,
  onDismiss,
}: {
  announcement: Announcement;
  onDismiss: (id: string) => void;
}) {
  const Icon = icons[announcement.type];
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 border-b text-sm animate-slide-up ${styles[announcement.type]}`}
      data-ocid="announcement-banner"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <p className="flex-1 min-w-0">
        <span className="font-medium">{announcement.title}: </span>
        {announcement.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(announcement.id)}
        className="shrink-0 hover:opacity-70 transition-opacity p-0.5 rounded"
        aria-label="Dismiss announcement"
        data-ocid="announcement-dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function AnnouncementBanner() {
  const { announcements, dismissAnnouncement } = useAnnouncements();

  if (announcements.length === 0) return null;

  return (
    <section className="w-full" aria-label="Announcements">
      {announcements.map((ann) => (
        <AnnouncementItem
          key={ann.id}
          announcement={ann}
          onDismiss={dismissAnnouncement}
        />
      ))}
    </section>
  );
}
