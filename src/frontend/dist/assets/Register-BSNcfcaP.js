import { c as createLucideIcon, d as useNavigate, m as useAuth, r as reactExports, j as jsxRuntimeExports, a2 as Link, G as GraduationCap, B as Button } from "./index-WBE00zzH.js";
import { L as Label, I as Input } from "./label-DH1ItHDA.js";
import { m as motion } from "./proxy-Dq17r1zB.js";
import { C as CircleAlert } from "./circle-alert-BHg62t7y.js";
import { L as LoaderCircle } from "./loader-circle-BEDETFVh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [emailTouched, setEmailTouched] = reactExports.useState(false);
  const [passwordTouched, setPasswordTouched] = reactExports.useState(false);
  const [confirmTouched, setConfirmTouched] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);
  const emailError = emailTouched && email && !isValidEmail(email) ? "Please enter a valid email address." : null;
  const passwordError = passwordTouched && password && password.length < 8 ? "Password must be at least 8 characters." : null;
  const confirmError = confirmTouched && confirmPassword && password !== confirmPassword ? "Passwords do not match." : null;
  const canSubmit = email && password && confirmPassword && isValidEmail(email) && password.length >= 8 && password === confirmPassword && !loading;
  async function handleSubmit(e) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 justify-center hover:opacity-80 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-semibold tracking-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Student" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Hub" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-subtle overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground", children: "Create your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Start using StudentHub's smart tools" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "px-6 py-6 space-y-5",
              noValidate: true,
              children: [
                error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    className: "flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3",
                    role: "alert",
                    "data-ocid": "register-error",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "register-email", className: "text-sm font-medium", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-email",
                      type: "email",
                      autoComplete: "email",
                      placeholder: "you@example.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      onBlur: () => setEmailTouched(true),
                      className: emailError ? "border-destructive focus-visible:ring-destructive" : "",
                      "aria-describedby": emailError ? "register-email-error" : void 0,
                      "aria-invalid": !!emailError,
                      required: true,
                      "data-ocid": "register-email"
                    }
                  ),
                  emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      id: "register-email-error",
                      className: "text-xs text-destructive",
                      children: emailError
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "register-password",
                      className: "text-sm font-medium",
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-password",
                      type: "password",
                      autoComplete: "new-password",
                      placeholder: "At least 8 characters",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      onBlur: () => setPasswordTouched(true),
                      className: passwordError ? "border-destructive focus-visible:ring-destructive" : "",
                      "aria-describedby": passwordError ? "register-password-error" : void 0,
                      "aria-invalid": !!passwordError,
                      required: true,
                      "data-ocid": "register-password"
                    }
                  ),
                  passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      id: "register-password-error",
                      className: "text-xs text-destructive",
                      children: passwordError
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "register-confirm", className: "text-sm font-medium", children: "Confirm password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-confirm",
                      type: "password",
                      autoComplete: "new-password",
                      placeholder: "Repeat your password",
                      value: confirmPassword,
                      onChange: (e) => setConfirmPassword(e.target.value),
                      onBlur: () => setConfirmTouched(true),
                      className: confirmError ? "border-destructive focus-visible:ring-destructive" : "",
                      "aria-describedby": confirmError ? "register-confirm-error" : void 0,
                      "aria-invalid": !!confirmError,
                      required: true,
                      "data-ocid": "register-confirm"
                    }
                  ),
                  confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      id: "register-confirm-error",
                      className: "text-xs text-destructive",
                      children: confirmError
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full gap-2",
                    disabled: !canSubmit,
                    "data-ocid": "register-submit",
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Creating account…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                      "Create account"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/login",
                      className: "font-medium text-primary hover:underline transition-smooth",
                      "data-ocid": "register-login-link",
                      children: "Sign in"
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "By creating an account, you agree to our terms of service." })
      ]
    }
  ) });
}
export {
  RegisterPage
};
