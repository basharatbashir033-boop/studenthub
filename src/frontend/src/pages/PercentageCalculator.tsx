import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Award,
  Check,
  Copy,
  Percent,
  RotateCcw,
  Share2,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

interface CalcResult {
  percentage: number;
  letter: string;
  passFail: "pass" | "fail";
  label: string;
  labelColor: string;
  gradeColor: string;
}

function getLetterGrade(pct: number): string {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

function getPerformanceLabel(pct: number): {
  label: string;
  labelColor: string;
} {
  if (pct >= 90)
    return {
      label: "Excellent",
      labelColor: "text-emerald-600 dark:text-emerald-400",
    };
  if (pct >= 80)
    return { label: "Good", labelColor: "text-blue-600 dark:text-blue-400" };
  if (pct >= 70)
    return {
      label: "Average",
      labelColor: "text-yellow-600 dark:text-yellow-500",
    };
  if (pct >= 60)
    return {
      label: "Below Average",
      labelColor: "text-orange-600 dark:text-orange-400",
    };
  return {
    label: "Needs Improvement",
    labelColor: "text-destructive",
  };
}

function getGradeColor(letter: string): string {
  const map: Record<string, string> = {
    A: "text-emerald-600 dark:text-emerald-400",
    B: "text-blue-600 dark:text-blue-400",
    C: "text-yellow-600 dark:text-yellow-500",
    D: "text-orange-600 dark:text-orange-400",
    F: "text-destructive",
  };
  return map[letter] ?? "text-foreground";
}

function calculateResult(score: string, total: string): CalcResult | null {
  const s = Number.parseFloat(score);
  const t = Number.parseFloat(total);
  if (!score || !total || Number.isNaN(s) || Number.isNaN(t) || t <= 0)
    return null;
  const pct = Math.min((s / t) * 100, 100);
  const letter = getLetterGrade(pct);
  const { label, labelColor } = getPerformanceLabel(pct);
  return {
    percentage: pct,
    letter,
    passFail: pct >= 50 ? "pass" : "fail",
    label,
    labelColor,
    gradeColor: getGradeColor(letter),
  };
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Percent className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-foreground">
          Enter your score
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the Score and Total fields to see your results instantly
        </p>
      </div>
    </motion.div>
  );
}

function ResultsCard({ result }: { result: CalcResult }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    const text = `I scored ${result.percentage.toFixed(1)}% on StudentHub - Smart Tools for Smart Students`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!", { duration: 3000 });
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        toast.error("Could not copy to clipboard");
      });
  }, [result.percentage]);

  const passFailColor =
    result.passFail === "pass"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800";

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-5"
      data-ocid="results-card"
    >
      {/* Main percentage display */}
      <div className="rounded-2xl border border-border bg-card shadow-subtle p-6 flex flex-col items-center gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Your Score
        </p>
        <div className="flex items-end gap-1">
          <span
            className={`font-display text-7xl font-bold tabular-nums leading-none ${result.gradeColor}`}
          >
            {result.percentage.toFixed(1)}
          </span>
          <span className="font-display text-3xl font-semibold text-muted-foreground mb-2">
            %
          </span>
        </div>
        <div className={`text-sm font-semibold mt-1 ${result.labelColor}`}>
          {result.label}
        </div>
      </div>

      {/* Grade + Pass/Fail badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-1 shadow-subtle">
          <Award className="h-5 w-5 text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground">Letter Grade</p>
          <p className={`font-display text-4xl font-bold ${result.gradeColor}`}>
            {result.letter}
          </p>
        </div>
        <div
          className={`rounded-xl border p-4 flex flex-col items-center gap-1 ${passFailColor}`}
        >
          {result.passFail === "pass" ? (
            <Check className="h-5 w-5 mb-1" />
          ) : (
            <AlertCircle className="h-5 w-5 mb-1" />
          )}
          <p className="text-xs opacity-70">Status</p>
          <p className="font-display text-2xl font-bold capitalize">
            {result.passFail}
          </p>
          <p className="text-xs opacity-70">
            {result.passFail === "pass" ? "≥ 50%" : "< 50%"}
          </p>
        </div>
      </div>

      {/* Performance bar */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" /> Performance
          </span>
          <Badge variant="secondary" className="text-xs">
            {result.percentage.toFixed(1)}%
          </Badge>
        </div>
        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.percentage}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="h-full rounded-full gradient-primary"
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>0</span>
          <span>50 (Pass)</span>
          <span>100</span>
        </div>
      </div>

      {/* Share button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleShare}
        className="w-full gap-2 transition-smooth"
        data-ocid="share-btn"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-500" /> Copied!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <Copy className="h-4 w-4" /> Share my score
          </>
        )}
      </Button>
    </motion.div>
  );
}

export function PercentageCalculatorPage() {
  const [score, setScore] = useState("");
  const [total, setTotal] = useState("");
  const [basePercent, setBasePercent] = useState("");

  const effectiveScore =
    basePercent && score && total
      ? (
          (Number.parseFloat(score) / Number.parseFloat(total)) *
          Number.parseFloat(basePercent)
        ).toString()
      : score;

  const effectiveTotal = basePercent && total ? basePercent : total;
  const result = calculateResult(effectiveScore, effectiveTotal);

  const handleReset = () => {
    setScore("");
    setTotal("");
    setBasePercent("");
  };

  return (
    <Layout>
      {/* SEO meta */}
      <title>Percentage Calculator - StudentHub</title>

      <div className="flex flex-col flex-1 px-4 md:px-8 py-8 max-w-5xl w-full mx-auto gap-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Percent className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Percentage Calculator
            </h1>
            <p className="text-sm text-muted-foreground">
              Instant score analysis with grade and pass/fail indicator
            </p>
          </div>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left — Input form */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card shadow-subtle p-6 flex flex-col gap-5"
            data-ocid="input-panel"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Enter Your Scores
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Results update instantly as you type
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Score input */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="score" className="text-sm font-medium">
                  Score Obtained
                </Label>
                <Input
                  id="score"
                  type="number"
                  placeholder="e.g. 87"
                  value={score}
                  min="0"
                  onChange={(e) => setScore(e.target.value)}
                  className="transition-smooth focus:ring-2 focus:ring-primary/30"
                  data-ocid="score-input"
                />
              </div>

              {/* Total input */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="total" className="text-sm font-medium">
                  Total / Maximum Marks
                </Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="e.g. 100"
                  value={total}
                  min="1"
                  onChange={(e) => setTotal(e.target.value)}
                  className="transition-smooth focus:ring-2 focus:ring-primary/30"
                  data-ocid="total-input"
                />
              </div>

              {/* Optional base percentage */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="base-percent"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Base Percentage
                  <Badge variant="outline" className="text-xs font-normal">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id="base-percent"
                  type="number"
                  placeholder="e.g. 50 for weighted score"
                  value={basePercent}
                  min="1"
                  max="100"
                  onChange={(e) => setBasePercent(e.target.value)}
                  className="transition-smooth focus:ring-2 focus:ring-primary/30"
                  data-ocid="base-percent-input"
                />
                <p className="text-xs text-muted-foreground">
                  Used to calculate weighted score (e.g. 50% of the total marks)
                </p>
              </div>
            </div>

            {/* Grade scale reference */}
            <div className="rounded-xl bg-muted/50 border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Grade Scale
              </p>
              <div className="grid grid-cols-5 gap-1 text-center">
                {[
                  {
                    grade: "A",
                    range: "90–100",
                    color: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    grade: "B",
                    range: "80–89",
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    grade: "C",
                    range: "70–79",
                    color: "text-yellow-600 dark:text-yellow-500",
                  },
                  {
                    grade: "D",
                    range: "60–69",
                    color: "text-orange-600 dark:text-orange-400",
                  },
                  { grade: "F", range: "<60", color: "text-destructive" },
                ].map(({ grade, range, color }) => (
                  <div key={grade} className="flex flex-col gap-0.5">
                    <span className={`font-display text-lg font-bold ${color}`}>
                      {grade}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight">
                      {range}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="w-fit gap-2 transition-smooth"
              data-ocid="clear-btn"
            >
              <RotateCcw className="h-4 w-4" /> Clear All
            </Button>
          </motion.div>

          {/* Ad between panels (mobile only) */}
          <div className="lg:hidden">
            <AdBanner slot="between-cards" />
          </div>

          {/* Right — Results */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col gap-4"
            data-ocid="results-panel"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <ResultsCard key="results" result={result} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-border bg-card shadow-subtle"
                >
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Ad between cards (desktop) */}
        <div className="hidden lg:block">
          <AdBanner slot="between-cards" />
        </div>
      </div>
    </Layout>
  );
}
