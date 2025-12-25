import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@utilities/cn/cn";
import type { ComponentProps } from "react";

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root>;

function Avatar({ className, ref, ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white",
				className,
			)}
			{...props}
		/>
	);
}

export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;

function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn("absolute h-full w-full object-cover", className)}
			{...props}
		/>
	);
}

export type AvatarFallbackProps = ComponentProps<
	typeof AvatarPrimitive.Fallback
>;

function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full border border-white bg-gray-700 text-white",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarFallback, AvatarImage };
