import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/gpa-calculator", label: "GPA Calculator" },
  { href: "/percentage-calculator", label: "Percentage Calculator" },
  { href: "/pdf-tools", label: "PDF Tools" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "studenthub";

  return (
    <footer className="bg-card border-t border-border" data-ocid="main-footer">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-base font-semibold">
                <span className="text-foreground">Student</span>
                <span className="text-primary">Hub</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs">
              Smart Tools for Smart Students. Free, fast, and always available.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tools
            </p>
            <ul className="flex flex-col gap-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {year} StudentHub. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
