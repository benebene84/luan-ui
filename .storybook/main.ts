import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-webpack5-compiler-swc",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
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

		return config;
	},
};

export default config;
