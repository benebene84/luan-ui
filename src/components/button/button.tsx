import { cva } from "../../utilities/cva/cva";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
	size?: "small" | "medium" | "large";
};

export const buttonStyles = cva({
	base: "font-semibold border rounded",
	variants: {
		variant: {
			primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
			secondary: "bg-black text-white border-transparent hover:bg-gray-800",
		},
		size: {
			small: "text-sm px-2 py-1",
			medium: "text-base px-4 py-2",
			large: "text-lg px-6 py-3",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "medium",
	},
});

export const Button = ({
	children,
	variant = "primary",
	size = "medium",
	...props
}: ButtonProps) => {
	return (
		<button className={buttonStyles({ variant, size })} {...props}>
			{children}
		</button>
	);
};
