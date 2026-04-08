import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  GraduationCap,
  PlusCircle,
  RotateCcw,
  Share2,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useId, useState } from "react";
import { toast } from "sonner";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

// ── Grade data ────────────────────────────────────────────────────────────────

const GRADE_OPTIONS = [
  { label: "A+", value: "A+", points: 4.0 },
  { label: "A", value: "A", points: 4.0 },
  { label: "A-", value: "A-", points: 3.7 },
  { label: "B+", value: "B+", points: 3.3 },
  { label: "B", value: "B", points: 3.0 },
  { label: "B-", value: "B-", points: 2.7 },
  { label: "C+", value: "C+", points: 2.3 },
  { label: "C", value: "C", points: 2.0 },
  { label: "C-", value: "C-", points: 1.7 },
  { label: "D", value: "D", points: 1.0 },
  { label: "F", value: "F", points: 0.0 },
] as const;

type GradeValue = (typeof GRADE_OPTIONS)[number]["value"];

const GRADE_MAP: Record<GradeValue, number> = Object.fromEntries(
  GRADE_OPTIONS.map((g) => [g.value, g.points]),
) as Record<GradeValue, number>;

// ── Types ─────────────────────────────────────────────────────────────────────

interface SubjectRow {
  id: string;
  name: string;
  grade: GradeValue;
  credits: string;
}

function createRow(): SubjectRow {
  return {
    id: `row-${Date.now()}-${Math.random()}`,
    name: "",
    grade: "A",
    credits: "3",
  };
}

const INITIAL_ROWS: SubjectRow[] = [
  { id: "row-init-1", name: "", grade: "A", credits: "3" },
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
  const valid = rows.filter((r) => r.credits !== "" && Number(r.credits) > 0);
  if (valid.length === 0) return null;
  let totalPoints = 0;
  let totalCredits = 0;
  for (const row of valid) {
    const pts = GRADE_MAP[row.grade] ?? 0;
    const cr = Number(row.credits);
    totalPoints += pts * cr;
    totalCredits += cr;
  }
  return totalCredits > 0
    ? { gpa: totalPoints / totalCredits, totalCredits }
    : null;
}

// ── Page component ────────────────────────────────────────────────────────────

export function GpaCalculatorPage() {
  const headingId = useId();
  const [rows, setRows] = useState<SubjectRow[]>(INITIAL_ROWS);

  const result = calcGpa(rows);
  const gpaDisplay = result ? result.gpa.toFixed(2) : null;
  const status = result ? getGpaStatus(result.gpa) : null;
  const validCount = rows.filter((r) => Number(r.credits) > 0).length;

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
        { id: `row-reset-${Date.now()}`, name: "", grade: "A", credits: "3" },
      ]),
    [],
  );

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
            Enter your subjects, grades and credit hours for an instant weighted
            GPA.
          </p>
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
          <div className="hidden grid-cols-[1fr_130px_96px_36px] items-center gap-3 border-b border-border bg-muted/20 px-5 py-2 md:grid">
            <Label className="text-xs text-muted-foreground">
              Subject Name
            </Label>
            <Label className="text-xs text-muted-foreground">Grade</Label>
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
                    .filter((r) => Number(r.credits) > 0)
                    .map((row, idx) => {
                      const pts = GRADE_MAP[row.grade] ?? 0;
                      return (
                        <div
                          key={row.id}
                          className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                        >
                          <span className="min-w-0 truncate text-sm text-foreground">
                            {row.name || `Subject ${idx + 1}`}
                          </span>
                          <div className="ml-3 flex shrink-0 items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {row.grade}
                            </Badge>
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {pts.toFixed(1)} pts × {row.credits} cr
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Share */}
              <div className="border-t border-border px-5 py-4">
                <Button
                  type="button"
                  onClick={share}
                  className="w-full gap-2"
                  data-ocid="gpa-share"
                >
                  <Share2 className="h-4 w-4" />
                  Share My GPA
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
                Enter at least one subject with credit hours to see your GPA.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
          <GradeSelect
            value={row.grade}
            onChange={(v) => onUpdate(row.id, "grade", v as GradeValue)}
            label={`Subject ${num} grade`}
            ocid={`gpa-grade-${index}`}
            className="flex-1"
          />
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
      <div className="hidden grid-cols-[1fr_130px_96px_36px] items-center gap-3 md:grid">
        <div className="flex min-w-0 items-center gap-2">
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
        <GradeSelect
          value={row.grade}
          onChange={(v) => onUpdate(row.id, "grade", v as GradeValue)}
          label={`Subject ${num} grade`}
          ocid={`gpa-grade-md-${index}`}
        />
        <Input
          type="number"
          min="0"
          max="20"
          step="0.5"
          placeholder="3"
          value={row.credits}
          onChange={(e) => onUpdate(row.id, "credits", e.target.value)}
          className="h-9 text-sm"
          aria-label={`Subject ${num} credit hours`}
          data-ocid={`gpa-credits-md-${index}`}
        />
        <RemoveButton
          canRemove={canRemove}
          onClick={() => onRemove(row.id)}
          label={`Remove subject ${num}`}
          ocid={`gpa-remove-md-${index}`}
        />
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

function GradeSelect({
  value,
  onChange,
  label,
  ocid,
  className,
}: {
  value: GradeValue;
  onChange: (v: string) => void;
  label: string;
  ocid: string;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`h-9 text-sm ${className ?? ""}`}
        aria-label={label}
        data-ocid={ocid}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {GRADE_OPTIONS.map((g) => (
          <SelectItem key={g.value} value={g.value}>
            {g.label} — {g.points.toFixed(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
      "Free online GPA calculator for students. Enter subjects, grades and credit hours for an instant weighted GPA result.",
    );
    setMeta(
      'meta[property="og:title"]',
      "content",
      "GPA Calculator — StudentHub | Smart Tools for Smart Students",
    );
  }
  return null;
}
