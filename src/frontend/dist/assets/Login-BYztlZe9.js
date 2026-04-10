import { c as createLucideIcon, d as useNavigate, m as useAuth, r as reactExports, j as jsxRuntimeExports, a2 as Link, G as GraduationCap, B as Button } from "./index-BVxYM8sg.js";
import { L as Label, I as Input } from "./label-DQ3ueyNU.js";
import { m as motion } from "./proxy-__v3Abgd.js";
import { W as Wifi } from "./wifi-rpzoS2q8.js";
import { C as CircleAlert } from "./circle-alert-C1_dLfSJ.js";
import { L as LoaderCircle } from "./loader-circle-BgCL7r0A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isFetching } = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [emailTouched, setEmailTouched] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);
  const emailError = emailTouched && email && !isValidEmail(email) ? "Please enter a valid email address." : null;
  const canSubmit = email && password && isValidEmail(email) && !loading && !isFetching;
  async function handleSubmit(e) {
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-foreground", children: "Sign in to your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Access your student tools and saved data" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "px-6 py-6 space-y-5",
              noValidate: true,
              children: [
                isFetching && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    className: "flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3",
                    "data-ocid": "login-connecting",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-4 w-4 shrink-0 text-muted-foreground animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Connecting to server…" })
                    ]
                  }
                ),
                error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    className: "flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3",
                    role: "alert",
                    "data-ocid": "login-error",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", className: "text-sm font-medium", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-email",
                      type: "email",
                      autoComplete: "email",
                      placeholder: "you@example.com",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      onBlur: () => setEmailTouched(true),
                      className: emailError ? "border-destructive focus-visible:ring-destructive" : "",
                      "aria-describedby": emailError ? "login-email-error" : void 0,
                      "aria-invalid": !!emailError,
                      required: true,
                      "data-ocid": "login-email"
                    }
                  ),
                  emailError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "login-email-error", className: "text-xs text-destructive", children: emailError })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", className: "text-sm font-medium", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-password",
                      type: "password",
                      autoComplete: "current-password",
                      placeholder: "Enter your password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      required: true,
                      "data-ocid": "login-password"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full gap-2",
                    disabled: !canSubmit,
                    "data-ocid": "login-submit",
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Signing in…"
                    ] }) : isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Connecting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                      "Sign in"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
                  "Don't have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/register",
                      className: "font-medium text-primary hover:underline transition-smooth",
                      "data-ocid": "login-register-link",
                      children: "Create account"
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Your data stays private and secure with StudentHub." })
      ]
    }
  ) });
}
export {
  LoginPage
};
