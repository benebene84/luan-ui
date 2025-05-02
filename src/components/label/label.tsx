import { cn } from "@utilities/cn/cn";
import { Label as RadixLabel } from "radix-ui";
import { forwardRef } from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * A label component that can be used to label form fields.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" />
 * ```
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			<RadixLabel.Root
				className={cn(
					"font-medium text-gray-900 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);

Label.displayName = RadixLabel.Root.displayName;

export { Label };
