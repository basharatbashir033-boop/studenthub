import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Layout, P as Percent, B as Button, E as ue } from "./index-Djw4MOVq.js";
import { B as Badge } from "./badge-BX8uhptP.js";
import { L as Label, I as Input, C as Check } from "./label-D1h8cSLz.js";
import { A as AdBanner } from "./AdBanner-VJr6oczF.js";
import { m as motion, R as RotateCcw, A as AnimatePresence, S as Share2 } from "./proxy-CpBlCbOu.js";
import { C as CircleAlert } from "./circle-alert-B0HheMgk.js";
import { T as TrendingUp } from "./trending-up-B9rdJjKc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function getLetterGrade(pct) {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}
function getPerformanceLabel(pct) {
  if (pct >= 90)
    return {
      label: "Excellent",
      labelColor: "text-emerald-600 dark:text-emerald-400"
    };
  if (pct >= 80)
    return { label: "Good", labelColor: "text-blue-600 dark:text-blue-400" };
  if (pct >= 70)
    return {
      label: "Average",
      labelColor: "text-yellow-600 dark:text-yellow-500"
    };
  if (pct >= 60)
    return {
      label: "Below Average",
      labelColor: "text-orange-600 dark:text-orange-400"
    };
  return {
    label: "Needs Improvement",
    labelColor: "text-destructive"
  };
}
function getGradeColor(letter) {
  const map = {
    A: "text-emerald-600 dark:text-emerald-400",
    B: "text-blue-600 dark:text-blue-400",
    C: "text-yellow-600 dark:text-yellow-500",
    D: "text-orange-600 dark:text-orange-400",
    F: "text-destructive"
  };
  return map[letter] ?? "text-foreground";
}
function calculateResult(score, total) {
  const s = Number.parseFloat(score);
  const t = Number.parseFloat(total);
  if (!score || !total || Number.isNaN(s) || Number.isNaN(t) || t <= 0)
    return null;
  const pct = Math.min(s / t * 100, 100);
  const letter = getLetterGrade(pct);
  const { label, labelColor } = getPerformanceLabel(pct);
  return {
    percentage: pct,
    letter,
    passFail: pct >= 50 ? "pass" : "fail",
    label,
    labelColor,
    gradeColor: getGradeColor(letter)
  };
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col items-center justify-center h-full py-12 gap-4 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "Enter your score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Fill in the Score and Total fields to see your results instantly" })
        ] })
      ]
    }
  );
}
function ResultsCard({ result }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleShare = reactExports.useCallback(() => {
    const text = `I scored ${result.percentage.toFixed(1)}% on StudentHub - Smart Tools for Smart Students`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      ue.success("Copied to clipboard!", { duration: 3e3 });
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      ue.error("Could not copy to clipboard");
    });
  }, [result.percentage]);
  const passFailColor = result.passFail === "pass" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800" : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96, y: 8 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.96, y: 8 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      className: "flex flex-col gap-5",
      "data-ocid": "results-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-subtle p-6 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Your Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-display text-7xl font-bold tabular-nums leading-none ${result.gradeColor}`,
                children: result.percentage.toFixed(1)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-semibold text-muted-foreground mb-2", children: "%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-semibold mt-1 ${result.labelColor}`, children: result.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-1 shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-muted-foreground mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Letter Grade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-4xl font-bold ${result.gradeColor}`, children: result.letter })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-4 flex flex-col items-center gap-1 ${passFailColor}`,
              children: [
                result.passFail === "pass" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold capitalize", children: result.passFail }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70", children: result.passFail === "pass" ? "≥ 50%" : "< 50%" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
              " Performance"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
              result.percentage.toFixed(1),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${result.percentage}%` },
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
              className: "h-full rounded-full gradient-primary"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "50 (Pass)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleShare,
            className: "w-full gap-2 transition-smooth",
            "data-ocid": "share-btn",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-emerald-500" }),
              " Copied!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
              " Share my score"
            ] })
          }
        )
      ]
    },
    "results"
  );
}
function PercentageCalculatorPage() {
  const [score, setScore] = reactExports.useState("");
  const [total, setTotal] = reactExports.useState("");
  const [basePercent, setBasePercent] = reactExports.useState("");
  const effectiveScore = basePercent && score && total ? (Number.parseFloat(score) / Number.parseFloat(total) * Number.parseFloat(basePercent)).toString() : score;
  const effectiveTotal = basePercent && total ? basePercent : total;
  const result = calculateResult(effectiveScore, effectiveTotal);
  const handleReset = () => {
    setScore("");
    setTotal("");
    setBasePercent("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Percentage Calculator - StudentHub" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 md:px-8 py-8 max-w-5xl w-full mx-auto gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Percentage Calculator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Instant score analysis with grade and pass/fail indicator" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "rounded-2xl border border-border bg-card shadow-subtle p-6 flex flex-col gap-5",
            "data-ocid": "input-panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Enter Your Scores" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Results update instantly as you type" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "score", className: "text-sm font-medium", children: "Score Obtained" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "score",
                      type: "number",
                      placeholder: "e.g. 87",
                      value: score,
                      min: "0",
                      onChange: (e) => setScore(e.target.value),
                      className: "transition-smooth focus:ring-2 focus:ring-primary/30",
                      "data-ocid": "score-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "total", className: "text-sm font-medium", children: "Total / Maximum Marks" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "total",
                      type: "number",
                      placeholder: "e.g. 100",
                      value: total,
                      min: "1",
                      onChange: (e) => setTotal(e.target.value),
                      className: "transition-smooth focus:ring-2 focus:ring-primary/30",
                      "data-ocid": "total-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "base-percent",
                      className: "text-sm font-medium flex items-center gap-2",
                      children: [
                        "Base Percentage",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-normal", children: "Optional" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "base-percent",
                      type: "number",
                      placeholder: "e.g. 50 for weighted score",
                      value: basePercent,
                      min: "1",
                      max: "100",
                      onChange: (e) => setBasePercent(e.target.value),
                      className: "transition-smooth focus:ring-2 focus:ring-primary/30",
                      "data-ocid": "base-percent-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used to calculate weighted score (e.g. 50% of the total marks)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/50 border border-border p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Grade Scale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1 text-center", children: [
                  {
                    grade: "A",
                    range: "90–100",
                    color: "text-emerald-600 dark:text-emerald-400"
                  },
                  {
                    grade: "B",
                    range: "80–89",
                    color: "text-blue-600 dark:text-blue-400"
                  },
                  {
                    grade: "C",
                    range: "70–79",
                    color: "text-yellow-600 dark:text-yellow-500"
                  },
                  {
                    grade: "D",
                    range: "60–69",
                    color: "text-orange-600 dark:text-orange-400"
                  },
                  { grade: "F", range: "<60", color: "text-destructive" }
                ].map(({ grade, range, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-lg font-bold ${color}`, children: grade }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: range })
                ] }, grade)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleReset,
                  className: "w-fit gap-2 transition-smooth",
                  "data-ocid": "clear-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                    " Clear All"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 12 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.4, delay: 0.15 },
            className: "flex flex-col gap-4",
            "data-ocid": "results-panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsCard, { result }, "results") : /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "rounded-2xl border border-border bg-card shadow-subtle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {})
              },
              "empty"
            ) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" }) })
    ] })
  ] });
}
export {
  PercentageCalculatorPage
};
