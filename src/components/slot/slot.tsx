import { composeRefs } from "@radix-ui/react-compose-refs";
import type { ComponentRef } from "react";
import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps {
	children?: React.ReactNode;
}

// biome-ignore lint/suspicious/noExplicitAny: <We don't know anything about the ref>
type AnyRef = ComponentRef<any>;
// biome-ignore lint/suspicious/noExplicitAny: <We don't know anything about the ref>
type AnyRefAttributes = React.RefAttributes<any>;

const Slot = React.forwardRef<AnyRef, SlotProps>((props, forwardedRef) => {
	const { children, ...slotProps } = props;

	if (isSlottable(children)) {
		const slottable = children;

		return (
			<SlotClone {...slotProps} ref={forwardedRef}>
				{React.isValidElement<React.PropsWithChildren<unknown>>(
					slottable.props.child,
				)
					? React.cloneElement(
							slottable.props.child,
							undefined,
							slottable.props.children(slottable.props.child.props.children),
						)
					: null}
			</SlotClone>
		);
	}

	return (
		<SlotClone {...slotProps} ref={forwardedRef}>
			{children}
		</SlotClone>
	);
});

Slot.displayName = "Slot";

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
	children: React.ReactNode;
}

const SlotClone = React.forwardRef<AnyRef, SlotCloneProps>(
	(props, forwardedRef) => {
		const { children, ...slotProps } = props;

		if (React.isValidElement<AnyRefAttributes>(children)) {
			return React.cloneElement(children, {
				...mergeProps(slotProps, children.props),
				ref: forwardedRef
					? composeRefs(forwardedRef, (children as AnyRefAttributes).ref)
					: (children as AnyRefAttributes).ref,
			});
		}

		return React.Children.count(children) > 1
			? React.Children.only(null)
			: null;
	},
);

SlotClone.displayName = "SlotClone";

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

type SlottableProps = {
	child: React.ReactNode;
	children: (child: React.ReactNode) => React.JSX.Element;
};

const Slottable = ({ child, children }: SlottableProps) => {
	return children(child);
};

/* ---------------------------------------------------------------------------------------------- */

// biome-ignore lint/suspicious/noExplicitAny: <We don't know anything about the props>
type AnyProps = Record<string, any>;

function isSlottable(
	child: React.ReactNode,
): child is React.ReactElement<SlottableProps> {
	return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
	// all child props should override
	const overrideProps = { ...childProps };

	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];

		const isHandler = /^on[A-Z]/.test(propName);
		if (isHandler) {
			// if the handler exists on both, we compose them
			if (slotPropValue && childPropValue) {
				overrideProps[propName] = (...args: unknown[]) => {
					childPropValue(...args);
					slotPropValue(...args);
				};
			}
			// but if it exists only on the slot, we use only this one
			else if (slotPropValue) {
				overrideProps[propName] = slotPropValue;
			}
		}
		// if it's `style`, we merge them
		else if (propName === "style") {
			overrideProps[propName] = { ...slotPropValue, ...childPropValue };
		} else if (propName === "className") {
			overrideProps[propName] = [slotPropValue, childPropValue]
				.filter(Boolean)
				.join(" ");
		}
	}

	return { ...slotProps, ...overrideProps };
}

const Root = Slot;

export { Root, Slot, Slottable };
export type { SlotProps };
