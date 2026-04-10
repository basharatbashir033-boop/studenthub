import { c as createLucideIcon, r as reactExports, m as useAuth, e as useActor, u as useQueryClient, o as ue, j as jsxRuntimeExports, L as Layout, G as GraduationCap, B as Button, f as useQuery, i as Skeleton, l as createActor } from "./index-WBE00zzH.js";
import { B as Badge } from "./badge-B2Vgaj08.js";
import { L as Label, I as Input } from "./label-DH1ItHDA.js";
import { A as AdBanner } from "./AdBanner-CUcp2j6N.js";
import { m as motion } from "./proxy-Dq17r1zB.js";
import { R as RotateCcw } from "./rotate-ccw-DNWHiEPF.js";
import { A as AnimatePresence, S as Share2 } from "./index-dC4oHQAl.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-UwKmOL6v.js";
import { T as Trash2 } from "./trash-2-CAjOGK8M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function marksToGrade(marks) {
  if (marks >= 90) return { letter: "A+", points: 4 };
  if (marks >= 85) return { letter: "A", points: 4 };
  if (marks >= 80) return { letter: "A-", points: 3.7 };
  if (marks >= 75) return { letter: "B+", points: 3.3 };
  if (marks >= 71) return { letter: "B", points: 3 };
  if (marks >= 66) return { letter: "B-", points: 2.7 };
  if (marks >= 61) return { letter: "C+", points: 2.3 };
  if (marks >= 56) return { letter: "C", points: 2 };
  if (marks >= 50) return { letter: "C-", points: 1.7 };
  if (marks >= 45) return { letter: "D+", points: 1.3 };
  if (marks >= 40) return { letter: "D", points: 1 };
  return { letter: "F", points: 0 };
}
function createRow() {
  return {
    id: `row-${Date.now()}-${Math.random()}`,
    name: "",
    marks: "",
    credits: "3"
  };
}
const INITIAL_ROWS = [
  { id: "row-init-1", name: "", marks: "", credits: "3" }
];
function getGpaStatus(gpa) {
  if (gpa >= 4)
    return {
      label: "Summa Cum Laude",
      colorClass: "text-emerald-600 dark:text-emerald-400"
    };
  if (gpa >= 3.7)
    return { label: "Magna Cum Laude", colorClass: "text-primary" };
  if (gpa >= 3.5) return { label: "Cum Laude", colorClass: "text-primary" };
  if (gpa >= 3) return { label: "Good Standing", colorClass: "text-primary" };
  if (gpa >= 2)
    return {
      label: "Satisfactory",
      colorClass: "text-amber-600 dark:text-amber-400"
    };
  return { label: "At Risk", colorClass: "text-destructive" };
}
function calcGpa(rows) {
  const valid = rows.filter(
    (r) => r.credits !== "" && Number(r.credits) > 0 && r.marks !== ""
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
  return totalCredits > 0 ? { gpa: totalPoints / totalCredits, totalCredits } : null;
}
function formatTimestamp(ts) {
  try {
    const ms = Number(ts / BigInt(1e6));
    return new Date(ms).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "Unknown date";
  }
}
function HistorySection({ userId, onLoad }) {
  const { actor, isFetching } = useActor(createActor);
  const [showAll, setShowAll] = reactExports.useState(false);
  const {
    data: history,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["gpaHistory", userId],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getUserGpaHistory(userId);
      return [...results].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 1e3 * 30
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", "aria-label": "GPA History loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Previous Calculations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, n)) })
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", "aria-label": "GPA History error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Previous Calculations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/20 px-5 py-6 text-center text-sm text-muted-foreground", children: "Unable to load history. Please try again later." })
    ] });
  }
  const allCalcs = history ?? [];
  const PREVIEW_COUNT = 5;
  const visibleCalcs = showAll ? allCalcs : allCalcs.slice(0, PREVIEW_COUNT);
  const hasMore = allCalcs.length > PREVIEW_COUNT;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.38, delay: 0.1 },
      className: "mt-8",
      "aria-label": "Previous GPA Calculations",
      "data-ocid": "gpa-history-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Previous Calculations" }),
          allCalcs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground", children: allCalcs.length })
        ] }),
        allCalcs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-dashed border-border bg-muted/20 px-5 py-8 text-center",
            "data-ocid": "gpa-history-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mx-auto mb-2 h-6 w-6 text-muted-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No history yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Calculate your GPA and save it — your history will appear here." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: visibleCalcs.map((calc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            HistoryCard,
            {
              calc,
              onLoad,
              index: idx
            },
            calc.id.toString()
          )) }) }),
          hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "mt-3 w-full gap-1.5 text-xs text-muted-foreground hover:text-foreground",
              onClick: () => setShowAll((v) => !v),
              "data-ocid": "gpa-history-toggle",
              children: showAll ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }),
                "Show less"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }),
                "Show all ",
                allCalcs.length,
                " calculations"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function HistoryCard({ calc, onLoad, index }) {
  const status = getGpaStatus(calc.calculatedGpa);
  const subjectCount = calc.subjects.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.25, delay: index * 0.05 },
      className: "flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 transition-colors",
      "data-ocid": `gpa-history-card-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xl font-bold font-display tabular-nums ${status.colorClass}`,
                children: calc.calculatedGpa.toFixed(2)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: status.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(calc.totalCredits),
              " credits"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              subjectCount,
              " subject",
              subjectCount !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimestamp(calc.timestamp) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "shrink-0 gap-1.5 text-xs",
            onClick: () => onLoad(calc),
            "data-ocid": `gpa-history-load-${index}`,
            children: "Load"
          }
        )
      ]
    }
  );
}
function GpaCalculatorPage() {
  const headingId = reactExports.useId();
  const [rows, setRows] = reactExports.useState(INITIAL_ROWS);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const { user, isAuthenticated } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const result = calcGpa(rows);
  const gpaDisplay = result ? result.gpa.toFixed(2) : null;
  const status = result ? getGpaStatus(result.gpa) : null;
  const validCount = rows.filter(
    (r) => Number(r.credits) > 0 && r.marks !== ""
  ).length;
  const addRow = reactExports.useCallback(
    () => setRows((prev) => [...prev, createRow()]),
    []
  );
  const removeRow = reactExports.useCallback(
    (id) => setRows(
      (prev) => prev.length > 1 ? prev.filter((r) => r.id !== id) : prev
    ),
    []
  );
  const updateRow = reactExports.useCallback(
    (id, key, value) => setRows(
      (prev) => prev.map((r) => r.id === id ? { ...r, [key]: value } : r)
    ),
    []
  );
  const reset = reactExports.useCallback(
    () => setRows([
      { id: `row-reset-${Date.now()}`, name: "", marks: "", credits: "3" }
    ]),
    []
  );
  const loadHistory = reactExports.useCallback((calc) => {
    const loaded = calc.subjects.map((s, i) => ({
      id: `row-loaded-${i}-${Date.now()}`,
      name: s.subjectName,
      marks: String(Number(s.marks)),
      credits: String(Number(s.credits))
    }));
    setRows(loaded.length > 0 ? loaded : INITIAL_ROWS);
    ue.success("Calculation loaded!", {
      description: `GPA ${calc.calculatedGpa.toFixed(2)} · ${calc.subjects.length} subjects`,
      duration: 3500
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const saveCalculation = reactExports.useCallback(async () => {
    if (!result || !user || !actor || isFetching) return;
    const validRows = rows.filter(
      (r) => Number(r.credits) > 0 && r.marks !== ""
    );
    const subjects = validRows.map((r) => ({
      subjectName: r.name || "Subject",
      marks: BigInt(Math.round(Number(r.marks))),
      credits: BigInt(Math.round(Number(r.credits)))
    }));
    setIsSaving(true);
    try {
      await actor.saveGpaCalculation(
        user.id,
        subjects,
        result.gpa,
        BigInt(result.totalCredits)
      );
      await queryClient.invalidateQueries({
        queryKey: ["gpaHistory", user.id]
      });
      ue.success("GPA saved!", {
        description: `GPA ${result.gpa.toFixed(2)} has been added to your history.`,
        duration: 4e3
      });
    } catch (e) {
      console.error("Save GPA error:", e);
      ue.error("Could not save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [result, rows, user, actor, isFetching, queryClient]);
  const share = reactExports.useCallback(async () => {
    if (!gpaDisplay) return;
    const text = `My GPA is ${gpaDisplay} on StudentHub - Smart Tools for Smart Students`;
    try {
      await navigator.clipboard.writeText(text);
      ue.success("Copied to clipboard!", {
        description: text,
        duration: 4500
      });
    } catch {
      ue.error("Could not copy. Please copy manually.");
    }
  }, [gpaDisplay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageMeta, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-2xl px-4 py-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          className: "mb-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-7 w-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl", children: "GPA Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Enter your marks (0–100) for each subject and credit hours for an instant weighted GPA." }),
            isAuthenticated && user && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground/70", children: [
              "Signed in as ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: user.email }),
              " — results will be saved to your account."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08, ease: "easeOut" },
          className: "rounded-2xl border border-border bg-card shadow-subtle",
          "aria-labelledby": headingId,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: headingId,
                    className: "text-sm font-semibold text-foreground",
                    children: "Your Subjects"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground", children: rows.length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: reset,
                  className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
                  "data-ocid": "gpa-reset",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
                    "Reset"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1fr_150px_96px_36px] items-center gap-3 border-b border-border bg-muted/20 px-5 py-2 md:grid", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Subject Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Marks (0–100)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Credits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: rows.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.2, ease: "easeInOut" },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SubjectRowInput,
                  {
                    row,
                    index: idx,
                    onUpdate: updateRow,
                    onRemove: removeRow,
                    canRemove: rows.length > 1
                  }
                )
              },
              row.id
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addRow,
                className: "w-full gap-2 border-dashed",
                "data-ocid": "gpa-add-subject",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
                  "Add Subject"
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards", className: "my-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result && gpaDisplay && status ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 10, scale: 0.97 },
          transition: { duration: 0.38, ease: "easeOut" },
          className: "rounded-2xl border border-border bg-card shadow-subtle overflow-hidden",
          "aria-label": "GPA Results",
          "data-ocid": "gpa-results",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-primary px-6 py-10 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-sm font-medium text-primary-foreground/80", children: "Your Overall GPA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display text-6xl font-bold tracking-tight text-primary-foreground",
                  "data-ocid": "gpa-score",
                  children: gpaDisplay
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-primary-foreground/70", children: "out of 4.00" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "mt-4 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30",
                  "data-ocid": "gpa-status-badge",
                  children: status.label
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 divide-x divide-border border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: result.totalCredits }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Credits" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: validCount }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Subjects" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Grade Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rows.filter((r) => Number(r.credits) > 0 && r.marks !== "").map((row, idx) => {
                const m = Number(row.marks);
                const { letter, points } = marksToGrade(
                  Number.isNaN(m) ? 0 : Math.min(100, Math.max(0, m))
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate text-sm text-foreground", children: row.name || `Subject ${idx + 1}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-3 flex shrink-0 items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
                          row.marks,
                          " marks"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: letter }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
                          points.toFixed(1),
                          " pts × ",
                          row.credits,
                          " cr"
                        ] })
                      ] })
                    ]
                  },
                  row.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-5 py-4 flex gap-3", children: [
              isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: saveCalculation,
                  disabled: isSaving || isFetching,
                  className: "flex-1 gap-2",
                  "data-ocid": "gpa-save",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                    isSaving ? "Saving…" : "Save to History"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1 gap-2 text-muted-foreground",
                  disabled: true,
                  "data-ocid": "gpa-save-disabled",
                  title: "Log in to save your GPA history",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                    "Log in to save"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: share,
                  className: "gap-2",
                  "data-ocid": "gpa-share",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
                    "Share"
                  ]
                }
              )
            ] })
          ]
        },
        "results"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center",
          "data-ocid": "gpa-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "mx-auto mb-3 h-8 w-8 text-muted-foreground/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter marks and credit hours for at least one subject to see your GPA." })
          ]
        },
        "empty"
      ) }),
      isAuthenticated && user && /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySection, { userId: user.id, onLoad: loadHistory }),
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.2 },
          className: "mt-8 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-6 text-center",
          "data-ocid": "gpa-login-prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mx-auto mb-2 h-6 w-6 text-muted-foreground/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Save your GPA history" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Log in to save calculations and see your GPA over time." })
          ]
        }
      )
    ] })
  ] });
}
function SubjectRowInput({
  row,
  index,
  onUpdate,
  onRemove,
  canRemove
}) {
  const num = index + 1;
  const marksNum = Number(row.marks);
  const marksValid = row.marks !== "" && !Number.isNaN(marksNum) && marksNum >= 0 && marksNum <= 100;
  const marksError = row.marks !== "" && !Number.isNaN(marksNum) && (marksNum < 0 || marksNum > 100);
  const gradePreview = marksValid ? marksToGrade(marksNum) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndexBadge, { num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: `Subject ${num}`,
            value: row.name,
            onChange: (e) => onUpdate(row.id, "name", e.target.value),
            className: "h-9 flex-1 text-sm",
            "aria-label": `Subject ${num} name`,
            "data-ocid": `gpa-name-${index}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RemoveButton,
          {
            canRemove,
            onClick: () => onRemove(row.id),
            label: `Remove subject ${num}`,
            ocid: `gpa-remove-${index}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pl-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "100",
              step: "1",
              placeholder: "Enter marks",
              value: row.marks,
              onChange: (e) => onUpdate(row.id, "marks", e.target.value),
              className: `h-9 text-sm ${marksError ? "border-destructive focus-visible:ring-destructive" : ""}`,
              "aria-label": `Subject ${num} marks`,
              "data-ocid": `gpa-marks-${index}`
            }
          ),
          marksError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Must be 0–100" }),
          gradePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
            gradePreview.letter,
            " (",
            gradePreview.points.toFixed(1),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            max: "20",
            step: "0.5",
            placeholder: "Credits",
            value: row.credits,
            onChange: (e) => onUpdate(row.id, "credits", e.target.value),
            className: "h-9 w-24 text-sm",
            "aria-label": `Subject ${num} credit hours`,
            "data-ocid": `gpa-credits-${index}`
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1fr_150px_96px_36px] items-start gap-3 md:grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 pt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndexBadge, { num }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: `Subject ${num}`,
            value: row.name,
            onChange: (e) => onUpdate(row.id, "name", e.target.value),
            className: "h-9 min-w-0 flex-1 text-sm",
            "aria-label": `Subject ${num} name`,
            "data-ocid": `gpa-name-md-${index}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            max: "100",
            step: "1",
            placeholder: "Enter marks",
            value: row.marks,
            onChange: (e) => onUpdate(row.id, "marks", e.target.value),
            className: `h-9 text-sm ${marksError ? "border-destructive focus-visible:ring-destructive" : ""}`,
            "aria-label": `Subject ${num} marks`,
            "data-ocid": `gpa-marks-md-${index}`
          }
        ),
        marksError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Must be 0–100" }),
        gradePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
          gradePreview.letter,
          " (",
          gradePreview.points.toFixed(1),
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: "0",
          max: "20",
          step: "0.5",
          placeholder: "3",
          value: row.credits,
          onChange: (e) => onUpdate(row.id, "credits", e.target.value),
          className: "h-9 text-sm mt-0.5",
          "aria-label": `Subject ${num} credit hours`,
          "data-ocid": `gpa-credits-md-${index}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RemoveButton,
        {
          canRemove,
          onClick: () => onRemove(row.id),
          label: `Remove subject ${num}`,
          ocid: `gpa-remove-md-${index}`
        }
      ) })
    ] })
  ] });
}
function IndexBadge({ num }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary", children: num });
}
function RemoveButton({
  canRemove,
  onClick,
  label,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick,
      disabled: !canRemove,
      className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive disabled:opacity-25",
      "aria-label": label,
      "data-ocid": ocid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
    }
  );
}
function PageMeta() {
  if (typeof document !== "undefined") {
    document.title = "GPA Calculator — StudentHub | Smart Tools for Smart Students";
    const setMeta = (selector, attr, val) => {
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
      "Free online GPA calculator. Enter your marks (0-100) for each subject and credit hours for an instant weighted GPA result."
    );
    setMeta(
      'meta[property="og:title"]',
      "content",
      "GPA Calculator — StudentHub | Smart Tools for Smart Students"
    );
  }
  return null;
}
export {
  GpaCalculatorPage
};
