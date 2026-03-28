import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps } from "react";

export type TextareaProps = ComponentProps<"textarea"> & {
	error?: boolean;
};

const textAreaStyles = getVariants({
	base: "w-full rounded-md border border-border-input p-2 focus-visible:outline focus-visible:outline-primary-hover",
	variants: {
		error: {
			true: "border-error",
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
				"border-border-input disabled:cursor-not-allowed disabled:opacity-50",
		},
	],
});

export function Textarea({
	className,
	error,
	disabled,
	ref,
	...props
}: TextareaProps) {
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
}
