import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative base so the built demo works at /tech-demos/matt-pocock-skills-atlas/.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
