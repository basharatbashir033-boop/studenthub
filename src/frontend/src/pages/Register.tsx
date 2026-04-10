import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  GraduationCap,
  Loader2,
  UserPlus,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated, isFetching } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const emailError =
    emailTouched && email && !isValidEmail(email)
      ? "Please enter a valid email address."
      : null;

  const passwordError =
    passwordTouched && password && password.length < 8
      ? "Password must be at least 8 characters."
      : null;

  const confirmError =
    confirmTouched && confirmPassword && password !== confirmPassword
      ? "Passwords do not match."
      : null;

  const canSubmit =
    email &&
    password &&
    confirmPassword &&
    isValidEmail(email) &&
    password.length >= 8 &&
    password === confirmPassword &&
    !loading &&
    !isFetching;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);

    if (!isValidEmail(email)) return;
    if (password.length < 8) return;
    if (password !== confirmPassword) return;

    setLoading(true);
    try {
      const result = await register(email, password);
      if (result.success) {
        navigate({ to: "/" });
      } else {
        setError(result.error ?? "Registration failed.");
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
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-foreground">
                  Create your account
                </h1>
                <p className="text-xs text-muted-foreground">
                  Start using StudentHub's smart tools
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
                data-ocid="register-connecting"
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
                data-ocid="register-error"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="register-email"
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
                aria-describedby={
                  emailError ? "register-email-error" : undefined
                }
                aria-invalid={!!emailError}
                required
                data-ocid="register-email"
              />
              {emailError && (
                <p
                  id="register-email-error"
                  className="text-xs text-destructive"
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="register-password"
                className="text-sm font-medium"
              >
                Password
              </Label>
              <Input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                className={
                  passwordError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-describedby={
                  passwordError ? "register-password-error" : undefined
                }
                aria-invalid={!!passwordError}
                required
                data-ocid="register-password"
              />
              {passwordError && (
                <p
                  id="register-password-error"
                  className="text-xs text-destructive"
                >
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="register-confirm" className="text-sm font-medium">
                Confirm password
              </Label>
              <Input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setConfirmTouched(true)}
                className={
                  confirmError
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-describedby={
                  confirmError ? "register-confirm-error" : undefined
                }
                aria-invalid={!!confirmError}
                required
                data-ocid="register-confirm"
              />
              {confirmError && (
                <p
                  id="register-confirm-error"
                  className="text-xs text-destructive"
                >
                  {confirmError}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={!canSubmit}
              data-ocid="register-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : isFetching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create account
                </>
              )}
            </Button>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline transition-smooth"
                data-ocid="register-login-link"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our terms of service.
        </p>
      </motion.div>
    </div>
  );
}
