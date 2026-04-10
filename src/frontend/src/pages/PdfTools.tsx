import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Download,
  FileText,
  ImageIcon,
  Loader2,
  Merge,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

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
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-smooth p-8",
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
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{hint}</p>
      </div>
    </label>
  );
}

// ─── Coming Soon stub ────────────────────────────────────────────────────────

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 py-16 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
        <FileText className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{label} — Coming Soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          This feature is under development. Check back soon!
        </p>
      </div>
      <Badge variant="secondary">Coming Soon</Badge>
    </div>
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
              className={`flex items-center gap-3 px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm truncate flex-1 min-w-0">{f.name}</span>
              <span className="text-xs text-muted-foreground shrink-0">
                {(f.size / 1024).toFixed(0)} KB
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
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
          <Button disabled data-ocid="merge-pdf-btn">
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
          <AlertDescription>
            Add at least 2 PDF files to merge.
          </AlertDescription>
        </Alert>
      ) : null}
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

    // Create preview object URLs
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

      // Process first image to create the doc with correct orientation
      const firstDataUrl = await readFileAsDataUrl(images[0]);
      const firstFmt = getImageFormat(images[0])!;
      const firstDims = await getImageDimensions(firstDataUrl);

      // Use A4 page dimensions in mm, fit image to page
      const pageW = 210;
      const pageH = 297;

      const doc = new jsPDF({ unit: "mm", format: [pageW, pageH] });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage([pageW, pageH]);

        const dataUrl =
          i === 0 ? firstDataUrl : await readFileAsDataUrl(images[i]);
        const fmt = i === 0 ? firstFmt : getImageFormat(images[i])!;
        const dims = i === 0 ? firstDims : await getImageDimensions(dataUrl);

        // Scale to fit within page with 10mm margin on each side
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

  // Avoid unused variable lint error for firstFmt/firstDims — they're inside the loop logic above

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
        <div className="grid grid-cols-3 gap-2" data-ocid="image-preview-grid">
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
                className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded bg-card/80 hover:bg-card text-foreground transition-colors"
                onClick={() => removeImage(i)}
                aria-label={`Remove ${images[i].name}`}
              >
                <AlertCircle className="h-3 w-3" />
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
            className="gap-2"
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
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function PdfToolsPage() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 px-4 md:px-6 py-6 max-w-xl w-full mx-auto gap-6">
        <AdBanner slot="header" />

        <div className="flex items-center gap-3 animate-fade-in">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              PDF Tools
            </h1>
            <p className="text-sm text-muted-foreground">
              All PDF operations run privately in your browser
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="img2pdf"
          className="animate-fade-in"
          data-ocid="pdf-tabs"
        >
          <TabsList className="w-full">
            <TabsTrigger value="merge" className="flex-1" data-ocid="tab-merge">
              Merge PDF
            </TabsTrigger>
            <TabsTrigger
              value="img2pdf"
              className="flex-1"
              data-ocid="tab-img2pdf"
            >
              Image → PDF
            </TabsTrigger>
            <TabsTrigger
              value="pdf2img"
              className="flex-1"
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
            <ComingSoon label="PDF to Image" />
          </TabsContent>
        </Tabs>

        <AdBanner slot="between-cards" />
      </div>
    </Layout>
  );
}
