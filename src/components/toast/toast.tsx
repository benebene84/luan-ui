import type { Ref } from "react";
import {
	Toaster as SonnerToaster,
	toast as sonnerToast,
	type ToasterProps,
} from "sonner";
import { Button } from "../button/button";

export type ToastProps = {
	id: string | number;
	title: string;
	description: string;
	button: {
		label: string;
		onClick: () => void;
	};
	ref?: Ref<HTMLDivElement>;
} & Omit<ToasterProps, "id">;

/**
 * Creates a custom toast notification using the sonner toast library
 * @param toast - The toast configuration object without an ID
 * @param toast.title - The title text to display in the toast
 * @param toast.description - The description text to display in the toast
 * @param toast.button - Configuration for the toast's action button
 * @param toast.button.label - The text label for the action button
 * @param toast.button.onClick - Click handler function for the action button
 * @returns A unique identifier for the created toast
 */
function toast(toast: Omit<ToastProps, "id">) {
	const { title, description, button, ...toastOptions } = toast;
	return sonnerToast.custom((id) => (
		<Toast
			id={id}
			title={title}
			description={description}
			button={{
				label: button.label,
				onClick: button.onClick,
			}}
			{...toastOptions}
		/>
	));
}

const Toaster = SonnerToaster;

/** A fully custom toast built on top of sonner. */
function Toast({ title, description, button, id, ref }: ToastProps) {
	return (
		<div
			className="flex w-full items-center gap-4 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 md:max-w-96"
			ref={ref}
		>
			<div className="flex flex-1 items-center">
				<div className="w-full gap-1">
					<p className="font-medium text-gray-900 text-sm">{title}</p>
					<p className="text-gray-500 text-sm">{description}</p>
				</div>
			</div>
			<div className="shrink-0 rounded-md font-medium text-sm">
				<Button
					size="small"
					type="button"
					variant="secondary"
					onClick={() => {
						button.onClick();
						sonnerToast.dismiss(id);
					}}
				>
					{button.label}
				</Button>
			</div>
		</div>
	);
}

export { toast, Toast, Toaster };
