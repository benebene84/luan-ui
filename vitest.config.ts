import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.ts",
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@utilities": path.resolve(__dirname, "./src/utilities"),
		},
	},
});
