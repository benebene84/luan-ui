const colorMap = {
	green: "32",
	blue: "34",
	red: "31",
	yellow: "33",
	magenta: "35",
	cyan: "36",
	white: "37",
} as const;

export const color = (message: string, colorName: keyof typeof colorMap) => {
	return `\x1b[${colorMap[colorName]}m${message}\x1b[0m`;
};
