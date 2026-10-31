import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Keep every asset as a named file so the dark-mode icon selectors (src/styles/dark-icons.css) can match it.
  build: { assetsInlineLimit: 0 },
});
