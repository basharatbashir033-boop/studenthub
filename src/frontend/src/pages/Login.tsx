import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, GraduationCap, Loader2, LogIn, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isFetching } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const emailError =
    emailTouched && email && !isValidEmail(email)
      ? "Please enter a valid email address."
      : null;

  const canSubmit =
    email && password && isValidEmail(email) && !loading && !isFetching;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidEmail(email)) {
      setEmailTouched(true);
      return;
    }
    if (!password) return;

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate({ to: "/" });
      } else {
        setError(result.error ?? "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 justify-center hover:opacity-80 transition-smooth"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              <span className="text-foreground">Student</span>
              <span className="text-primary">Hub</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card shadow-subtle overflow-hidden">
          {/* Header */}
          <div className="border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <LogIn className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-foreground">
                  Sign in to your account
                </h1>
                <p className="text-xs text-muted-foreground">
                  Access your student tools and saved data
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-6 py-6 space-y-5"
            noValidate
          >
            {/* Connecting indicator */}
            {isFetching && !loading && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
                data-ocid="login-connecting"
              >
                <Wifi className="h-4 w-4 shrink-0 text-muted-foreground animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  Connecting to server…
                </p>
              </motion.div>
            )}

            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3"
                role="alert"
                data-ocid="login-error"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={
                  emailError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-describedby={emailError ? "login-email-error" : undefined}
                aria-invalid={!!emailError}
                required
                data-ocid="login-email"
              />
              {emailError && (
                <p id="login-email-error" className="text-xs text-destructive">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-ocid="login-password"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={!canSubmit}
              data-ocid="login-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : isFetching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign in
                </>
              )}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline transition-smooth"
                data-ocid="login-register-link"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your data stays private and secure with StudentHub.
        </p>
      </motion.div>
    </div>
  );
}
