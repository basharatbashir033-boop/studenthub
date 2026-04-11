import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  ImageIcon,
  Loader2,
  Merge,
  PackageOpen,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

// ─── How It Works collapsible ────────────────────────────────────────────────

interface HowItWorksStep {
  text: string;
}

interface HowItWorksProps {
  heading: string;
  steps: HowItWorksStep[];
  note: string;
}

function HowItWorks({ heading, steps, note }: HowItWorksProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mt-6 rounded-xl border border-border bg-muted/20 overflow-hidden"
      data-ocid="how-it-works"
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
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
          <ol className="flex flex-col gap-2.5">
            {steps.map((step, i) => (
              <li key={step.text} className="flex gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {step.text}
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

// ─── Shared DropZone ─────────────────────────────────────────────────────────

function DropZone({
  accept,
  onFiles,
  multiple = false,
  label,
  hint,
}: {
  accept: string;
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label: string;
  hint: string;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      onFiles(dropped);
    },
    [onFiles],
  );

  return (
    <label
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-smooth",
        "p-6 md:p-8",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-muted/30",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      data-ocid="pdf-dropzone"
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground text-sm sm:text-base">
          {label}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          {hint}
        </p>
      </div>
    </label>
  );
}

// ─── Merge PDF (stub) ────────────────────────────────────────────────────────

function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  };

  return (
    <div className="flex flex-col gap-4">
      <DropZone
        accept=".pdf,application/pdf"
        multiple
        onFiles={addFiles}
        label="Drop PDF files here"
        hint="Select multiple PDF files to merge"
      />
      {files.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {files.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm truncate flex-1 min-w-0">{f.name}</span>
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">
                {(f.size / 1024).toFixed(0)} KB
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive shrink-0 min-w-[2rem] sm:min-w-[1.5rem]"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, idx) => idx !== i))
                }
                aria-label="Remove file"
              >
                <AlertCircle className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {files.length >= 2 ? (
        <div className="flex flex-col gap-2">
          <Button
            disabled
            data-ocid="merge-pdf-btn"
            className="w-full min-h-[44px]"
          >
            <Merge className="h-4 w-4 mr-2" />
            Merge {files.length} PDFs
          </Button>
          <Alert>
            <AlertDescription className="text-xs">
              PDF merging is coming soon. Stay tuned!
            </AlertDescription>
          </Alert>
        </div>
      ) : files.length === 1 ? (
        <Alert>
          <AlertDescription className="text-sm">
            Add at least 2 PDF files to merge.
          </AlertDescription>
        </Alert>
      ) : null}

      <HowItWorks
        heading="How does Merge PDF work?"
        steps={[
          {
            text: 'Click "Add PDF Files" or drag and drop your PDF files into the upload area.',
          },
          {
            text: "Your selected files will appear in a list — you can remove any file you don't want.",
          },
          {
            text: 'Once you\'ve added all your files, click "Merge PDFs" to combine them into a single PDF.',
          },
          {
            text: "Your merged PDF will automatically download to your device.",
          },
        ]}
        note="You can add as many PDFs as you need. They will be merged in the order they appear in the list."
      />
    </div>
  );
}

// ─── Image → PDF (real jsPDF) ────────────────────────────────────────────────

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function getImageFormat(file: File): "JPEG" | "PNG" | null {
  if (file.type === "image/jpeg" || file.type === "image/jpg") return "JPEG";
  if (file.type === "image/png") return "PNG";
  return null;
}

function getImageDimensions(
  dataUrl: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Failed to load image dimensions"));
    img.src = dataUrl;
  });
}

function ImageToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const objectUrlsRef = useRef<string[]>([]);

  const addImages = useCallback((files: File[]) => {
    const supported = files.filter((f) => {
      const fmt = getImageFormat(f);
      if (!fmt) {
        toast.error(`${f.name}: unsupported format. Use JPEG or PNG.`);
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

  const removeImage = (idx: number) => {
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
      const { jsPDF } = await import("jspdf");

      const firstDataUrl = await readFileAsDataUrl(images[0]);
      const firstFmt = getImageFormat(images[0])!;
      const firstDims = await getImageDimensions(firstDataUrl);

      const pageW = 210;
      const pageH = 297;

      const doc = new jsPDF({ unit: "mm", format: [pageW, pageH] });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage([pageW, pageH]);

        const dataUrl =
          i === 0 ? firstDataUrl : await readFileAsDataUrl(images[i]);
        const fmt = i === 0 ? firstFmt : getImageFormat(images[i])!;
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

      const dateStr = new Date().toISOString().slice(0, 10);
      doc.save(`image-to-pdf-${dateStr}.pdf`);
      setStatus("done");
      toast.success(
        `${images.length} image${images.length > 1 ? "s" : ""} converted and downloaded!`,
      );
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DropZone
        accept="image/jpeg,image/png,image/jpg"
        multiple
        onFiles={addImages}
        label="Drop images here"
        hint="JPEG and PNG supported — one page per image"
      />

      {images.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
          data-ocid="image-preview-grid"
        >
          {previews.map((src, i) => (
            <div
              key={`${images[i].name}-${i}`}
              className="relative rounded-lg overflow-hidden border border-border aspect-square bg-muted"
            >
              <img
                src={src}
                alt={images[i].name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center rounded bg-card/80 hover:bg-card text-foreground transition-colors touch-manipulation"
                onClick={() => removeImage(i)}
                aria-label={`Remove ${images[i].name}`}
              >
                <AlertCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleConvert}
            disabled={status === "processing"}
            data-ocid="image-to-pdf-btn"
            className="gap-2 w-full min-h-[44px]"
          >
            {status === "processing" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Converting…
              </>
            ) : status === "done" ? (
              <>
                <Download className="h-4 w-4" />
                Download Again
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4" />
                Convert {images.length} Image{images.length > 1 ? "s" : ""} to
                PDF
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Each image will appear on its own page in the PDF.
          </p>
        </div>
      )}

      <HowItWorks
        heading="How does Image to PDF work?"
        steps={[
          {
            text: 'Click "Add Images" or drag and drop your JPEG or PNG image files into the upload area.',
          },
          {
            text: "Your images will appear as previews in a grid — you can remove any you don't want.",
          },
          {
            text: 'Click "Convert to PDF" to combine all your images into a single PDF document.',
          },
          { text: "Your PDF will automatically download to your device." },
        ]}
        note="You can add multiple images and they will all be included in the final PDF, one image per page."
      />
    </div>
  );
}

// ─── PDF → Image ─────────────────────────────────────────────────────────────

type PageResult = { dataUrl: string; pageNum: number };
type ConvertStatus = "idle" | "processing" | "done" | "error";

function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageResult[]>([]);
  const [status, setStatus] = useState<ConvertStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reset = () => {
    setPdfFile(null);
    setPages([]);
    setStatus("idle");
    setProgress(0);
    setTotalPages(0);
    setErrorMsg("");
  };

  const handleFile = useCallback((files: File[]) => {
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
      // Dynamic import to keep initial bundle small
      const pdfjsLib = await import("pdfjs-dist");
      // Set worker source — use the bundled worker via CDN to avoid Vite worker config complexity
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      const count = pdfDoc.numPages;
      setTotalPages(count);

      const results: PageResult[] = [];

      // Use a hidden offscreen canvas for rendering
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      for (let i = 1; i <= count; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x for high quality
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvas, canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL("image/png");
        results.push({ dataUrl, pageNum: i });
        setProgress(i);
        // Yield to React to update UI
        await new Promise((r) => setTimeout(r, 0));
      }

      setPages(results);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to convert PDF. Make sure it's a valid file.",
      );
      setStatus("error");
    }
  };

  const downloadPage = (page: PageResult) => {
    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = `page-${page.pageNum}.png`;
    a.click();
  };

  const downloadAll = async () => {
    if (!pages.length) return;
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const page of pages) {
        // dataUrl → base64 blob
        const base64 = page.dataUrl.split(",")[1];
        zip.file(`page-${page.pageNum}.png`, base64, { base64: true });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pdfFile?.name.replace(/\.pdf$/i, "") ?? "pages"}-images.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* File upload */}
      {!pdfFile && (
        <DropZone
          accept=".pdf,application/pdf"
          onFiles={handleFile}
          label="Drop a PDF here"
          hint="Each page will be converted to a PNG image"
        />
      )}

      {/* Error state */}
      {status === "error" && (
        <Alert variant="destructive" data-ocid="pdf2img-error">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}

      {/* File selected — ready to convert */}
      {pdfFile && status === "idle" && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 shrink-0">
              <FileText className="h-5 w-5 text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {pdfFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(pdfFile.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={handleConvert}
              data-ocid="pdf2img-convert-btn"
              className="flex-1 sm:flex-none gap-2 min-h-[44px]"
            >
              <ImageIcon className="h-4 w-4" />
              Convert to Images
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={reset}
              className="shrink-0 min-h-[44px] min-w-[44px]"
              aria-label="Remove file"
              data-ocid="pdf2img-remove-btn"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Processing state */}
      {status === "processing" && (
        <div
          className="rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col items-center gap-4 text-center"
          data-ocid="pdf2img-loading"
        >
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <div>
            <p className="font-medium text-foreground text-sm sm:text-base">
              Converting pages…
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {totalPages > 0
                ? `Page ${progress} of ${totalPages}`
                : "Preparing…"}
            </p>
          </div>
          {totalPages > 0 && (
            <div className="w-full max-w-xs bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${(progress / totalPages) * 100}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {status === "done" && pages.length > 0 && (
        <div className="flex flex-col gap-4" data-ocid="pdf2img-results">
          {/* Header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="secondary" className="shrink-0">
                {pages.length} page{pages.length !== 1 ? "s" : ""}
              </Badge>
              <span className="text-sm text-muted-foreground truncate">
                {pdfFile?.name}
              </span>
            </div>
            <div className="flex gap-2">
              {pages.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAll}
                  data-ocid="pdf2img-download-all-btn"
                  className="gap-2 min-h-[40px]"
                >
                  <PackageOpen className="h-4 w-4" />
                  Download All ZIP
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                data-ocid="pdf2img-reset-btn"
                className="gap-2 min-h-[40px]"
              >
                <X className="h-3.5 w-3.5" />
                New PDF
              </Button>
            </div>
          </div>

          {/* Page grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {pages.map((page) => (
              <div
                key={page.pageNum}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden"
                data-ocid={`pdf2img-page-${page.pageNum}`}
              >
                {/* Thumbnail */}
                <div className="relative bg-muted/30 flex items-center justify-center overflow-hidden aspect-[3/4]">
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNum}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      onClick={() => downloadPage(page)}
                      className="gap-1.5 shadow-elevated"
                      data-ocid={`pdf2img-dl-page-${page.pageNum}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between px-3 py-2.5 border-t border-border">
                  <span className="text-xs text-muted-foreground font-medium">
                    Page {page.pageNum}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadPage(page)}
                    className="h-8 px-2 gap-1 text-xs"
                    data-ocid={`pdf2img-dl-btn-${page.pageNum}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    PNG
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden canvas ref (kept for any future direct manipulation) */}
      <canvas ref={canvasRef} className="sr-only" aria-hidden />

      <HowItWorks
        heading="How does PDF to Image work?"
        steps={[
          {
            text: 'Click "Upload PDF" or drag and drop your PDF file into the upload area.',
          },
          {
            text: "The tool will process your PDF and convert each page into a high-quality PNG image.",
          },
          {
            text: "You can preview all the converted images directly on the page.",
          },
          {
            text: 'Click "Download" next to any image to save it individually, or click "Download All as ZIP" to download all pages at once.',
          },
        ]}
        note="Each page of your PDF becomes a separate PNG image. Large PDFs may take a few seconds to process."
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function PdfToolsPage() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 gap-5 sm:gap-6">
        <AdBanner slot="header" />

        <div className="flex items-center gap-3 animate-fade-in">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 shrink-0">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
              PDF Tools
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              All PDF operations run privately in your browser
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="img2pdf"
          className="animate-fade-in"
          data-ocid="pdf-tabs"
        >
          {/* Tabs list: scrollable on very small screens, wraps on larger */}
          <TabsList className="w-full flex overflow-x-auto sm:overflow-x-visible scrollbar-none">
            <TabsTrigger
              value="merge"
              className="flex-1 min-w-[80px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]"
              data-ocid="tab-merge"
            >
              Merge PDF
            </TabsTrigger>
            <TabsTrigger
              value="img2pdf"
              className="flex-1 min-w-[90px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]"
              data-ocid="tab-img2pdf"
            >
              Image → PDF
            </TabsTrigger>
            <TabsTrigger
              value="pdf2img"
              className="flex-1 min-w-[90px] text-xs sm:text-sm whitespace-nowrap min-h-[40px] sm:min-h-[36px]"
              data-ocid="tab-pdf2img"
            >
              PDF → Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="merge" className="mt-4">
            <MergePdf />
          </TabsContent>

          <TabsContent value="img2pdf" className="mt-4">
            <ImageToPdf />
          </TabsContent>

          <TabsContent value="pdf2img" className="mt-4">
            <PdfToImage />
          </TabsContent>
        </Tabs>

        <AdBanner slot="between-cards" />
      </div>
    </Layout>
  );
}
