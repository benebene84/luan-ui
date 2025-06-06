import path from "node:path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-webpack5-compiler-swc",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
	webpackFinal: async (config) => {
		if (!config.module) {
			config.module = { rules: [] };
		}

		config.module.rules?.push({
			test: /\.css$/,
			exclude: /node_modules/,
			use: ["postcss-loader"],
		});

		// Add path aliases
		if (!config.resolve) {
			config.resolve = {};
		}
		if (!config.resolve.alias) {
			config.resolve.alias = {};
		}

		config.resolve.alias = {
			...config.resolve.alias,
			"@components": path.resolve(__dirname, "../src/components"),
			"@utilities": path.resolve(__dirname, "../src/utilities"),
		};

		return config;
	},
};

export default config;
