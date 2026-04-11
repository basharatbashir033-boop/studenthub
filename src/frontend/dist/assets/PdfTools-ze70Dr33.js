const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-D4tQQwDi.js","assets/index-C3eHKRiw.js","assets/index-B_A6Ryhc.css","assets/jszip.min-DKefP-WY.js"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, j as jsxRuntimeExports, k as cn, p as cva, L as Layout, F as FileText, r as reactExports, B as Button, o as ue, X, _ as __vitePreload } from "./index-C3eHKRiw.js";
import { B as Badge } from "./badge-58La0kX3.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_T9FSqo.js";
import { A as AdBanner } from "./AdBanner-DhdVJ8Kj.js";
import { C as CircleAlert } from "./circle-alert-CtKBjucS.js";
import { L as LoaderCircle } from "./loader-circle-C_hVNSET.js";
import { D as Download } from "./download-DkPoup0n.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-C302NRrU.js";
import "./index-BDLR6BmA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image$1 = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
];
const Merge = createLucideIcon("merge", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
const PackageOpen = createLucideIcon("package-open", __iconNode$1);
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
function HowItWorks({ heading, steps, note }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden",
      "data-ocid": "how-it-works",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-muted/30 transition-colors",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: heading }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-1 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-col gap-2.5", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary mt-0.5", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: step.text })
              ] }, step.text)) }),
              note && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 italic border-t border-border pt-3", children: [
                "💡 ",
                note
              ] })
            ] })
          }
        )
      ]
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
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-smooth",
        "p-6 md:p-8",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm sm:text-base", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-0.5", children: hint })
        ] })
      ]
    }
  );
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
        className: `flex items-center gap-3 px-3 sm:px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate flex-1 min-w-0", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0 hidden sm:inline", children: [
            (f.size / 1024).toFixed(0),
            " KB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive shrink-0 min-w-[2rem] sm:min-w-[1.5rem]",
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          disabled: true,
          "data-ocid": "merge-pdf-btn",
          className: "w-full min-h-[44px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Merge, { className: "h-4 w-4 mr-2" }),
            "Merge ",
            files.length,
            " PDFs"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-xs", children: "PDF merging is coming soon. Stay tuned!" }) })
    ] }) : files.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-sm", children: "Add at least 2 PDF files to merge." }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HowItWorks,
      {
        heading: "How does Merge PDF work?",
        steps: [
          {
            text: 'Click "Add PDF Files" or drag and drop your PDF files into the upload area.'
          },
          {
            text: "Your selected files will appear in a list — you can remove any file you don't want."
          },
          {
            text: `Once you've added all your files, click "Merge PDFs" to combine them into a single PDF.`
          },
          {
            text: "Your merged PDF will automatically download to your device."
          }
        ],
        note: "You can add as many PDFs as you need. They will be merged in the order they appear in the list."
      }
    )
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
        const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-D4tQQwDi.js").then((n) => n.j);
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
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3",
        "data-ocid": "image-preview-grid",
        children: previews.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  className: "absolute top-1 right-1 h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center rounded bg-card/80 hover:bg-card text-foreground transition-colors touch-manipulation",
                  onClick: () => removeImage(i),
                  "aria-label": `Remove ${images[i].name}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" })
                }
              )
            ]
          },
          `${images[i].name}-${i}`
        ))
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleConvert,
          disabled: status === "processing",
          "data-ocid": "image-to-pdf-btn",
          className: "gap-2 w-full min-h-[44px]",
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
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HowItWorks,
      {
        heading: "How does Image to PDF work?",
        steps: [
          {
            text: 'Click "Add Images" or drag and drop your JPEG or PNG image files into the upload area.'
          },
          {
            text: "Your images will appear as previews in a grid — you can remove any you don't want."
          },
          {
            text: 'Click "Convert to PDF" to combine all your images into a single PDF document.'
          },
          { text: "Your PDF will automatically download to your device." }
        ],
        note: "You can add multiple images and they will all be included in the final PDF, one image per page."
      }
    )
  ] });
}
function PdfToImage() {
  const [pdfFile, setPdfFile] = reactExports.useState(null);
  const [pages, setPages] = reactExports.useState([]);
  const [status, setStatus] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [totalPages, setTotalPages] = reactExports.useState(0);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const canvasRef = reactExports.useRef(null);
  const reset = () => {
    setPdfFile(null);
    setPages([]);
    setStatus("idle");
    setProgress(0);
    setTotalPages(0);
    setErrorMsg("");
  };
  const handleFile = reactExports.useCallback((files) => {
    const file = files[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setErrorMsg("Please upload a valid PDF file.");
      setStatus("error");
      return;
    }
    setErrorMsg("");
    setStatus("idle");
    setPages([]);
    setProgress(0);
    setTotalPages(0);
    setPdfFile(file);
  }, []);
  const handleConvert = async () => {
    if (!pdfFile) return;
    setStatus("processing");
    setPages([]);
    setProgress(0);
    setErrorMsg("");
    try {
      const pdfjsLib = await __vitePreload(() => import("./pdf-tOEo_aYO.js"), true ? [] : void 0);
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const count = pdfDoc.numPages;
      setTotalPages(count);
      const results = [];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");
      for (let i = 1; i <= count; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        const dataUrl = canvas.toDataURL("image/png");
        results.push({ dataUrl, pageNum: i });
        setProgress(i);
        await new Promise((r) => setTimeout(r, 0));
      }
      setPages(results);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to convert PDF. Make sure it's a valid file."
      );
      setStatus("error");
    }
  };
  const downloadPage = (page) => {
    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = `page-${page.pageNum}.png`;
    a.click();
  };
  const downloadAll = async () => {
    if (!pages.length) return;
    try {
      const JSZip = (await __vitePreload(async () => {
        const { default: __vite_default__ } = await import("./jszip.min-DKefP-WY.js").then((n) => n.j);
        return { default: __vite_default__ };
      }, true ? __vite__mapDeps([3,1,2]) : void 0)).default;
      const zip = new JSZip();
      for (const page of pages) {
        const base64 = page.dataUrl.split(",")[1];
        zip.file(`page-${page.pageNum}.png`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(pdfFile == null ? void 0 : pdfFile.name.replace(/\.pdf$/i, "")) ?? "pages"}-images.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    !pdfFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        accept: ".pdf,application/pdf",
        onFiles: handleFile,
        label: "Drop a PDF here",
        hint: "Each page will be converted to a PNG image"
      }
    ),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", "data-ocid": "pdf2img-error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: errorMsg })
    ] }),
    pdfFile && status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: pdfFile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            (pdfFile.size / 1024).toFixed(0),
            " KB"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleConvert,
            "data-ocid": "pdf2img-convert-btn",
            className: "flex-1 sm:flex-none gap-2 min-h-[44px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "h-4 w-4" }),
              "Convert to Images"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: reset,
            className: "shrink-0 min-h-[44px] min-w-[44px]",
            "aria-label": "Remove file",
            "data-ocid": "pdf2img-remove-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    status === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col items-center gap-4 text-center",
        "data-ocid": "pdf2img-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 text-primary animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm sm:text-base", children: "Converting pages…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-1", children: totalPages > 0 ? `Page ${progress} of ${totalPages}` : "Preparing…" })
          ] }),
          totalPages > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs bg-muted rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-primary h-full rounded-full transition-all duration-300",
              style: { width: `${progress / totalPages * 100}%` }
            }
          ) })
        ]
      }
    ),
    status === "done" && pages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "pdf2img-results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
            pages.length,
            " page",
            pages.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground truncate", children: pdfFile == null ? void 0 : pdfFile.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          pages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: downloadAll,
              "data-ocid": "pdf2img-download-all-btn",
              className: "gap-2 min-h-[40px]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { className: "h-4 w-4" }),
                "Download All ZIP"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: reset,
              "data-ocid": "pdf2img-reset-btn",
              className: "gap-2 min-h-[40px]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                "New PDF"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4", children: pages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group flex flex-col rounded-xl border border-border bg-card overflow-hidden",
          "data-ocid": `pdf2img-page-${page.pageNum}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted/30 flex items-center justify-center overflow-hidden aspect-[3/4]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: page.dataUrl,
                  alt: `Page ${page.pageNum}`,
                  className: "w-full h-full object-contain",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => downloadPage(page),
                  className: "gap-1.5 shadow-elevated",
                  "data-ocid": `pdf2img-dl-page-${page.pageNum}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                    "Download"
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                "Page ",
                page.pageNum
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => downloadPage(page),
                  className: "h-8 px-2 gap-1 text-xs",
                  "data-ocid": `pdf2img-dl-btn-${page.pageNum}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                    "PNG"
                  ]
                }
              )
            ] })
          ]
        },
        page.pageNum
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "sr-only", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HowItWorks,
      {
        heading: "How does PDF to Image work?",
        steps: [
          {
            text: 'Click "Upload PDF" or drag and drop your PDF file into the upload area.'
          },
          {
            text: "The tool will process your PDF and convert each page into a high-quality PNG image."
          },
          {
            text: "You can preview all the converted images directly on the page."
          },
          {
            text: 'Click "Download" next to any image to save it individually, or click "Download All as ZIP" to download all pages at once.'
          }
        ],
        note: "Each page of your PDF becomes a separate PNG image. Large PDFs may take a few seconds to process."
      }
    )
  ] });
}
function PdfToolsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 gap-5 sm:gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "PDF Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground mt-0.5", children: "All PDF operations run privately in your browser" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        defaultValue: "img2pdf",
        className: "animate-fade-in",
        "data-ocid": "pdf-tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full flex overflow-x-auto sm:overflow-x-visible scrollbar-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "merge",
                className: "flex-1 min-w-[80px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]",
                "data-ocid": "tab-merge",
                children: "Merge PDF"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "img2pdf",
                className: "flex-1 min-w-[90px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]",
                "data-ocid": "tab-img2pdf",
                children: "Image → PDF"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "pdf2img",
                className: "flex-1 min-w-[90px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]",
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
