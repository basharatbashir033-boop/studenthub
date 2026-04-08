import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, GraduationCap, Home } from "lucide-react";
import { Layout } from "../components/layout/Layout";

export function NotFound() {
  return (
    <Layout hideSidebar>
      <div
        className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center"
        data-ocid="not-found-page"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>

        <h1 className="font-display text-6xl font-bold text-foreground mb-2 animate-fade-in">
          404
        </h1>
        <p className="text-xl font-semibold text-foreground mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground max-w-sm mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link to="/" data-ocid="not-found-home-btn">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
}
