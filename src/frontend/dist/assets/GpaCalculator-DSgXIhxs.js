import { c as createLucideIcon, r as reactExports, i as ue, j as jsxRuntimeExports, L as Layout, G as GraduationCap, B as Button } from "./index-BL4wgIk0.js";
import { B as Badge } from "./badge-DS1plcQ1.js";
import { L as Label, I as Input } from "./label-CcqyzKo-.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C3rfLliy.js";
import { A as AdBanner } from "./AdBanner-Blv9Ls39.js";
import { m as motion, A as AnimatePresence, S as Share2 } from "./proxy-DO0b_Z1F.js";
import { R as RotateCcw } from "./rotate-ccw-wWLJ9Cel.js";
import { T as Trash2 } from "./trash-2-CI5-4wxR.js";
import "./index-C6lAMTLg.js";
import "./index-Cb6DP3ti.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
const GRADE_OPTIONS = [
  { label: "A+", value: "A+", points: 4 },
  { label: "A", value: "A", points: 4 },
  { label: "A-", value: "A-", points: 3.7 },
  { label: "B+", value: "B+", points: 3.3 },
  { label: "B", value: "B", points: 3 },
  { label: "B-", value: "B-", points: 2.7 },
  { label: "C+", value: "C+", points: 2.3 },
  { label: "C", value: "C", points: 2 },
  { label: "C-", value: "C-", points: 1.7 },
  { label: "D", value: "D", points: 1 },
  { label: "F", value: "F", points: 0 }
];
const GRADE_MAP = Object.fromEntries(
  GRADE_OPTIONS.map((g) => [g.value, g.points])
);
function createRow() {
  return {
    id: `row-${Date.now()}-${Math.random()}`,
    name: "",
    grade: "A",
    credits: "3"
  };
}
const INITIAL_ROWS = [
  { id: "row-init-1", name: "", grade: "A", credits: "3" }
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
  return totalCredits > 0 ? { gpa: totalPoints / totalCredits, totalCredits } : null;
}
function GpaCalculatorPage() {
  const headingId = reactExports.useId();
  const [rows, setRows] = reactExports.useState(INITIAL_ROWS);
  const result = calcGpa(rows);
  const gpaDisplay = result ? result.gpa.toFixed(2) : null;
  const status = result ? getGpaStatus(result.gpa) : null;
  const validCount = rows.filter((r) => Number(r.credits) > 0).length;
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
      { id: `row-reset-${Date.now()}`, name: "", grade: "A", credits: "3" }
    ]),
    []
  );
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Enter your subjects, grades and credit hours for an instant weighted GPA." })
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1fr_130px_96px_36px] items-center gap-3 border-b border-border bg-muted/20 px-5 py-2 md:grid", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Subject Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Grade" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: rows.filter((r) => Number(r.credits) > 0).map((row, idx) => {
                const pts = GRADE_MAP[row.grade] ?? 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate text-sm text-foreground", children: row.name || `Subject ${idx + 1}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-3 flex shrink-0 items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: row.grade }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
                          pts.toFixed(1),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: share,
                className: "w-full gap-2",
                "data-ocid": "gpa-share",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
                  "Share My GPA"
                ]
              }
            ) })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter at least one subject with credit hours to see your GPA." })
          ]
        },
        "empty"
      ) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GradeSelect,
          {
            value: row.grade,
            onChange: (v) => onUpdate(row.id, "grade", v),
            label: `Subject ${num} grade`,
            ocid: `gpa-grade-${index}`,
            className: "flex-1"
          }
        ),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1fr_130px_96px_36px] items-center gap-3 md:grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GradeSelect,
        {
          value: row.grade,
          onChange: (v) => onUpdate(row.id, "grade", v),
          label: `Subject ${num} grade`,
          ocid: `gpa-grade-md-${index}`
        }
      ),
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
          className: "h-9 text-sm",
          "aria-label": `Subject ${num} credit hours`,
          "data-ocid": `gpa-credits-md-${index}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RemoveButton,
        {
          canRemove,
          onClick: () => onRemove(row.id),
          label: `Remove subject ${num}`,
          ocid: `gpa-remove-md-${index}`
        }
      )
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
function GradeSelect({
  value,
  onChange,
  label,
  ocid,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value, onValueChange: onChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectTrigger,
      {
        className: `h-9 text-sm ${className ?? ""}`,
        "aria-label": label,
        "data-ocid": ocid,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GRADE_OPTIONS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: g.value, children: [
      g.label,
      " — ",
      g.points.toFixed(1)
    ] }, g.value)) })
  ] });
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
      "Free online GPA calculator for students. Enter subjects, grades and credit hours for an instant weighted GPA result."
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
