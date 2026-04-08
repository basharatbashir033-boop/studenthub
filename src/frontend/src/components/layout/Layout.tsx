import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileSidebar, Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export function Layout({ children, hideSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <AnnouncementBanner />

      <div className="flex flex-1 min-h-0">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 min-w-0 flex flex-col" data-ocid="main-content">
          {children}
        </main>
      </div>

      <Footer />
      <MobileSidebar />
      <Toaster richColors closeButton />
    </div>
  );
}
