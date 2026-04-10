const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-BIuIw6a8.js","assets/index-WBE00zzH.js","assets/index-BpKDXyjc.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, j as jsxRuntimeExports, k as cn, p as cva, L as Layout, F as FileText, r as reactExports, B as Button, o as ue, _ as __vitePreload } from "./index-WBE00zzH.js";
import { B as Badge } from "./badge-B2Vgaj08.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CD8EQpcr.js";
import { A as AdBanner } from "./AdBanner-CUcp2j6N.js";
import { C as CircleAlert } from "./circle-alert-BHg62t7y.js";
import { L as LoaderCircle } from "./loader-circle-BEDETFVh.js";
import { D as Download } from "./download-D-cUKsB4.js";
import "./index-B0lvci5F.js";
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
const Image$1 = createLucideIcon("image", __iconNode$2);
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
function ComingSoon({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 py-16 px-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-7 w-7 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
        label,
        " — Coming Soon"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This feature is under development. Check back soon!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Coming Soon" })
  ] });
}
function MergePdf() {
  const [files, setFiles] = reactExports.useState([]);
  const addFiles = (newFiles) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
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
    files.length >= 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, "data-ocid": "merge-pdf-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Merge, { className: "h-4 w-4 mr-2" }),
        "Merge ",
        files.length,
        " PDFs"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-xs", children: "PDF merging is coming soon. Stay tuned!" }) })
    ] }) : files.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Add at least 2 PDF files to merge." }) }) : null
  ] });
}
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}
function getImageFormat(file) {
  if (file.type === "image/jpeg" || file.type === "image/jpg") return "JPEG";
  if (file.type === "image/png") return "PNG";
  return null;
}
function getImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Failed to load image dimensions"));
    img.src = dataUrl;
  });
}
function ImageToPdf() {
  const [images, setImages] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState([]);
  const [status, setStatus] = reactExports.useState("idle");
  const objectUrlsRef = reactExports.useRef([]);
  const addImages = reactExports.useCallback((files) => {
    const supported = files.filter((f) => {
      const fmt = getImageFormat(f);
      if (!fmt) {
        ue.error(`${f.name}: unsupported format. Use JPEG or PNG.`);
        return false;
      }
      return true;
    });
    if (!supported.length) return;
    const newUrls = supported.map((f) => {
      const url = URL.createObjectURL(f);
      objectUrlsRef.current.push(url);
      return url;
    });
    setImages((prev) => [...prev, ...supported]);
    setPreviews((prev) => [...prev, ...newUrls]);
    setStatus("idle");
  }, []);
  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => {
      const removed = prev[idx];
      URL.revokeObjectURL(removed);
      return prev.filter((_, i) => i !== idx);
    });
    setStatus("idle");
  };
  const handleConvert = async () => {
    if (!images.length) return;
    setStatus("processing");
    try {
      const { jsPDF } = await __vitePreload(async () => {
        const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-BIuIw6a8.js").then((n) => n.j);
        return { jsPDF: jsPDF2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      const firstDataUrl = await readFileAsDataUrl(images[0]);
      const firstFmt = getImageFormat(images[0]);
      const firstDims = await getImageDimensions(firstDataUrl);
      const pageW = 210;
      const pageH = 297;
      const doc = new jsPDF({ unit: "mm", format: [pageW, pageH] });
      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage([pageW, pageH]);
        const dataUrl = i === 0 ? firstDataUrl : await readFileAsDataUrl(images[i]);
        const fmt = i === 0 ? firstFmt : getImageFormat(images[i]);
        const dims = i === 0 ? firstDims : await getImageDimensions(dataUrl);
        const margin = 10;
        const maxW = pageW - margin * 2;
        const maxH = pageH - margin * 2;
        const ratio = Math.min(maxW / dims.width, maxH / dims.height);
        const drawW = dims.width * ratio;
        const drawH = dims.height * ratio;
        const x = margin + (maxW - drawW) / 2;
        const y = margin + (maxH - drawH) / 2;
        doc.addImage(dataUrl, fmt, x, y, drawW, drawH);
      }
      const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      doc.save(`image-to-pdf-${dateStr}.pdf`);
      setStatus("done");
      ue.success(
        `${images.length} image${images.length > 1 ? "s" : ""} converted and downloaded!`
      );
    } catch (err) {
      console.error(err);
      setStatus("idle");
      ue.error("Failed to generate PDF. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        accept: "image/jpeg,image/png,image/jpg",
        multiple: true,
        onFiles: addImages,
        label: "Drop images here",
        hint: "JPEG and PNG supported — one page per image"
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", "data-ocid": "image-preview-grid", children: previews.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-lg overflow-hidden border border-border aspect-square bg-muted",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src,
              alt: images[i].name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded bg-card/80 hover:bg-card text-foreground transition-colors",
              onClick: () => removeImage(i),
              "aria-label": `Remove ${images[i].name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" })
            }
          )
        ]
      },
      `${images[i].name}-${i}`
    )) }),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleConvert,
          disabled: status === "processing",
          "data-ocid": "image-to-pdf-btn",
          className: "gap-2",
          children: status === "processing" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Converting…"
          ] }) : status === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "Download Again"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "h-4 w-4" }),
            "Convert ",
            images.length,
            " Image",
            images.length > 1 ? "s" : "",
            " to PDF"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Each image will appear on its own page in the PDF." })
    ] })
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
        defaultValue: "img2pdf",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pdf2img", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoon, { label: "PDF to Image" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" })
  ] }) });
}
export {
  PdfToolsPage
};
