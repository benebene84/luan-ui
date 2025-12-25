import { useFormContext } from "@components/form-field/form-field-context";
import { getVariants } from "@utilities/responsive/responsive";
import type { ComponentProps, Ref } from "react";

export type FormHelperProps = ComponentProps<"div"> & {
	error?: boolean;
	disabled?: boolean;
	ref?: Ref<HTMLDivElement>;
};

const formHelperStyles = getVariants({
	base: "text-gray-500 text-sm",
	variants: {
		error: {
			true: "text-red-600",
		},
		disabled: {
			true: "text-gray-300",
		},
	},
	compoundVariants: [
		{
			error: true,
			disabled: true,
			className: "text-gray-300",
		},
	],
});

/**
 * A component that displays a helper text for a form field. Should be used as a child of a FormField component and will inherit the form field's error and disabled state.
 *
 * @example
 * ```tsx
 * <FormField>
 *  <Label>Email</Label>
 *  <Input />
 *  <FormHelper>This is a helper text</FormHelper>
 * </FormField>
 * ```
 */
export function FormHelper({
	className,
	children,
	error: initialError,
	disabled: initialDisabled,
	ref,
	...props
}: FormHelperProps) {
	const { error, disabled } = useFormContext({
		error: initialError,
		disabled: initialDisabled,
	});

	return (
		<div
			ref={ref}
			className={formHelperStyles({ error, disabled, className })}
			role={error ? "alert" : "status"}
			{...props}
		>
			{children}
		</div>
	);
}
