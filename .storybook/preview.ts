import type { Preview } from "@storybook/react-vite";
import { createElement, type CSSProperties } from "react";
import "./styles/index.css";

const previewWrapperStyles = {
	backgroundColor: "var(--color-background)",
	color: "var(--color-foreground)",
	minHeight: "100vh",
	width: "100%",
} satisfies CSSProperties;

const preview = {
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Preview the component library in light or dark mode.",
			toolbar: {
				icon: "mirror",
				dynamicTitle: true,
				items: [
					{ value: "luan-light", title: "Light" },
					{ value: "luan-dark", title: "Dark" },
				],
			},
		},
	},
	initialGlobals: {
		theme: "luan-light",
	},
	decorators: [
		(Story, context) => {
			const theme =
				context.globals.theme === "luan-dark" ? "luan-dark" : "luan-light";

			document.documentElement.dataset.theme = theme;
			document.body.dataset.theme = theme;

			return createElement(
				"div",
				{
					"data-theme": theme,
					style: previewWrapperStyles,
				},
				createElement(Story),
			);
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
} satisfies Preview;

export default preview;
