import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  History,
  PlusCircle,
  RotateCcw,
  Save,
  Share2,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useId, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { GpaCalculation, GpaSubjectInput } from "../backend.d";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";

// ── How It Works collapsible ──────────────────────────────────────────────────

function HowItWorks({
  heading,
  steps,
  note,
}: {
  heading: string;
  steps: string[];
  note: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden"
      data-ocid="how-it-works-gpa"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground">{heading}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
          <ol className="flex flex-col gap-2.5">
            {steps.map((text, i) => (
              <li key={text} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {text}
                </span>
              </li>
            ))}
          </ol>
          {note && (
            <p className="text-xs text-muted-foreground/70 italic border-t border-border pt-3">
              💡 {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Marks → grade conversion ──────────────────────────────────────────────────

interface GradeInfo {
  letter: string;
  points: number;
}

function marksToGrade(marks: number): GradeInfo {
  if (marks >= 90) return { letter: "A+", points: 4.0 };
  if (marks >= 85) return { letter: "A", points: 4.0 };
  if (marks >= 80) return { letter: "A-", points: 3.7 };
  if (marks >= 75) return { letter: "B+", points: 3.3 };
  if (marks >= 71) return { letter: "B", points: 3.0 };
  if (marks >= 66) return { letter: "B-", points: 2.7 };
  if (marks >= 61) return { letter: "C+", points: 2.3 };
  if (marks >= 56) return { letter: "C", points: 2.0 };
  if (marks >= 50) return { letter: "C-", points: 1.7 };
  if (marks >= 45) return { letter: "D+", points: 1.3 };
  if (marks >= 40) return { letter: "D", points: 1.0 };
  return { letter: "F", points: 0.0 };
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface SubjectRow {
  id: string;
  name: string;
  /** Raw marks string from input (0-100) */
  marks: string;
  credits: string;
}

function createRow(): SubjectRow {
  return {
    id: `row-${Date.now()}-${Math.random()}`,
    name: "",
    marks: "",
    credits: "3",
  };
}

const INITIAL_ROWS: SubjectRow[] = [
  { id: "row-init-1", name: "", marks: "", credits: "3" },
];

// ── GPA status ────────────────────────────────────────────────────────────────

function getGpaStatus(gpa: number): { label: string; colorClass: string } {
  if (gpa >= 4.0)
    return {
      label: "Summa Cum Laude",
      colorClass: "text-emerald-600 dark:text-emerald-400",
    };
  if (gpa >= 3.7)
    return { label: "Magna Cum Laude", colorClass: "text-primary" };
  if (gpa >= 3.5) return { label: "Cum Laude", colorClass: "text-primary" };
  if (gpa >= 3.0) return { label: "Good Standing", colorClass: "text-primary" };
  if (gpa >= 2.0)
    return {
      label: "Satisfactory",
      colorClass: "text-amber-600 dark:text-amber-400",
    };
  return { label: "At Risk", colorClass: "text-destructive" };
}

function calcGpa(
  rows: SubjectRow[],
): { gpa: number; totalCredits: number } | null {
  const valid = rows.filter(
    (r) => r.credits !== "" && Number(r.credits) > 0 && r.marks !== "",
  );
  if (valid.length === 0) return null;
  let totalPoints = 0;
  let totalCredits = 0;
  for (const row of valid) {
    const m = Number(row.marks);
    if (Number.isNaN(m) || m < 0 || m > 100) continue;
    const { points } = marksToGrade(m);
    const cr = Number(row.credits);
    totalPoints += points * cr;
    totalCredits += cr;
  }
  return totalCredits > 0
    ? { gpa: totalPoints / totalCredits, totalCredits }
    : null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTimestamp(ts: bigint): string {
  try {
    // Backend timestamp is in nanoseconds (ICP standard)
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Unknown date";
  }
}

// ── History Section ───────────────────────────────────────────────────────────

interface HistorySectionProps {
  userId: string;
  onLoad: (calc: GpaCalculation) => void;
}

function HistorySection({ userId, onLoad }: HistorySectionProps) {
  const { actor, isFetching } = useActor(createActor);
  const [showAll, setShowAll] = useState(false);

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery<GpaCalculation[]>({
    queryKey: ["gpaHistory", userId],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getUserGpaHistory(userId);
      // Sort newest first
      return [...results].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 1000 * 30,
  });

  if (isLoading) {
    return (
      <section className="mt-8" aria-label="GPA History loading">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Previous Calculations
          </h2>
        </div>
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <Skeleton key={n} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-8" aria-label="GPA History error">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Previous Calculations
          </h2>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 px-5 py-6 text-center text-sm text-muted-foreground">
          Unable to load history. Please try again later.
        </div>
      </section>
    );
  }

  const allCalcs = history ?? [];
  const PREVIEW_COUNT = 5;
  const visibleCalcs = showAll ? allCalcs : allCalcs.slice(0, PREVIEW_COUNT);
  const hasMore = allCalcs.length > PREVIEW_COUNT;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.1 }}
      className="mt-8"
      aria-label="Previous GPA Calculations"
      data-ocid="gpa-history-section"
    >
      <div className="flex items-center gap-2 mb-4">
        <History className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">
          Previous Calculations
        </h2>
        {allCalcs.length > 0 && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {allCalcs.length}
          </span>
        )}
      </div>

      {allCalcs.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-border bg-muted/20 px-5 py-8 text-center"
          data-ocid="gpa-history-empty"
        >
          <Clock className="mx-auto mb-2 h-6 w-6 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground mb-1">
            No history yet
          </p>
          <p className="text-xs text-muted-foreground">
            Calculate your GPA and save it — your history will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {visibleCalcs.map((calc, idx) => (
                <HistoryCard
                  key={calc.id.toString()}
                  calc={calc}
                  onLoad={onLoad}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-3 w-full gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setShowAll((v) => !v)}
              data-ocid="gpa-history-toggle"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  Show all {allCalcs.length} calculations
                </>
              )}
            </Button>
          )}
        </>
      )}
    </motion.section>
  );
}

interface HistoryCardProps {
  calc: GpaCalculation;
  onLoad: (calc: GpaCalculation) => void;
  index: number;
}

function HistoryCard({ calc, onLoad, index }: HistoryCardProps) {
  const status = getGpaStatus(calc.calculatedGpa);
  const subjectCount = calc.subjects.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 transition-colors"
      data-ocid={`gpa-history-card-${index}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xl font-bold font-display tabular-nums ${status.colorClass}`}
          >
            {calc.calculatedGpa.toFixed(2)}
          </span>
          <Badge variant="secondary" className="text-xs shrink-0">
            {status.label}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{Number(calc.totalCredits)} credits</span>
          <span>·</span>
          <span>
            {subjectCount} subject{subjectCount !== 1 ? "s" : ""}
          </span>
          <span>·</span>
          <span>{formatTimestamp(calc.timestamp)}</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0 gap-1.5 text-xs"
        onClick={() => onLoad(calc)}
        data-ocid={`gpa-history-load-${index}`}
      >
        Load
      </Button>
    </motion.div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export function GpaCalculatorPage() {
  const headingId = useId();
  const [rows, setRows] = useState<SubjectRow[]>(INITIAL_ROWS);
  const [isSaving, setIsSaving] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const result = calcGpa(rows);
  const gpaDisplay = result ? result.gpa.toFixed(2) : null;
  const status = result ? getGpaStatus(result.gpa) : null;
  const validCount = rows.filter(
    (r) => Number(r.credits) > 0 && r.marks !== "",
  ).length;

  const addRow = useCallback(
    () => setRows((prev) => [...prev, createRow()]),
    [],
  );

  const removeRow = useCallback(
    (id: string) =>
      setRows((prev) =>
        prev.length > 1 ? prev.filter((r) => r.id !== id) : prev,
      ),
    [],
  );

  const updateRow = useCallback(
    <K extends keyof SubjectRow>(id: string, key: K, value: SubjectRow[K]) =>
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
      ),
    [],
  );

  const reset = useCallback(
    () =>
      setRows([
        { id: `row-reset-${Date.now()}`, name: "", marks: "", credits: "3" },
      ]),
    [],
  );

  /** Load a historical calculation into the form. */
  const loadHistory = useCallback((calc: GpaCalculation) => {
    const loaded: SubjectRow[] = calc.subjects.map((s, i) => ({
      id: `row-loaded-${i}-${Date.now()}`,
      name: s.subjectName,
      marks: String(Number(s.marks)),
      credits: String(Number(s.credits)),
    }));
    setRows(loaded.length > 0 ? loaded : INITIAL_ROWS);
    toast.success("Calculation loaded!", {
      description: `GPA ${calc.calculatedGpa.toFixed(2)} \u00B7 ${calc.subjects.length} subjects`,
      duration: 3500,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Save current GPA to backend and refresh history. */
  const saveCalculation = useCallback(async () => {
    if (!result || !user || !actor || isFetching) return;

    const validRows = rows.filter(
      (r) => Number(r.credits) > 0 && r.marks !== "",
    );

    const subjects: GpaSubjectInput[] = validRows.map((r) => ({
      subjectName: r.name || "Subject",
      marks: BigInt(Math.round(Number(r.marks))),
      credits: BigInt(Math.round(Number(r.credits))),
    }));

    setIsSaving(true);
    try {
      await actor.saveGpaCalculation(
        user.id,
        subjects,
        result.gpa,
        BigInt(result.totalCredits),
      );
      await queryClient.invalidateQueries({
        queryKey: ["gpaHistory", user.id],
      });
      toast.success("GPA saved!", {
        description: `GPA ${result.gpa.toFixed(2)} has been added to your history.`,
        duration: 4000,
      });
    } catch (e) {
      console.error("Save GPA error:", e);
      toast.error("Could not save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [result, rows, user, actor, isFetching, queryClient]);

  const share = useCallback(async () => {
    if (!gpaDisplay) return;
    const text = `My GPA is ${gpaDisplay} on StudentHub - Smart Tools for Smart Students`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        description: text,
        duration: 4500,
      });
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  }, [gpaDisplay]);

  return (
    <Layout>
      <PageMeta />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            GPA Calculator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your marks (0–100) for each subject and credit hours for an
            instant weighted GPA.
          </p>
          {isAuthenticated && user && (
            <p className="mt-1 text-xs text-muted-foreground/70">
              Signed in as <span className="text-primary">{user.email}</span> —
              results will be saved to your account.
            </p>
          )}
        </motion.div>

        {/* Form card */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-card shadow-subtle"
          aria-labelledby={headingId}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2
                id={headingId}
                className="text-sm font-semibold text-foreground"
              >
                Your Subjects
              </h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {rows.length}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={reset}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              data-ocid="gpa-reset"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>

          {/* Desktop column headers */}
          <div className="hidden grid-cols-[1fr_150px_96px_36px] items-center gap-3 border-b border-border bg-muted/20 px-5 py-2 md:grid">
            <Label className="text-xs text-muted-foreground">
              Subject Name
            </Label>
            <Label className="text-xs text-muted-foreground">
              Marks (0–100)
            </Label>
            <Label className="text-xs text-muted-foreground">Credits</Label>
            <span />
          </div>

          {/* Subject rows */}
          <div className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {rows.map((row, idx) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <SubjectRowInput
                    row={row}
                    index={idx}
                    onUpdate={updateRow}
                    onRemove={removeRow}
                    canRemove={rows.length > 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add subject */}
          <div className="px-5 py-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRow}
              className="w-full gap-2 border-dashed"
              data-ocid="gpa-add-subject"
            >
              <PlusCircle className="h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </motion.section>

        {/* Ad slot */}
        <AdBanner slot="between-cards" className="my-6" />

        {/* Results */}
        <AnimatePresence>
          {result && gpaDisplay && status ? (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card shadow-subtle overflow-hidden"
              aria-label="GPA Results"
              data-ocid="gpa-results"
            >
              {/* Hero GPA banner */}
              <div className="gradient-primary px-6 py-10 text-center">
                <p className="mb-1 text-sm font-medium text-primary-foreground/80">
                  Your Overall GPA
                </p>
                <p
                  className="font-display text-6xl font-bold tracking-tight text-primary-foreground"
                  data-ocid="gpa-score"
                >
                  {gpaDisplay}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  out of 4.00
                </p>
                <Badge
                  className="mt-4 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
                  data-ocid="gpa-status-badge"
                >
                  {status.label}
                </Badge>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
                <div className="px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {result.totalCredits}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Credits</p>
                </div>
                <div className="px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {validCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </div>
              </div>

              {/* Grade breakdown */}
              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Grade Breakdown
                </p>
                <div className="space-y-2">
                  {rows
                    .filter((r) => Number(r.credits) > 0 && r.marks !== "")
                    .map((row, idx) => {
                      const m = Number(row.marks);
                      const { letter, points } = marksToGrade(
                        Number.isNaN(m) ? 0 : Math.min(100, Math.max(0, m)),
                      );
                      return (
                        <div
                          key={row.id}
                          className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                        >
                          <span className="min-w-0 truncate text-sm text-foreground">
                            {row.name || `Subject ${idx + 1}`}
                          </span>
                          <div className="ml-3 flex shrink-0 items-center gap-2">
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {row.marks} marks
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {letter}
                            </Badge>
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {points.toFixed(1)} pts × {row.credits} cr
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border px-5 py-4 flex gap-3">
                {isAuthenticated && user ? (
                  <Button
                    type="button"
                    onClick={saveCalculation}
                    disabled={isSaving || isFetching}
                    className="flex-1 gap-2"
                    data-ocid="gpa-save"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving…" : "Save to History"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2 text-muted-foreground"
                    disabled
                    data-ocid="gpa-save-disabled"
                    title="Log in to save your GPA history"
                  >
                    <Save className="h-4 w-4" />
                    Log in to save
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={share}
                  className="gap-2"
                  data-ocid="gpa-share"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center"
              data-ocid="gpa-empty-state"
            >
              <GraduationCap className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Enter marks and credit hours for at least one subject to see
                your GPA.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previous Calculations — shown only when logged in */}
        {isAuthenticated && user && (
          <HistorySection userId={user.id} onLoad={loadHistory} />
        )}

        {/* Prompt to log in if not authenticated */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mt-8 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-6 text-center"
            data-ocid="gpa-login-prompt"
          >
            <History className="mx-auto mb-2 h-6 w-6 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground mb-1">
              Save your GPA history
            </p>
            <p className="text-xs text-muted-foreground">
              Log in to save calculations and see your GPA over time.
            </p>
          </motion.div>
        )}

        <HowItWorks
          heading="How does the GPA Calculator work?"
          steps={[
            "Enter each subject name, your marks (out of 100), and the credit hours for that subject.",
            "The calculator instantly converts your marks to a letter grade (A, B, C, etc.) and grade points (4.0 scale).",
            "Add all your subjects and see your overall weighted GPA calculated in real time.",
            'If you\'re logged in, click "Save GPA" to store your results — you can view your history anytime.',
            'Use "Load" from your history to quickly revisit and compare previous semester results.',
          ]}
          note="Marks are on a 0–100 scale. The GPA uses a 4.0 scale: 90–100 = A (4.0), 80–89 = B (3.0), 70–79 = C (2.0), 60–69 = D (1.0), below 60 = F (0.0)."
        />
      </div>
    </Layout>
  );
}

// ── Subject row ───────────────────────────────────────────────────────────────

interface SubjectRowInputProps {
  row: SubjectRow;
  index: number;
  onUpdate: <K extends keyof SubjectRow>(
    id: string,
    key: K,
    val: SubjectRow[K],
  ) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

function SubjectRowInput({
  row,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: SubjectRowInputProps) {
  const num = index + 1;
  const marksNum = Number(row.marks);
  const marksValid =
    row.marks !== "" &&
    !Number.isNaN(marksNum) &&
    marksNum >= 0 &&
    marksNum <= 100;
  const marksError =
    row.marks !== "" &&
    !Number.isNaN(marksNum) &&
    (marksNum < 0 || marksNum > 100);
  const gradePreview = marksValid ? marksToGrade(marksNum) : null;

  return (
    <div className="px-5 py-3">
      {/* Mobile layout */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-2">
          <IndexBadge num={num} />
          <Input
            type="text"
            placeholder={`Subject ${num}`}
            value={row.name}
            onChange={(e) => onUpdate(row.id, "name", e.target.value)}
            className="h-9 flex-1 text-sm"
            aria-label={`Subject ${num} name`}
            data-ocid={`gpa-name-${index}`}
          />
          <RemoveButton
            canRemove={canRemove}
            onClick={() => onRemove(row.id)}
            label={`Remove subject ${num}`}
            ocid={`gpa-remove-${index}`}
          />
        </div>
        <div className="flex gap-2 pl-7">
          <div className="flex flex-1 flex-col gap-1">
            <Input
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="Enter marks"
              value={row.marks}
              onChange={(e) => onUpdate(row.id, "marks", e.target.value)}
              className={`h-9 text-sm ${marksError ? "border-destructive focus-visible:ring-destructive" : ""}`}
              aria-label={`Subject ${num} marks`}
              data-ocid={`gpa-marks-${index}`}
            />
            {marksError && (
              <span className="text-xs text-destructive">Must be 0–100</span>
            )}
            {gradePreview && (
              <span className="text-xs font-medium text-primary">
                {gradePreview.letter} ({gradePreview.points.toFixed(1)})
              </span>
            )}
          </div>
          <Input
            type="number"
            min="0"
            max="20"
            step="0.5"
            placeholder="Credits"
            value={row.credits}
            onChange={(e) => onUpdate(row.id, "credits", e.target.value)}
            className="h-9 w-24 text-sm"
            aria-label={`Subject ${num} credit hours`}
            data-ocid={`gpa-credits-${index}`}
          />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden grid-cols-[1fr_150px_96px_36px] items-start gap-3 md:grid">
        <div className="flex min-w-0 items-center gap-2 pt-1.5">
          <IndexBadge num={num} />
          <Input
            type="text"
            placeholder={`Subject ${num}`}
            value={row.name}
            onChange={(e) => onUpdate(row.id, "name", e.target.value)}
            className="h-9 min-w-0 flex-1 text-sm"
            aria-label={`Subject ${num} name`}
            data-ocid={`gpa-name-md-${index}`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Input
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="Enter marks"
            value={row.marks}
            onChange={(e) => onUpdate(row.id, "marks", e.target.value)}
            className={`h-9 text-sm ${marksError ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-label={`Subject ${num} marks`}
            data-ocid={`gpa-marks-md-${index}`}
          />
          {marksError && (
            <span className="text-xs text-destructive">Must be 0–100</span>
          )}
          {gradePreview && (
            <span className="text-xs font-medium text-primary">
              {gradePreview.letter} ({gradePreview.points.toFixed(1)})
            </span>
          )}
        </div>
        <Input
          type="number"
          min="0"
          max="20"
          step="0.5"
          placeholder="3"
          value={row.credits}
          onChange={(e) => onUpdate(row.id, "credits", e.target.value)}
          className="h-9 text-sm mt-0.5"
          aria-label={`Subject ${num} credit hours`}
          data-ocid={`gpa-credits-md-${index}`}
        />
        <div className="pt-0.5">
          <RemoveButton
            canRemove={canRemove}
            onClick={() => onRemove(row.id)}
            label={`Remove subject ${num}`}
            ocid={`gpa-remove-md-${index}`}
          />
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function IndexBadge({ num }: { num: number }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
      {num}
    </span>
  );
}

function RemoveButton({
  canRemove,
  onClick,
  label,
  ocid,
}: {
  canRemove: boolean;
  onClick: () => void;
  label: string;
  ocid: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={!canRemove}
      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-25"
      aria-label={label}
      data-ocid={ocid}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  );
}

// ── SEO meta update ───────────────────────────────────────────────────────────

function PageMeta() {
  if (typeof document !== "undefined") {
    document.title =
      "GPA Calculator — StudentHub | Smart Tools for Smart Students";

    const setMeta = (selector: string, attr: string, val: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, key] = selector.match(/\[(.+)=/) ?? [];
        if (key) el.setAttribute(key.replace(/['"]/g, ""), val);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    setMeta(
      'meta[name="description"]',
      "content",
      "Free online GPA calculator. Enter your marks (0-100) for each subject and credit hours for an instant weighted GPA result.",
    );
    setMeta(
      'meta[property="og:title"]',
      "content",
      "GPA Calculator — StudentHub | Smart Tools for Smart Students",
    );
  }
  return null;
}
