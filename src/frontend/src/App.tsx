import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
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
const LoginPage = lazy(() =>
  import("./pages/Login").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("./pages/Register").then((m) => ({ default: m.RegisterPage })),
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

function AuthFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

// Auth guard: reads localStorage directly to avoid React state timing issues
function isUserAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem("studenthub_user");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { id?: string; email?: string };
    return !!(parsed.id && parsed.email);
  } catch {
    return false;
  }
}

// Routes
const rootRoute = createRootRoute({ notFoundComponent: NotFound });

// Public routes (no guard)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<AuthFallback />}>
      <LoginPage />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<AuthFallback />}>
      <RegisterPage />
    </Suspense>
  ),
});

// Guarded routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const gpaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gpa-calculator",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GpaCalculatorPage />
    </Suspense>
  ),
});

const percentageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/percentage-calculator",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PercentageCalculatorPage />
    </Suspense>
  ),
});

const pdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf-tools",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PdfToolsPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminPage />
    </Suspense>
  ),
});

const textToPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/text-to-pdf",
  beforeLoad: () => {
    if (!isUserAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TextToPdfPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
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
