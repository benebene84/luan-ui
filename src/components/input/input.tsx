import { useFormContext } from "@components/form-field/form-field-context";
import { cn } from "@utilities/cn/cn";
import { getVariants } from "@utilities/get-variants/get-variants";
import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	error?: boolean;
};

const inputStyles = getVariants({
	base: "rounded-sm border border-gray-400 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline focus-visible:outline-gray-800",
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

/**
 * A basic input component with styling.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" id="email" />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			disabled: initialDisabled,
			required: initialRequired,
			error: initialError,
			...props
		},
		ref,
	) => {
		const { disabled, required, error } = useFormContext({
			disabled: initialDisabled,
			required: initialRequired,
			error: initialError,
		});
		return (
			<input
				className={inputStyles({ disabled, error, className })}
				disabled={disabled}
				required={required}
				{...props}
				ref={ref}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
