import { getVariants } from "@utilities/responsive/responsive";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

export type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
	error?: boolean;
};

const textAreaStyles = getVariants({
	base: "w-full rounded-md border border-gray-300 p-2 focus-visible:outline focus-visible:outline-gray-800",
	variants: {
		error: {
			true: "border-red-600",
		},
		disabled: {
			true: "disabled:cursor-not-allowed disabled:opacity-50",
		},
	},
	compoundVariants: [
		{
			error: true,
			disabled: true,
			className:
				"border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
		},
	],
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, disabled, ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={textAreaStyles({
					className,
					error,
					disabled,
				})}
				disabled={disabled}
				{...props}
			/>
		);
	},
);

Textarea.displayName = "Textarea";
