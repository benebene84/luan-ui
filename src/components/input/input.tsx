import { useFormContext } from "@components/form-field/form-field-context";
import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps, Ref } from "react";

export type InputProps = ComponentProps<"input"> & {
	error?: boolean;
	ref?: Ref<HTMLInputElement>;
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
function Input({
	className,
	disabled: initialDisabled,
	required: initialRequired,
	error: initialError,
	ref,
	...props
}: InputProps) {
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
			aria-invalid={error}
			{...props}
			ref={ref}
		/>
	);
}

export { Input };
