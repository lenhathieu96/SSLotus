import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { run } from "vite-plugin-run";
import svgr from "vite-plugin-svgr";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  plugins: [
    react(),
    tsConfigPaths(),
    svgr(),
    run({
      name: "svg-transform",
      run: ["npm", "run", "gen-svgs"],
      condition: (file) => file.includes("/src/assets/svgs/"),
    }),
  ],
});
