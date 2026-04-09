import { j as jsxRuntimeExports, f as cn, d as useNavigate, r as reactExports, L as Layout, B as Button, ax as ArrowLeft, F as FileText, A as Separator } from "./index-BL4wgIk0.js";
import { B as Badge } from "./badge-DS1plcQ1.js";
import { L as Label, I as Input, C as Check } from "./label-CcqyzKo-.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C3rfLliy.js";
import { D as Download } from "./download-9-UmVgZM.js";
import { R as RotateCcw } from "./rotate-ccw-wWLJ9Cel.js";
import "./index-C6lAMTLg.js";
import "./index-Cb6DP3ti.js";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const FONT_SIZES = [
  { value: "10", label: "Small (10pt)" },
  { value: "12", label: "Normal (12pt)" },
  { value: "14", label: "Medium (14pt)" },
  { value: "16", label: "Large (16pt)" },
  { value: "18", label: "X-Large (18pt)" }
];
const PAGE_SIZES = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter (US)" },
  { value: "legal", label: "Legal" }
];
function printAsPdf(title, content, fontSize, pageSize) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download the PDF.");
    return;
  }
  const pageSizeCss = pageSize === "letter" ? "8.5in 11in" : pageSize === "legal" ? "8.5in 14in" : "210mm 297mm";
  const escaped = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").split("\n").map((line) => `<p>${line || "&nbsp;"}</p>`).join("");
  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title || "Document"}</title>
  <style>
    @page { size: ${pageSizeCss}; margin: 2cm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: ${fontSize}pt;
      line-height: 1.7;
      color: #111;
      background: #fff;
    }
    h1 {
      font-size: ${Math.round(Number(fontSize) * 1.6)}pt;
      font-weight: 700;
      margin-bottom: 0.5cm;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.3cm;
    }
    p { margin-bottom: 0.3em; }
  </style>
</head>
<body>
  ${title ? `<h1>${title}</h1>` : ""}
  ${escaped}
</body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 400);
}
function CountPills({ text }) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs font-mono", children: [
      words.toLocaleString(),
      " word",
      words !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs font-mono", children: [
      chars.toLocaleString(),
      " char",
      chars !== 1 ? "s" : ""
    ] })
  ] });
}
function TextToPdfPage() {
  const navigate = useNavigate();
  const [title, setTitle] = reactExports.useState("");
  const [text, setText] = reactExports.useState("");
  const [fontSize, setFontSize] = reactExports.useState("12");
  const [pageSize, setPageSize] = reactExports.useState("a4");
  const [converted, setConverted] = reactExports.useState(false);
  const textareaRef = reactExports.useRef(null);
  const handleConvert = () => {
    var _a;
    if (!text.trim()) {
      (_a = textareaRef.current) == null ? void 0 : _a.focus();
      return;
    }
    printAsPdf(title, text, fontSize, pageSize);
    setConverted(true);
    setTimeout(() => setConverted(false), 3e3);
  };
  const handleReset = () => {
    setTitle("");
    setText("");
    setFontSize("12");
    setPageSize("a4");
    setConverted(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 md:px-6 py-6 max-w-3xl w-full mx-auto gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 shrink-0",
          onClick: () => navigate({ to: "/" }),
          "aria-label": "Back to dashboard",
          "data-ocid": "text-to-pdf-back-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground tracking-tight leading-tight", children: "Text to PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: "Type or paste text — export as a clean PDF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto shrink-0 text-xs", children: "Free" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "rounded-xl border border-border bg-card p-4 flex flex-wrap gap-4 items-end",
          "animate-fade-in"
        ),
        style: { animationDelay: "60ms", animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1 min-w-[140px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "doc-title", className: "text-xs font-medium", children: [
              "Document Title",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "doc-title",
                placeholder: "e.g. My Essay",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                className: "h-9 text-sm",
                "data-ocid": "text-to-pdf-title-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 min-w-[140px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Font Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fontSize, onValueChange: setFontSize, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-9 text-sm",
                  "data-ocid": "text-to-pdf-fontsize-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FONT_SIZES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.value, children: f.label }, f.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 min-w-[120px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Page Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: pageSize, onValueChange: setPageSize, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-9 text-sm",
                  "data-ocid": "text-to-pdf-pagesize-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAGE_SIZES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value)) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col gap-2 animate-fade-in",
        style: { animationDelay: "120ms", animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doc-content", className: "text-sm font-medium", children: "Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CountPills, { text })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "doc-content",
              ref: textareaRef,
              placeholder: "Type or paste your text here…\n\nEach line will appear as a paragraph in the PDF.",
              value: text,
              onChange: (e) => setText(e.target.value),
              className: "min-h-[320px] resize-y font-mono text-sm leading-relaxed",
              "data-ocid": "text-to-pdf-content-textarea"
            }
          ),
          !text.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Start typing above, then click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Convert & Download" }),
            "."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-3 animate-fade-in",
        style: { animationDelay: "180ms", animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleConvert,
              disabled: !text.trim(),
              className: "gap-2 transition-smooth",
              "data-ocid": "text-to-pdf-convert-btn",
              children: converted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                "Done!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                "Convert & Download PDF"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "gap-2 text-muted-foreground hover:text-foreground transition-smooth",
              onClick: handleReset,
              "data-ocid": "text-to-pdf-reset-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
                "Reset"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl bg-muted/40 border border-border px-5 py-4 animate-fade-in",
        style: { animationDelay: "240ms", animationFillMode: "both" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-muted-foreground space-y-1 list-decimal list-inside", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Type or paste your text in the content box above." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Optionally set a title, font size, and page format." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Click",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Convert & Download PDF" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "Your browser's print dialog will open — choose",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Save as PDF" }),
              "."
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  TextToPdfPage
};
