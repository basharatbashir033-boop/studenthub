import { cn } from "@/lib/utils";
import { useAppStore } from "../../store/useAppStore";
import type { AdSlot } from "../../types";

interface AdBannerProps {
  slot: AdSlot;
  className?: string;
}

const slotStyles: Record<AdSlot, string> = {
  header: "w-full h-16 md:h-20",
  sidebar: "w-full min-h-[250px]",
  "between-cards": "w-full h-14 md:h-16",
};

const slotLabels: Record<AdSlot, string> = {
  header: "Header Banner (728×90)",
  sidebar: "Sidebar Ad (300×250)",
  "between-cards": "In-Content Ad (320×50)",
};

const isDev = import.meta.env.DEV;

export function AdBanner({ slot, className }: AdBannerProps) {
  const { adSettings } = useAppStore();

  // In production, render the actual ad code if available
  const adCode =
    slot === "header"
      ? adSettings?.headerAdCode
      : slot === "sidebar"
        ? adSettings?.sidebarAdCode
        : adSettings?.betweenCardsAdCode;

  const isEnabled =
    slot === "header"
      ? adSettings?.headerAdEnabled
      : slot === "sidebar"
        ? adSettings?.sidebarAdEnabled
        : adSettings?.betweenCardsAdEnabled;

  if (!isDev && (!isEnabled || !adCode)) return null;

  if (!isDev && adCode) {
    // Ad code rendered via script injection (AdSense compatible)
    return (
      <div
        className={cn(slotStyles[slot], className)}
        ref={(el) => {
          if (el && !el.hasChildNodes()) {
            const div = document.createElement("div");
            div.innerHTML = adCode;
            el.appendChild(div);
          }
        }}
        data-ocid={`ad-banner-${slot}`}
      />
    );
  }

  // Dev: show placeholder
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30",
        slotStyles[slot],
        className,
      )}
      data-ocid={`ad-banner-${slot}`}
      aria-label={`Advertisement placeholder: ${slotLabels[slot]}`}
    >
      <div className="text-center">
        <p className="text-xs font-medium text-muted-foreground">
          Advertisement
        </p>
        <p className="text-xs text-muted-foreground/60">{slotLabels[slot]}</p>
      </div>
    </div>
  );
}
