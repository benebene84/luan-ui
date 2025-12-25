import { FormHelper } from "@components/form-helper/form-helper";
import { Label } from "@components/label/label";
import { getVariants } from "@utilities/responsive/responsive";
import { Children, type ComponentProps, isValidElement, type Ref } from "react";
import { FormFieldProvider } from "./form-field-context";

export type FormFieldProps = ComponentProps<"div"> & {
	orientation?: "horizontal" | "vertical";
	disabled?: boolean;
	required?: boolean;
	error?: boolean;
	ref?: Ref<HTMLDivElement>;
};

const formFieldStyles = getVariants({
	base: "flex gap-2",
	variants: {
		orientation: {
			horizontal: "flex-row items-start",
			vertical: "flex-col",
		},
	},
});

/**
 * A component that displays a form field. Should be used as a parent of a Label, an input element and a FormHelper component.
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
export function FormField({
	className,
	children,
	orientation = "vertical",
	disabled,
	required,
	error,
	ref,
	...props
}: FormFieldProps) {
	const childElements = Children.toArray(children);
	const label = childElements.find(
		(child) => isValidElement(child) && child.type === Label,
	);
	const helperText = childElements.find(
		(child) => isValidElement(child) && child.type === FormHelper,
	);
	const input = childElements.find(
		(child) =>
			isValidElement(child) &&
			child.type !== Label &&
			child.type !== FormHelper,
	);

	if (!label || !input) {
		console.warn(
			"FormField requires both Label and Input components as children",
		);
		return null;
	}

	return (
		<FormFieldProvider
			value={{
				disabled,
				required,
				error,
			}}
		>
			<div
				ref={ref}
				className={formFieldStyles({ orientation, className })}
				{...props}
			>
				{orientation === "horizontal" ? (
					<>
						{input}
						<div className="flex flex-col">
							{label}
							{helperText}
						</div>
					</>
				) : (
					<>
						{label}
						{input}
						{helperText}
					</>
				)}
			</div>
		</FormFieldProvider>
	);
}
