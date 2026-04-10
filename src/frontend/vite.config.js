import { fileURLToPath, URL } from "url";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

/**
 * Custom plugin: writes env.json with real canister IDs from build-time env vars.
 * The copy:env script copies env.json → dist/env.json after the build.
 * By updating the source env.json here (buildStart), the copy picks up real values.
 * On local dev (no env vars), values remain "undefined" and the infra package handles it.
 */
function generateEnvPlugin() {
  return {
    name: "generate-env-json",
    buildStart() {
      const canisterId = process.env.CANISTER_ID_BACKEND;
      const backendHost =
        process.env.DFX_NETWORK === "local"
          ? "http://127.0.0.1:4943"
          : process.env.BACKEND_HOST ?? "undefined";
      const projectId =
        process.env.CAFFEINE_PROJECT_ID ?? process.env.PROJECT_ID ?? "undefined";
      const iiDerivationOrigin =
        process.env.II_DERIVATION_ORIGIN ?? "undefined";

      const env = {
        backend_canister_id: canisterId ?? "undefined",
        backend_host: backendHost,
        project_id: projectId,
        ii_derivation_origin: iiDerivationOrigin,
      };

      writeFileSync(
        resolve(__dirname, "env.json"),
        JSON.stringify(env, null, 2),
      );

      if (canisterId) {
        console.log(
          `[generate-env] Wrote env.json with backend_canister_id=${canisterId}`,
        );
      } else {
        console.log(
          "[generate-env] CANISTER_ID_BACKEND not set — env.json will use 'undefined' (infra fallback handles this)",
        );
      }
    },
  };
}

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    generateEnvPlugin(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
});
