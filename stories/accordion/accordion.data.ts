export const accordionContents = {
	single: [
		{
			value: "item-1",
			trigger: "Is it accessible?",
			content: "Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			value: "item-2",
			trigger: "Is it styled?",
			content:
				"Yes. It comes with default styles that match the other components.",
		},
		{
			value: "item-3",
			trigger: "Is it animated?",
			content: "Yes. It uses CSS animations for smooth transitions.",
		},
	],
	multiple: [
		{
			value: "item-1",
			trigger: "Can I open multiple items?",
			content:
				"Yes! This accordion allows multiple items to be open at the same time.",
		},
		{
			value: "item-2",
			trigger: "Is it customizable?",
			content:
				"Yes. You can customize the styles and behavior to fit your needs.",
		},
	],
} as const;
