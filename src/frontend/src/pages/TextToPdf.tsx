import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/layout/Layout";

const FONT_SIZES = [
  { value: "10", label: "Small (10pt)" },
  { value: "12", label: "Normal (12pt)" },
  { value: "14", label: "Medium (14pt)" },
  { value: "16", label: "Large (16pt)" },
  { value: "18", label: "X-Large (18pt)" },
];

const PAGE_SIZES = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "Letter (US)" },
  { value: "legal", label: "Legal" },
];

type PageFormat = "a4" | "letter" | "legal";

function CountPills({ text }: { text: string }) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  return (
    <div className="flex gap-2">
      <Badge variant="secondary" className="text-xs font-mono">
        {words.toLocaleString()} word{words !== 1 ? "s" : ""}
      </Badge>
      <Badge variant="secondary" className="text-xs font-mono">
        {chars.toLocaleString()} char{chars !== 1 ? "s" : ""}
      </Badge>
    </div>
  );
}

async function generatePdf(
  title: string,
  content: string,
  fontSize: string,
  pageSize: PageFormat,
): Promise<void> {
  const { jsPDF } = await import("jspdf");

  const formatMap: Record<PageFormat, [number, number]> = {
    a4: [210, 297],
    letter: [215.9, 279.4],
    legal: [215.9, 355.6],
  };

  const [pageW, pageH] = formatMap[pageSize];
  const doc = new jsPDF({ unit: "mm", format: [pageW, pageH] });

  const margin = 20;
  const contentWidth = pageW - margin * 2;
  const pt = Number(fontSize);

  // Title
  let cursorY = margin;
  if (title.trim()) {
    const titlePt = Math.round(pt * 1.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(titlePt);
    const titleLines = doc.splitTextToSize(
      title.trim(),
      contentWidth,
    ) as string[];
    for (const line of titleLines) {
      if (cursorY + titlePt * 0.3528 > pageH - margin) {
        doc.addPage([pageW, pageH]);
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += titlePt * 0.3528 * 1.4;
    }
    // Divider line
    cursorY += 2;
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, cursorY, pageW - margin, cursorY);
    cursorY += 6;
  }

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(pt);
  const lineHeightMm = pt * 0.3528 * 1.7;

  const paragraphs = content.split("\n");
  for (const para of paragraphs) {
    const lines = doc.splitTextToSize(para || " ", contentWidth) as string[];
    for (const line of lines) {
      if (cursorY + lineHeightMm > pageH - margin) {
        doc.addPage([pageW, pageH]);
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeightMm;
    }
    cursorY += lineHeightMm * 0.25; // paragraph spacing
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  doc.save(`text-to-pdf-${dateStr}.pdf`);
}

export function TextToPdfPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("12");
  const [pageSize, setPageSize] = useState<PageFormat>("a4");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleConvert = async () => {
    if (!text.trim()) {
      textareaRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      await generatePdf(title, text, fontSize, pageSize);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setText("");
    setFontSize("12");
    setPageSize("a4");
  };

  return (
    <Layout>
      <div className="flex flex-col flex-1 px-4 md:px-6 py-6 max-w-3xl w-full mx-auto gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 animate-fade-in">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() => navigate({ to: "/" })}
            aria-label="Back to dashboard"
            data-ocid="text-to-pdf-back-btn"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold text-foreground tracking-tight leading-tight">
                Text to PDF
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                Type or paste text — export as a real PDF file
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
            Free
          </Badge>
        </div>

        {/* Options bar */}
        <div
          className={cn(
            "rounded-xl border border-border bg-card p-4 flex flex-wrap gap-4 items-end",
            "animate-fade-in",
          )}
          style={{ animationDelay: "60ms", animationFillMode: "both" }}
        >
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
            <Label htmlFor="doc-title" className="text-xs font-medium">
              Document Title{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="doc-title"
              placeholder="e.g. My Essay"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9 text-sm"
              data-ocid="text-to-pdf-title-input"
            />
          </div>

          <div className="flex flex-col gap-1.5 min-w-[140px]">
            <Label className="text-xs font-medium">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="text-to-pdf-fontsize-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_SIZES.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <Label className="text-xs font-medium">Page Size</Label>
            <Select
              value={pageSize}
              onValueChange={(v) => setPageSize(v as PageFormat)}
            >
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="text-to-pdf-pagesize-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Text area */}
        <div
          className="flex flex-col gap-2 animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="doc-content" className="text-sm font-medium">
              Content
            </Label>
            <CountPills text={text} />
          </div>
          <Textarea
            id="doc-content"
            ref={textareaRef}
            placeholder="Type or paste your text here…&#10;&#10;Each line will appear as a paragraph in the PDF."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[320px] resize-y font-mono text-sm leading-relaxed"
            data-ocid="text-to-pdf-content-textarea"
          />
          {!text.trim() && (
            <p className="text-xs text-muted-foreground">
              Start typing above, then click{" "}
              <strong>Convert &amp; Download PDF</strong> to get a real PDF
              file.
            </p>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div
          className="flex flex-wrap items-center gap-3 animate-fade-in"
          style={{ animationDelay: "180ms", animationFillMode: "both" }}
        >
          <Button
            type="button"
            onClick={handleConvert}
            disabled={!text.trim() || loading}
            className="gap-2 transition-smooth"
            data-ocid="text-to-pdf-convert-btn"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Convert &amp; Download PDF
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground transition-smooth"
            onClick={handleReset}
            data-ocid="text-to-pdf-reset-btn"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>

        {/* How it works */}
        <div
          className="rounded-xl bg-muted/40 border border-border px-5 py-4 animate-fade-in"
          style={{ animationDelay: "240ms", animationFillMode: "both" }}
        >
          <h2 className="text-sm font-semibold text-foreground mb-2">
            How it works
          </h2>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Type or paste your text in the content box above.</li>
            <li>Optionally set a title, font size, and page format.</li>
            <li>
              Click{" "}
              <strong className="text-foreground">
                Convert &amp; Download PDF
              </strong>{" "}
              — your PDF downloads instantly.
            </li>
            <li>
              No print dialog, no popups — a real PDF file saved to your device.
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
