import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  BarChart2,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Megaphone,
  Monitor,
  Pencil,
  Plus,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { createActor } from "../backend";
import type {
  AdSettings,
  Announcement,
  Tool,
  ToolSummary,
  VisitorStats,
} from "../backend.d";
import { Layout } from "../components/layout/Layout";
import { useAdmin } from "../hooks/useAdmin";

// ─── Login Form ──────────────────────────────────────────────────────────────

function LoginForm({
  onLogin,
}: {
  onLogin: (email: string, pass: string) => Promise<boolean>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await onLogin(email, password);
    if (!ok) setError("Invalid email or password. Please try again.");
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-elevated animate-slide-up">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-subtle">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Access the StudentHub admin panel
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              data-ocid="admin-email-input"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pr-10"
                data-ocid="admin-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-1"
            data-ocid="admin-login-btn"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
  collapsible = false,
  defaultOpen = true,
  id,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden"
      data-ocid={id}
    >
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-between px-5 py-4",
          collapsible && "cursor-pointer hover:bg-muted/30 transition-colors",
          !collapsible && "cursor-default",
        )}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
        aria-expanded={collapsible ? open : undefined}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-display font-semibold text-base text-foreground">
            {title}
          </h2>
        </div>
        {collapsible &&
          (open ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ))}
      </button>
      {(!collapsible || open) && (
        <div className="px-5 pb-5 pt-1 border-t border-border">{children}</div>
      )}
    </div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────

function StatsRow({
  stats,
  usageSummary,
  loading,
}: {
  stats: VisitorStats | null;
  usageSummary: ToolSummary | null;
  loading: boolean;
}) {
  const totalToday =
    usageSummary?.perTool?.reduce((acc, t) => acc + Number(t.usageCount), 0) ??
    0;
  const totalAllTime = Number(usageSummary?.totalUsage ?? 0);

  const items = [
    {
      label: "Total Visitors",
      value: stats ? Number(stats.totalVisitors).toLocaleString() : "—",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Tool Uses Today",
      value: loading ? "—" : totalToday.toLocaleString(),
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Tool Uses All-Time",
      value: loading ? "—" : totalAllTime.toLocaleString(),
      icon: BarChart2,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-5 flex items-center gap-4"
          >
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                item.bg,
              )}
            >
              <Icon className={cn("h-5 w-5", item.color)} />
            </div>
            <div className="min-w-0">
              {loading ? (
                <Skeleton className="h-7 w-16 mb-1" />
              ) : (
                <p className="text-2xl font-bold font-display text-foreground leading-none">
                  {item.value}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Usage Chart ──────────────────────────────────────────────────────────────

function UsageChart({
  usageSummary,
  tools,
  loading,
}: {
  usageSummary: ToolSummary | null;
  tools: Tool[];
  loading: boolean;
}) {
  const chartData = (usageSummary?.perTool ?? []).map((stat) => {
    const tool = tools.find((t) => t.id === stat.toolId);
    return {
      name: tool?.name ?? stat.toolId,
      uses: Number(stat.usageCount),
    };
  });

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="h-48 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <BarChart2 className="h-8 w-8 opacity-40" />
        <p className="text-sm">No usage data yet</p>
      </div>
    );
  }

  return (
    <div className="h-52 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "oklch(var(--foreground))",
            }}
            cursor={{ fill: "oklch(var(--muted) / 0.4)" }}
          />
          <Bar
            dataKey="uses"
            fill="oklch(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Uses"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Tools Table ──────────────────────────────────────────────────────────────

function ToolsTable({
  tools,
  loading,
  onToggle,
}: {
  tools: Tool[];
  loading: boolean;
  onToggle: (toolId: string, enabled: boolean) => Promise<void>;
}) {
  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = async (toolId: string, current: boolean) => {
    setToggling(toolId);
    await onToggle(toolId, !current);
    setToggling(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3 mt-4">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!tools.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6 mt-2">
        No tools found.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border mt-4">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="flex items-center justify-between py-3 gap-4"
          data-ocid={`tool-toggle-${tool.id}`}
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-medium text-sm text-foreground truncate">
              {tool.name}
            </span>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs w-fit",
                  tool.enabled
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {tool.enabled ? "Enabled" : "Disabled"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {Number(tool.usageCount).toLocaleString()} uses
              </span>
            </div>
          </div>
          <Switch
            checked={tool.enabled}
            onCheckedChange={() => handleToggle(tool.id, tool.enabled)}
            disabled={toggling === tool.id}
            aria-label={`Toggle ${tool.name}`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Announcement Item ────────────────────────────────────────────────────────

function AnnouncementItem({
  ann,
  onUpdate,
  onDelete,
  onToggleActive,
}: {
  ann: Announcement;
  onUpdate: (id: bigint, text: string, active: boolean) => Promise<void>;
  onDelete: (id: bigint) => Promise<void>;
  onToggleActive: (id: bigint, text: string, active: boolean) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(ann.text);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleStartEdit = () => {
    setEditText(ann.text);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = async () => {
    if (!editText.trim()) return;
    setSaving(true);
    await onUpdate(ann.id, editText.trim(), ann.active);
    setSaving(false);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditText(ann.text);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this announcement?")) return;
    setDeleting(true);
    await onDelete(ann.id);
    setDeleting(false);
  };

  const handleToggle = async () => {
    await onToggleActive(ann.id, ann.text, !ann.active);
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 flex flex-col gap-3 transition-smooth",
        ann.active
          ? "border-border bg-background"
          : "border-border bg-muted/30",
      )}
      data-ocid={`announcement-item-${String(ann.id)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs shrink-0",
              ann.active
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-muted text-muted-foreground",
            )}
          >
            {ann.active ? "Active" : "Inactive"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            #{String(ann.id)}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Switch
            checked={ann.active}
            onCheckedChange={handleToggle}
            aria-label="Toggle announcement active state"
            className="scale-75"
          />
          <button
            type="button"
            onClick={handleStartEdit}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Edit announcement"
            data-ocid={`announcement-edit-${String(ann.id)}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Delete announcement"
            data-ocid={`announcement-delete-${String(ann.id)}`}
          >
            {deleting ? (
              <span className="h-3.5 w-3.5 block rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={2}
            className="w-full text-sm rounded-lg border border-input bg-background px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid={`announcement-edit-textarea-${String(ann.id)}`}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={saving || !editText.trim()}
              data-ocid={`announcement-save-${String(ann.id)}`}
            >
              {saving ? (
                "Saving…"
              ) : (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" /> Save
                </>
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
            >
              <X className="h-3.5 w-3.5 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-foreground leading-relaxed">{ann.text}</p>
      )}
    </div>
  );
}

// ─── Announcements Section ────────────────────────────────────────────────────

function AnnouncementsSection({
  actor,
}: {
  actor: import("../backend.d").backendInterface | null;
}) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor
      .adminListAnnouncements()
      .then((list) => {
        setAnnouncements(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !newText.trim()) return;
    setAdding(true);
    try {
      const created = await actor.adminCreateAnnouncement(newText.trim());
      setAnnouncements((prev) => [...prev, created]);
      setNewText("");
      toast.success("Announcement created");
    } catch {
      toast.error("Failed to create announcement");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id: bigint, text: string, active: boolean) => {
    if (!actor) return;
    try {
      await actor.adminUpdateAnnouncement(id, text, active);
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, text, active } : a)),
      );
      toast.success("Announcement updated");
    } catch {
      toast.error("Failed to update announcement");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.adminDeleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      toast.success("Announcement deleted");
    } catch {
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Add form */}
      <form
        onSubmit={handleCreate}
        className="flex flex-col sm:flex-row gap-2"
        data-ocid="add-announcement-form"
      >
        <Input
          placeholder="Enter announcement text…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1"
          data-ocid="announcement-text-input"
        />
        <Button
          type="submit"
          disabled={adding || !newText.trim() || !actor}
          className="shrink-0"
          data-ocid="create-announcement-btn"
        >
          {adding ? (
            "Adding…"
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1.5" /> Add
            </>
          )}
        </Button>
      </form>

      {/* List */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((n) => (
            <Skeleton key={n} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Megaphone className="h-8 w-8 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground">No announcements yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {announcements.map((ann) => (
            <AnnouncementItem
              key={String(ann.id)}
              ann={ann}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onToggleActive={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Ad Controls Section ──────────────────────────────────────────────────────

function AdControlsSection({
  actor,
}: {
  actor: import("../backend.d").backendInterface | null;
}) {
  const [settings, setSettings] = useState<AdSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor
      .getAdSettings()
      .then((s) => {
        setSettings(s);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  const toggleAd = async (
    slot: "header" | "sidebar" | "betweenCards",
    current: boolean,
  ) => {
    if (!actor) return;
    setToggling(slot);
    try {
      const next = !current;
      if (slot === "header") await actor.adminSetHeaderAd(next);
      else if (slot === "sidebar") await actor.adminSetSidebarAd(next);
      else await actor.adminSetBetweenCardsAd(next);
      setSettings((prev) =>
        prev
          ? {
              ...prev,
              [`${slot}AdEnabled`]: next,
            }
          : prev,
      );
      toast.success("Ad setting updated");
    } catch {
      toast.error("Failed to update ad setting");
    } finally {
      setToggling(null);
    }
  };

  const adSlots = [
    {
      key: "header" as const,
      label: "Header Banner Ad",
      description: "728×90 banner shown at the top of all pages",
      enabled: settings?.headerAdEnabled ?? false,
    },
    {
      key: "sidebar" as const,
      label: "Sidebar Ad",
      description: "300×250 rectangle shown in sidebar on desktop",
      enabled: settings?.sidebarAdEnabled ?? false,
    },
    {
      key: "betweenCards" as const,
      label: "Between-Cards Ad",
      description: "320×50 inline ad shown between tool cards",
      enabled: settings?.betweenCardsAdEnabled ?? false,
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-14 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border mt-4">
      {adSlots.map((slot) => (
        <div
          key={slot.key}
          className="flex items-center justify-between py-4 gap-4"
          data-ocid={`ad-toggle-${slot.key}`}
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-medium text-foreground">
              {slot.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {slot.description}
            </span>
          </div>
          <Switch
            checked={slot.enabled}
            onCheckedChange={() => toggleAd(slot.key, slot.enabled)}
            disabled={toggling === slot.key}
            aria-label={`Toggle ${slot.label}`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Change Password Section ──────────────────────────────────────────────────

function ChangePasswordSection({
  actor,
}: {
  actor: import("../backend.d").backendInterface | null;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const mismatch = next !== confirm && confirm.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    if (next !== confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (next.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      const ok = await actor.adminChangePassword(current, next);
      if (ok) {
        toast.success("Password updated successfully");
        setCurrent("");
        setNext("");
        setConfirm("");
      } else {
        toast.error("Current password is incorrect");
      }
    } catch {
      toast.error("Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="current-password">Current Password</Label>
        <div className="relative">
          <Input
            id="current-password"
            type={showCurrent ? "text" : "password"}
            placeholder="••••••••"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className="pr-10"
            data-ocid="change-pw-current"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showCurrent ? "Hide" : "Show"}
          >
            {showCurrent ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="new-password">New Password</Label>
        <div className="relative">
          <Input
            id="new-password"
            type={showNext ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            className="pr-10"
            data-ocid="change-pw-new"
          />
          <button
            type="button"
            onClick={() => setShowNext((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showNext ? "Hide" : "Show"}
          >
            {showNext ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Repeat new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={cn(
            mismatch && "border-destructive focus-visible:ring-destructive",
          )}
          data-ocid="change-pw-confirm"
        />
        {mismatch && (
          <p className="text-xs text-destructive">Passwords do not match</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={saving || !current || !next || !confirm || mismatch || !actor}
        className="w-fit"
        data-ocid="change-pw-submit"
      >
        {saving ? "Saving…" : "Update Password"}
      </Button>
    </form>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const [tools, setTools] = useState<Tool[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [usageSummary, setUsageSummary] = useState<ToolSummary | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [toolsLoading, setToolsLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    Promise.all([actor.adminGetVisitorStats(), actor.adminGetUsageStats()])
      .then(([vs, us]) => {
        setVisitorStats(vs);
        setUsageSummary(us);
        setStatsLoading(false);
      })
      .catch(() => setStatsLoading(false));
  }, [actor, isFetching]);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .adminGetAllTools()
      .then((list) => {
        setTools(list);
        setToolsLoading(false);
      })
      .catch(() => setToolsLoading(false));
  }, [actor, isFetching]);

  const handleToggleTool = async (toolId: string, enabled: boolean) => {
    if (!actor) return;
    try {
      await actor.adminSetToolEnabled(toolId, enabled);
      setTools((prev) =>
        prev.map((t) => (t.id === toolId ? { ...t, enabled } : t)),
      );
      toast.success(`Tool ${enabled ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Failed to update tool");
    }
  };

  return (
    <div className="flex flex-col flex-1 px-4 md:px-6 py-6 w-full max-w-4xl mx-auto gap-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shadow-subtle">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage StudentHub settings
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onLogout}
          data-ocid="admin-logout-btn"
          className="shrink-0"
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>

      {/* Stats */}
      <StatsRow
        stats={visitorStats}
        usageSummary={usageSummary}
        loading={statsLoading}
      />

      {/* Tabs for main sections */}
      <Tabs defaultValue="overview" data-ocid="admin-tabs">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="overview" data-ocid="admin-tab-overview">
            <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tools" data-ocid="admin-tab-tools">
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            Tools
          </TabsTrigger>
          <TabsTrigger
            value="announcements"
            data-ocid="admin-tab-announcements"
          >
            <Megaphone className="h-3.5 w-3.5 mr-1.5" />
            Announcements
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-5 flex flex-col gap-5">
          <Section title="Tool Usage Chart" icon={BarChart2} id="section-chart">
            <UsageChart
              usageSummary={usageSummary}
              tools={tools}
              loading={statsLoading}
            />
          </Section>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools" className="mt-5 flex flex-col gap-5">
          <Section title="Manage Tools" icon={Settings} id="section-tools">
            <ToolsTable
              tools={tools}
              loading={toolsLoading}
              onToggle={handleToggleTool}
            />
          </Section>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="mt-5 flex flex-col gap-5">
          <Section
            title="Announcements"
            icon={Megaphone}
            id="section-announcements"
          >
            <AnnouncementsSection actor={actor} />
          </Section>
        </TabsContent>
      </Tabs>

      {/* Always-visible collapsible sections */}
      <Section
        title="Ad Placement Controls"
        icon={Monitor}
        collapsible
        defaultOpen
        id="section-ads"
      >
        <AdControlsSection actor={actor} />
      </Section>

      <Section
        title="Change Password"
        icon={Lock}
        collapsible
        defaultOpen={false}
        id="section-password"
      >
        <ChangePasswordSection actor={actor} />
      </Section>

      <Separator />
    </div>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export function AdminPage() {
  const { isAdmin, login, logout } = useAdmin();

  return (
    <Layout hideSidebar>
      {isAdmin ? (
        <AdminDashboard onLogout={logout} />
      ) : (
        <LoginForm onLogin={login} />
      )}
    </Layout>
  );
}
