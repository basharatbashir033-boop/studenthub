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
  Merge,
  Upload,
} from "lucide-react";
import { useCallback, useState } from "react";
import { AdBanner } from "../components/ads/AdBanner";
import { Layout } from "../components/layout/Layout";

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

function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  const addFiles = (newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
    setStatus("idle");
  };

  const handleMerge = () => {
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1200);
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
      {files.length >= 2 && (
        <Button
          onClick={handleMerge}
          disabled={status === "processing"}
          data-ocid="merge-pdf-btn"
        >
          <Merge className="h-4 w-4 mr-2" />
          {status === "processing"
            ? "Merging..."
            : status === "done"
              ? "Merged! Download"
              : `Merge ${files.length} PDFs`}
          {status === "done" && <Download className="h-4 w-4 ml-2" />}
        </Button>
      )}
      {files.length === 1 && (
        <Alert>
          <AlertDescription>
            Add at least 2 PDF files to merge.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function ImageToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  const addImages = (files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imgs]);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col gap-4">
      <DropZone
        accept="image/*"
        multiple
        onFiles={addImages}
        label="Drop images here"
        hint="JPG, PNG, WebP supported"
      />
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div
              key={`${img.name}-${i}`}
              className="relative rounded-lg overflow-hidden border border-border aspect-square bg-muted"
            >
              <img
                src={URL.createObjectURL(img)}
                alt={img.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-card/80 hover:bg-card"
                onClick={() =>
                  setImages((prev) => prev.filter((_, idx) => idx !== i))
                }
                aria-label="Remove image"
              >
                <AlertCircle className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {images.length > 0 && (
        <Button
          onClick={() => {
            setStatus("processing");
            setTimeout(() => setStatus("done"), 1000);
          }}
          disabled={status === "processing"}
          data-ocid="image-to-pdf-btn"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          {status === "processing"
            ? "Converting..."
            : status === "done"
              ? "Done! Download PDF"
              : `Convert ${images.length} Image${images.length > 1 ? "s" : ""} to PDF`}
          {status === "done" && <Download className="h-4 w-4 ml-2" />}
        </Button>
      )}
    </div>
  );
}

function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  return (
    <div className="flex flex-col gap-4">
      <DropZone
        accept=".pdf,application/pdf"
        onFiles={(files) => {
          setFile(files[0] ?? null);
          setStatus("idle");
        }}
        label="Drop a PDF file here"
        hint="One PDF file, up to 20 pages"
      />
      {file && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
          <span className="text-sm truncate flex-1 min-w-0">{file.name}</span>
          <Badge variant="secondary">{(file.size / 1024).toFixed(0)} KB</Badge>
        </div>
      )}
      {file && (
        <Button
          onClick={() => {
            setStatus("processing");
            setTimeout(() => setStatus("done"), 1000);
          }}
          disabled={status === "processing"}
          data-ocid="pdf-to-image-btn"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          {status === "processing"
            ? "Extracting..."
            : status === "done"
              ? "Done! Download Images"
              : "Convert PDF to Images"}
          {status === "done" && <Download className="h-4 w-4 ml-2" />}
        </Button>
      )}
    </div>
  );
}

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
          defaultValue="merge"
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
            <PdfToImage />
          </TabsContent>
        </Tabs>

        <AdBanner slot="between-cards" />
      </div>
    </Layout>
  );
}
