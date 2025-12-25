import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@utilities/cn/cn";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const Avatar = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Root>,
	AvatarProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white",
			className,
		)}
		{...props}
	/>
));

Avatar.displayName = "Avatar";

export type AvatarImageProps = ComponentPropsWithoutRef<
	typeof AvatarPrimitive.Image
>;

const AvatarImage = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Image>,
	AvatarImageProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("absolute h-full w-full object-cover", className)}
		{...props}
	/>
));

AvatarImage.displayName = "AvatarImage";

export type AvatarFallbackProps = ComponentPropsWithoutRef<
	typeof AvatarPrimitive.Fallback
>;

const AvatarFallback = forwardRef<
	ComponentRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full border border-white bg-gray-700 text-white",
			className,
		)}
		{...props}
	/>
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage };
