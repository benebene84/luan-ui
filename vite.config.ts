import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@utilities": path.resolve(__dirname, "./src/utilities"),
		},
	},
});
