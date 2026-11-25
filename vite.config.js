import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this project at /se_project_final/.
const repositoryBase = "/se_project_final/";

function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    apply: "build",
    closeBundle() {
      const dist = resolve("dist");
      copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? repositoryBase : "/",
  plugins: [react(), copyIndexTo404()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
}));
