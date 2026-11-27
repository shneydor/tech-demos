import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative base so the built demo works at /tech-demos/superpowers-walkthrough/.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
