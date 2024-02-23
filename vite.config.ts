import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import fs from "vite-plugin-fs";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), svgr(), fs()],
});
