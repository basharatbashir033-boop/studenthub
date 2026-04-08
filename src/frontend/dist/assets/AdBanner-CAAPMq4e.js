import { I as useAppStore, j as jsxRuntimeExports, f as cn } from "./index-aYQ7uVDH.js";
const slotStyles = {
  header: "w-full h-16 md:h-20",
  sidebar: "w-full min-h-[250px]",
  "between-cards": "w-full h-14 md:h-16"
};
const slotLabels = {
  header: "Header Banner (728×90)",
  sidebar: "Sidebar Ad (300×250)",
  "between-cards": "In-Content Ad (320×50)"
};
function AdBanner({ slot, className }) {
  const { adSettings } = useAppStore();
  const adCode = slot === "header" ? adSettings == null ? void 0 : adSettings.headerAdCode : slot === "sidebar" ? adSettings == null ? void 0 : adSettings.sidebarAdCode : adSettings == null ? void 0 : adSettings.betweenCardsAdCode;
  const isEnabled = slot === "header" ? adSettings == null ? void 0 : adSettings.headerAdEnabled : slot === "sidebar" ? adSettings == null ? void 0 : adSettings.sidebarAdEnabled : adSettings == null ? void 0 : adSettings.betweenCardsAdEnabled;
  if (!isEnabled || !adCode) return null;
  if (adCode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(slotStyles[slot], className),
        ref: (el) => {
          if (el && !el.hasChildNodes()) {
            const div = document.createElement("div");
            div.innerHTML = adCode;
            el.appendChild(div);
          }
        },
        "data-ocid": `ad-banner-${slot}`
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30",
        slotStyles[slot],
        className
      ),
      "data-ocid": `ad-banner-${slot}`,
      "aria-label": `Advertisement placeholder: ${slotLabels[slot]}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Advertisement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: slotLabels[slot] })
      ] })
    }
  );
}
export {
  AdBanner as A
};
