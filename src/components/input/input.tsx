import { cn } from "@utilities/cn/cn";
import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					"rounded-sm border border-gray-400 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline focus-visible:outline-gray-800 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
