#!/usr/bin/env node
// Generates dist/env.json from environment variables injected at build time.
// When running on Caffeine cloud, CANISTER_ID_BACKEND and related vars are set.
// When running locally without them, values stay as "undefined" (the infra package handles this gracefully).

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

const env = {
  backend_canister_id: process.env.CANISTER_ID_BACKEND ?? "undefined",
  backend_host: process.env.DFX_NETWORK === "local"
    ? "http://127.0.0.1:4943"
    : process.env.BACKEND_HOST ?? "undefined",
  project_id: process.env.CAFFEINE_PROJECT_ID ?? process.env.PROJECT_ID ?? "undefined",
  ii_derivation_origin: process.env.II_DERIVATION_ORIGIN ?? "undefined",
};

mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, "env.json"), JSON.stringify(env, null, 2));

console.log("Generated dist/env.json:", JSON.stringify(env, null, 2));
