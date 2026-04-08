import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Download,
  FileText,
  GraduationCap,
  Percent,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createActor } from "../backend";
import type { Tool } from "../backend.d";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

// Icon map for tool IDs from backend
const TOOL_ICON_MAP: Record<string, React.ElementType> = {
  "gpa-calculator": Calculator,
  "percentage-calculator": Percent,
  "pdf-tools": FileText,
};

const TOOL_COLOR_MAP: Record<string, string> = {
  "gpa-calculator": "bg-primary/10 text-primary",
  "percentage-calculator":
    "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "pdf-tools": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const TOOL_ROUTE_MAP: Record<string, string> = {
  "gpa-calculator": "/gpa-calculator",
  "percentage-calculator": "/percentage-calculator",
  "pdf-tools": "/pdf-tools",
};

const TOOL_BADGE_MAP: Record<string, string | null> = {
  "gpa-calculator": "Popular",
  "percentage-calculator": null,
  "pdf-tools": "New",
};

function getGuestId(): string {
  try {
    const key = "studenthub-guest-id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return `guest-${Date.now()}`;
  }
}

// ─── Tool Card ──────────────────────────────────────────────────────────────

interface ToolCardProps {
  tool: Tool;
  onOpen: (toolId: string, route: string) => void;
  index: number;
}

function ToolCard({ tool, onOpen, index }: ToolCardProps) {
  const Icon = TOOL_ICON_MAP[tool.id] ?? Calculator;
  const colorClass = TOOL_COLOR_MAP[tool.id] ?? "bg-primary/10 text-primary";
  const route = TOOL_ROUTE_MAP[tool.id] ?? "/";
  const badge = TOOL_BADGE_MAP[tool.id] ?? null;
  const usageCount = Number(tool.usageCount);

  const handleOpen = useCallback(() => {
    onOpen(tool.id, route);
  }, [tool.id, route, onOpen]);

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5",
        "hover:border-primary/30 hover:shadow-elevated transition-smooth cursor-pointer",
        "animate-fade-in",
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
      data-ocid={`tool-card-${tool.id}`}
    >
      {badge && (
        <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
          {badge}
        </Badge>
      )}

      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          colorClass,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
        {usageCount > 0 && (
          <span className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5">
            <Zap className="h-3 w-3" />
            {usageCount.toLocaleString()} uses
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-auto -mx-1 justify-start gap-1.5 text-primary hover:text-primary hover:bg-primary/5 font-medium text-sm px-2"
        onClick={handleOpen}
        data-ocid={`tool-open-btn-${tool.id}`}
      >
        Open Tool
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
}

function ToolCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <Skeleton className="h-8 w-24 mt-auto" />
    </div>
  );
}

// ─── PWA Install Button ──────────────────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function PwaInstallButton() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    deferredPrompt.current = null;
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2 border-primary/30 text-primary hover:bg-primary/5 transition-smooth"
      onClick={handleInstall}
      data-ocid="pwa-install-btn"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/20 py-16 text-center animate-fade-in"
      data-ocid="tools-empty-state"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <GraduationCap className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground">No tools available</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          All tools are currently disabled. Check back soon — we're adding more
          tools regularly!
        </p>
      </div>
    </div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export function HomePage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  // Fetch enabled tools from backend
  const { data: tools, isLoading } = useQuery<Tool[]>({
    queryKey: ["enabledTools"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnabledTools();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });

  // Record usage mutation
  const { mutate: recordUsage } = useMutation({
    mutationFn: async (toolId: string) => {
      if (!actor) return;
      await actor.recordToolUsage(toolId);
    },
  });

  // Track guest visitor on mount
  useEffect(() => {
    if (!actor || isFetching) return;
    const guestId = getGuestId();
    actor.trackGuestVisitor(guestId).catch(() => {
      // non-critical — ignore failures
    });
  }, [actor, isFetching]);

  const handleOpenTool = useCallback(
    (toolId: string, route: string) => {
      recordUsage(toolId);
      navigate({ to: route as "/" });
    },
    [recordUsage, navigate],
  );

  const toolList = tools ?? [];
  const showSkeleton = isLoading || isFetching;

  // Insert AdBanners between every 2 tool cards
  const toolRows: Array<"ad" | Tool> = [];
  toolList.forEach((tool, i) => {
    toolRows.push(tool);
    if ((i + 1) % 2 === 0 && i < toolList.length - 1) {
      toolRows.push("ad");
    }
  });

  return (
    <Layout>
      <div className="flex flex-col flex-1 px-4 md:px-6 py-6 max-w-4xl w-full mx-auto gap-6">
        {/* Hero Section */}
        <section
          className="flex flex-col gap-4 animate-fade-in"
          aria-label="Hero"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Free Student Tools
                  </span>
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
                Smart Tools for
                <br className="hidden sm:block" /> Smart Students
              </h1>
              <p className="text-muted-foreground max-w-md text-sm md:text-base leading-relaxed">
                Fast, free tools for students — GPA calculator, percentage
                calculator, and PDF utilities. No sign-up required.
              </p>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
              <PwaInstallButton />
            </div>
          </div>
        </section>

        {/* Header Ad */}
        <AdBanner slot="header" />

        {/* Tools Grid */}
        <section aria-label="Available Tools">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg text-foreground">Dashboard</h2>
            {!showSkeleton && toolList.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {toolList.length} tool{toolList.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {showSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <ToolCardSkeleton key={`sk-${n}`} />
              ))}
            </div>
          ) : toolList.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-4">
              {/* Build grid with ad banners inserted after every 2nd tool */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolList.slice(0, 2).map((tool, i) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onOpen={handleOpenTool}
                    index={i}
                  />
                ))}
              </div>

              {toolList.length > 2 && (
                <>
                  <AdBanner slot="between-cards" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toolList.slice(2, 4).map((tool, i) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onOpen={handleOpenTool}
                        index={i + 2}
                      />
                    ))}
                  </div>
                </>
              )}

              {toolList.length > 4 && (
                <>
                  <AdBanner slot="between-cards" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toolList.slice(4).map((tool, i) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onOpen={handleOpenTool}
                        index={i + 4}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* Quick stats bar */}
        <section
          className="rounded-xl bg-muted/40 border border-border px-6 py-5 flex flex-wrap gap-6 items-center justify-between animate-fade-in"
          aria-label="Platform highlights"
        >
          {[
            { label: "Free Tools", value: "3+" },
            { label: "No Sign-up", value: "✓" },
            { label: "Mobile Friendly", value: "✓" },
            { label: "Works Offline", value: "✓" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-xl font-bold font-display text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
