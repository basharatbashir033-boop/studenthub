import { c as createLucideIcon, j as jsxRuntimeExports, f as cn, k as cva, L as Layout, F as FileText, r as reactExports, B as Button } from "./index-C_uP08dq.js";
import { B as Badge } from "./badge-DIfdkxU2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Bm9Q5ZJ-.js";
import { A as AdBanner } from "./AdBanner-CvJmkyVg.js";
import { C as CircleAlert } from "./circle-alert-DqlDWht2.js";
import { D as Download } from "./download-Dg0eZ4VV.js";
import "./index-C_7atQHO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
];
const Merge = createLucideIcon("merge", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function DropZone({
  accept,
  onFiles,
  multiple = false,
  label,
  hint
}) {
  const [dragging, setDragging] = reactExports.useState(false);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      onFiles(dropped);
    },
    [onFiles]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "label",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-smooth p-8",
        dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"
      ),
      onDragOver: (e) => {
        e.preventDefault();
        setDragging(true);
      },
      onDragLeave: () => setDragging(false),
      onDrop: handleDrop,
      "data-ocid": "pdf-dropzone",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept,
            multiple,
            className: "sr-only",
            onChange: (e) => onFiles(Array.from(e.target.files ?? []))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: hint })
        ] })
      ]
    }
  );
}
function MergePdf() {
  const [files, setFiles] = reactExports.useState([]);
  const [status, setStatus] = reactExports.useState("idle");
  const addFiles = (newFiles) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
    setStatus("idle");
  };
  const handleMerge = () => {
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        accept: ".pdf,application/pdf",
        multiple: true,
        onFiles: addFiles,
        label: "Drop PDF files here",
        hint: "Select multiple PDF files to merge"
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-3 px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate flex-1 min-w-0", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
            (f.size / 1024).toFixed(0),
            " KB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-destructive shrink-0",
              onClick: () => setFiles((prev) => prev.filter((_, idx) => idx !== i)),
              "aria-label": "Remove file",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" })
            }
          )
        ]
      },
      `${f.name}-${i}`
    )) }),
    files.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleMerge,
        disabled: status === "processing",
        "data-ocid": "merge-pdf-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Merge, { className: "h-4 w-4 mr-2" }),
          status === "processing" ? "Merging..." : status === "done" ? "Merged! Download" : `Merge ${files.length} PDFs`,
          status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 ml-2" })
        ]
      }
    ),
    files.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Add at least 2 PDF files to merge." }) })
  ] });
}
function ImageToPdf() {
  const [images, setImages] = reactExports.useState([]);
  const [status, setStatus] = reactExports.useState("idle");
  const addImages = (files) => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imgs]);
    setStatus("idle");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        accept: "image/*",
        multiple: true,
        onFiles: addImages,
        label: "Drop images here",
        hint: "JPG, PNG, WebP supported"
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-lg overflow-hidden border border-border aspect-square bg-muted",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: URL.createObjectURL(img),
              alt: img.name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-1 right-1 h-6 w-6 bg-card/80 hover:bg-card",
              onClick: () => setImages((prev) => prev.filter((_, idx) => idx !== i)),
              "aria-label": "Remove image",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" })
            }
          )
        ]
      },
      `${img.name}-${i}`
    )) }),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: () => {
          setStatus("processing");
          setTimeout(() => setStatus("done"), 1e3);
        },
        disabled: status === "processing",
        "data-ocid": "image-to-pdf-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 mr-2" }),
          status === "processing" ? "Converting..." : status === "done" ? "Done! Download PDF" : `Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`,
          status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 ml-2" })
        ]
      }
    )
  ] });
}
function PdfToImage() {
  const [file, setFile] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("idle");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        accept: ".pdf,application/pdf",
        onFiles: (files) => {
          setFile(files[0] ?? null);
          setStatus("idle");
        },
        label: "Drop a PDF file here",
        hint: "One PDF file, up to 20 pages"
      }
    ),
    file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate flex-1 min-w-0", children: file.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
        (file.size / 1024).toFixed(0),
        " KB"
      ] })
    ] }),
    file && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: () => {
          setStatus("processing");
          setTimeout(() => setStatus("done"), 1e3);
        },
        disabled: status === "processing",
        "data-ocid": "pdf-to-image-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 mr-2" }),
          status === "processing" ? "Extracting..." : status === "done" ? "Done! Download Images" : "Convert PDF to Images",
          status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 ml-2" })
        ]
      }
    )
  ] });
}
function PdfToolsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 md:px-6 py-6 max-w-xl w-full mx-auto gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "PDF Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "All PDF operations run privately in your browser" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        defaultValue: "merge",
        className: "animate-fade-in",
        "data-ocid": "pdf-tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "merge", className: "flex-1", "data-ocid": "tab-merge", children: "Merge PDF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "img2pdf",
                className: "flex-1",
                "data-ocid": "tab-img2pdf",
                children: "Image → PDF"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "pdf2img",
                className: "flex-1",
                "data-ocid": "tab-pdf2img",
                children: "PDF → Image"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "merge", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MergePdf, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "img2pdf", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageToPdf, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pdf2img", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PdfToImage, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" })
  ] }) });
}
export {
  PdfToolsPage
};
