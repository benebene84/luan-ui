import { Children, type ComponentProps, type Ref } from "react";

export type AvatarGroupProps = ComponentProps<"div"> & {
	maxAvatars?: number;
	ref?: Ref<HTMLDivElement>;
};

function AvatarGroup({
	children,
	maxAvatars = 3,
	ref,
	...props
}: AvatarGroupProps) {
	const elements = Children.toArray(children);

	const avatars = elements.slice(0, maxAvatars).reverse();

	return (
		<div
			className="group flex w-fit flex-row-reverse items-center [&>*]:-mr-4 [&>*]:transition-all [&>*]:duration-500 [&>*]:ease-in-out hover:[&>*]:-mr-1"
			{...props}
			ref={ref}
		>
			{elements.length > maxAvatars && (
				<span className="mr-0 ml-2 hidden text-gray-500 text-sm group-hover:block">
					+{elements.length - maxAvatars}
				</span>
			)}
			{avatars}
		</div>
	);
}

export { AvatarGroup };
