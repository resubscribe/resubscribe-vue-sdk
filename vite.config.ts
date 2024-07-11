import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ResubscribeVueSdk",
      fileName: (format) => `resubscribe-vue-sdk.${format}.js`,
      formats: ["es", "umd"], // Add formats for better compatibility
    },
    rollupOptions: {
      external: ["vue", "color"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});