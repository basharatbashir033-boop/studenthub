var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, h as hashKey, g as getDefaultState, n as notifyManager, u as useQueryClient, r as reactExports, a as noop, b as shouldThrowError, c as createLucideIcon, d as useNavigate, e as useActor, f as useQuery, j as jsxRuntimeExports, L as Layout, G as GraduationCap, B as Button, i as Skeleton, F as FileText, P as Percent, C as Calculator, k as cn, l as createActor } from "./index-WBE00zzH.js";
import { B as Badge } from "./badge-B2Vgaj08.js";
import { A as AdBanner } from "./AdBanner-CUcp2j6N.js";
import { D as Download } from "./download-D-cUKsB4.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const TOOL_ICON_MAP = {
  "gpa-calculator": Calculator,
  "percentage-calculator": Percent,
  "pdf-tools": FileText,
  "text-to-pdf": FileText
};
const TOOL_COLOR_MAP = {
  "gpa-calculator": "bg-primary/10 text-primary",
  "percentage-calculator": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "pdf-tools": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "text-to-pdf": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
};
const TOOL_ROUTE_MAP = {
  "gpa-calculator": "/gpa-calculator",
  "percentage-calculator": "/percentage-calculator",
  "pdf-tools": "/pdf-tools",
  "text-to-pdf": "/text-to-pdf"
};
const TOOL_BADGE_MAP = {
  "gpa-calculator": "Popular",
  "percentage-calculator": null,
  "pdf-tools": "New",
  "text-to-pdf": "New"
};
function getGuestId() {
  try {
    const key = "studenthub-guest-id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return `guest-${Date.now()}`;
  }
}
function ToolCard({ tool, onOpen, index }) {
  const Icon = TOOL_ICON_MAP[tool.id] ?? Calculator;
  const colorClass = TOOL_COLOR_MAP[tool.id] ?? "bg-primary/10 text-primary";
  const route = TOOL_ROUTE_MAP[tool.id] ?? "/";
  const badge = TOOL_BADGE_MAP[tool.id] ?? null;
  const usageCount = Number(tool.usageCount);
  const handleOpen = reactExports.useCallback(() => {
    onOpen(tool.id, route);
  }, [tool.id, route, onOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5",
        "hover:border-primary/30 hover:shadow-elevated transition-smooth cursor-pointer",
        "animate-fade-in"
      ),
      style: { animationDelay: `${index * 80}ms`, animationFillMode: "both" },
      "data-ocid": `tool-card-${tool.id}`,
      children: [
        badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "absolute top-4 right-4 text-xs", children: badge }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              colorClass
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground group-hover:text-primary transition-colors", children: tool.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: tool.description }),
          usageCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
            usageCount.toLocaleString(),
            " uses"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "mt-auto -mx-1 justify-start gap-1.5 text-primary hover:text-primary hover:bg-primary/5 font-medium text-sm px-2",
            onClick: handleOpen,
            "data-ocid": `tool-open-btn-${tool.id}`,
            children: [
              "Open Tool",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" })
            ]
          }
        )
      ]
    }
  );
}
function ToolCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mt-auto" })
  ] });
}
function PwaInstallButton() {
  const deferredPrompt = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    deferredPrompt.current = null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      className: "gap-2 border-primary/30 text-primary hover:bg-primary/5 transition-smooth",
      onClick: handleInstall,
      "data-ocid": "pwa-install-btn",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        "Install App"
      ]
    }
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/20 py-16 text-center animate-fade-in",
      "data-ocid": "tools-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-7 w-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "No tools available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "All tools are currently disabled. Check back soon — we're adding more tools regularly!" })
        ] })
      ]
    }
  );
}
const STATIC_TOOLS = [
  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate your semester or cumulative GPA instantly. Add subjects, grades, and credit hours for accurate results.",
    enabled: true,
    usageCount: BigInt(0)
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Convert marks to percentage in seconds. Enter your score and total marks to get your percentage and grade.",
    enabled: true,
    usageCount: BigInt(0)
  },
  {
    id: "pdf-tools",
    name: "PDF Tools",
    description: "Merge PDFs, convert images to PDF, and compress documents — all free, right in your browser.",
    enabled: true,
    usageCount: BigInt(0)
  },
  {
    id: "text-to-pdf",
    name: "Text to PDF",
    description: "Convert any text to a downloadable PDF document. Type or paste your content and export it instantly.",
    enabled: true,
    usageCount: BigInt(0)
  }
];
function mergeWithFallback(backendTools) {
  const byId = new Map(backendTools.map((t) => [t.id, t]));
  return STATIC_TOOLS.map((fallback) => byId.get(fallback.id) ?? fallback);
}
function HomePage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { data: tools, isLoading } = useQuery({
    queryKey: ["enabledTools"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEnabledTools();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 2
  });
  const { mutate: recordUsage } = useMutation({
    mutationFn: async (toolId) => {
      if (!actor) return;
      await actor.recordToolUsage(toolId);
    }
  });
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    const guestId = getGuestId();
    actor.trackGuestVisitor(guestId).catch(() => {
    });
  }, [actor, isFetching]);
  const handleOpenTool = reactExports.useCallback(
    (toolId, route) => {
      recordUsage(toolId);
      navigate({ to: route });
    },
    [recordUsage, navigate]
  );
  const rawList = tools ?? [];
  const toolList = isLoading || isFetching ? [] : mergeWithFallback(rawList);
  const showSkeleton = isLoading || isFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 md:px-6 py-6 max-w-4xl w-full mx-auto gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "flex flex-col gap-4 animate-fade-in",
        "aria-label": "Hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary", children: "Free Student Tools" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight", children: [
              "Smart Tools for",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
              " Smart Students"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md text-sm md:text-base leading-relaxed", children: "Fast, free tools for students — GPA calculator, percentage calculator, and PDF utilities. Sign in to access all your smart student tools." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 sm:flex-col sm:items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PwaInstallButton, {}) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "header" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Available Tools", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-lg text-foreground", children: "Dashboard" }),
        !showSkeleton && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
          toolList.length,
          " tool",
          toolList.length !== 1 ? "s" : ""
        ] })
      ] }),
      showSkeleton ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToolCardSkeleton, {}, `sk-${n}`)) }) : toolList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: toolList.slice(0, 4).map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToolCard,
          {
            tool,
            onOpen: handleOpenTool,
            index: i
          },
          tool.id
        )) }),
        toolList.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: toolList.slice(4, 8).map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolCard,
            {
              tool,
              onOpen: handleOpenTool,
              index: i + 4
            },
            tool.id
          )) })
        ] }),
        toolList.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { slot: "between-cards" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: toolList.slice(8).map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolCard,
            {
              tool,
              onOpen: handleOpenTool,
              index: i + 8
            },
            tool.id
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "rounded-xl bg-muted/40 border border-border px-6 py-5 flex flex-wrap gap-6 items-center justify-between animate-fade-in",
        "aria-label": "Platform highlights",
        children: [
          { label: "Free Tools", value: "4+" },
          { label: "No Sign-up", value: "✓" },
          { label: "Mobile Friendly", value: "✓" },
          { label: "Works Offline", value: "✓" }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold font-display text-primary", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: stat.label })
        ] }, stat.label))
      }
    )
  ] }) });
}
export {
  HomePage
};
