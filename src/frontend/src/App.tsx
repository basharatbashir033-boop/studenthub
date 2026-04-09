import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { SkeletonGrid } from "./components/ui/SkeletonCard";
import { NotFound } from "./pages/NotFound";
import { useAppStore } from "./store/useAppStore";

// Lazy-loaded pages
const HomePage = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.HomePage })),
);
const GpaCalculatorPage = lazy(() =>
  import("./pages/GpaCalculator").then((m) => ({
    default: m.GpaCalculatorPage,
  })),
);
const PercentageCalculatorPage = lazy(() =>
  import("./pages/PercentageCalculator").then((m) => ({
    default: m.PercentageCalculatorPage,
  })),
);
const PdfToolsPage = lazy(() =>
  import("./pages/PdfTools").then((m) => ({ default: m.PdfToolsPage })),
);
const AdminPage = lazy(() =>
  import("./pages/Admin").then((m) => ({ default: m.AdminPage })),
);
const TextToPdfPage = lazy(() =>
  import("./pages/TextToPdf").then((m) => ({ default: m.TextToPdfPage })),
);

function PageFallback() {
  return (
    <Layout>
      <div className="p-6">
        <SkeletonGrid count={6} />
      </div>
    </Layout>
  );
}

// Routes
const rootRoute = createRootRoute({ notFoundComponent: NotFound });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const gpaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gpa-calculator",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GpaCalculatorPage />
    </Suspense>
  ),
});

const percentageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/percentage-calculator",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PercentageCalculatorPage />
    </Suspense>
  ),
});

const pdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf-tools",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PdfToolsPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminPage />
    </Suspense>
  ),
});

const textToPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/text-to-pdf",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TextToPdfPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  gpaRoute,
  percentageRoute,
  pdfRoute,
  adminRoute,
  textToPdfRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Initialize theme on mount
function ThemeInitializer() {
  const { theme } = useAppStore();
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);
  return null;
}

export default function App() {
  return (
    <>
      <ThemeInitializer />
      <RouterProvider router={router} />
    </>
  );
}
