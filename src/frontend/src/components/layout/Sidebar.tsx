import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Calculator, FileText, Home, Percent, Settings, X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/gpa-calculator", label: "GPA Calculator", icon: Calculator },
  {
    href: "/percentage-calculator",
    label: "Percentage Calculator",
    icon: Percent,
  },
  { href: "/pdf-tools", label: "PDF Tools", icon: FileText },
];

function NavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  const { location } = useRouterState();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink key={item.href} {...item} onClick={onClose} />
      ))}
      <Separator className="my-2" />
      <NavLink
        href="/admin"
        label="Admin Panel"
        icon={Settings}
        onClick={onClose}
      />
    </nav>
  );
}

// Desktop sidebar
export function Sidebar() {
  return (
    <aside
      className="hidden md:flex w-56 shrink-0 flex-col bg-sidebar border-r border-sidebar-border"
      data-ocid="desktop-sidebar"
    >
      <SidebarContent />
    </aside>
  );
}

// Mobile sidebar (Sheet)
export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-base">
              <span className="text-foreground">Student</span>
              <span className="text-primary">Hub</span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-7 w-7"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
