import {
	PaginationItem,
	type PaginationItemProps,
} from "@components/pagination/pagination";
import {
	Children,
	type ReactElement,
	type ReactNode,
	isValidElement,
} from "react";

type TruncatedElementsOptions = {
	page: number;
	children: ReactNode;
};

export const getTruncatedElements = ({
	page,
	children,
}: TruncatedElementsOptions) => {
	const elements = Children.toArray(children);
	const paginationItems = elements.filter(
		(el): el is ReactElement<PaginationItemProps> =>
			isValidElement(el) && el.type === PaginationItem,
	);

	if (paginationItems.length <= 7) {
		return elements.map((element, index) => {
			if (isValidElement(element) && element.type === PaginationItem) {
				const pageNumber =
					elements
						.slice(0, index)
						.filter(
							(el): el is ReactElement<PaginationItemProps> =>
								isValidElement(el) && el.type === PaginationItem,
						).length + 1;
				const elementProps = element as ReactElement<PaginationItemProps>;
				return (
					<PaginationItem
						key={`pagination-item-${pageNumber}`}
						index={pageNumber}
					>
						{elementProps.props.children}
					</PaginationItem>
				);
			}
			return element;
		});
	}

	const result: ReactNode[] = [];
	let currentIndex = 0;

	// Add non-PaginationItem elements at the start
	while (currentIndex < elements.length) {
		const element = elements[currentIndex];
		if (
			!isValidElement(element) ||
			(isValidElement(element) && element.type !== PaginationItem)
		) {
			result.push(element);
			currentIndex++;
		} else {
			break;
		}
	}

	// Always show first 4 pages when in that range
	if (page <= 4) {
		// Show first 4 pages
		for (let i = 0; i < 4; i++) {
			const item = paginationItems[i];
			if (item) {
				result.push(
					<PaginationItem key={`pagination-item-${i + 1}`} index={i + 1}>
						{item.props.children}
					</PaginationItem>,
				);
			}
		}

		if (paginationItems.length > 4) {
			result.push(
				<span
					key="end-ellipsis"
					className="flex h-10 w-10 items-center justify-center text-gray-500"
				>
					...
				</span>,
			);
			// Show last page
			const lastItem = paginationItems[paginationItems.length - 1];
			if (lastItem) {
				result.push(
					<PaginationItem
						key={`pagination-item-${paginationItems.length}`}
						index={paginationItems.length}
					>
						{lastItem.props.children}
					</PaginationItem>,
				);
			}
		}
	}
	// Always show last 4 pages when in that range
	else if (page > paginationItems.length - 4) {
		// Show first page
		const firstItem = paginationItems[0];
		if (firstItem) {
			result.push(
				<PaginationItem key="pagination-item-1" index={1}>
					{firstItem.props.children}
				</PaginationItem>,
			);
		}
		result.push(
			<span
				key="start-ellipsis"
				className="flex h-10 w-10 items-center justify-center text-gray-500"
			>
				...
			</span>,
		);
		// Show last 4 pages
		for (let i = paginationItems.length - 4; i < paginationItems.length; i++) {
			const item = paginationItems[i];
			if (item) {
				result.push(
					<PaginationItem key={`pagination-item-${i + 1}`} index={i + 1}>
						{item.props.children}
					</PaginationItem>,
				);
			}
		}
	}
	// Show truncated view for middle pages
	else {
		// Show first page
		const firstItem = paginationItems[0];
		if (firstItem) {
			result.push(
				<PaginationItem key="pagination-item-1" index={1}>
					{firstItem.props.children}
				</PaginationItem>,
			);
		}

		result.push(
			<span
				key="start-ellipsis"
				className="flex h-10 w-10 items-center justify-center text-gray-500"
			>
				...
			</span>,
		);

		// Show 5 pages with current page in middle
		for (let i = page - 2; i <= page + 2; i++) {
			if (i > 1 && i < paginationItems.length) {
				const item = paginationItems[i - 1];
				if (item) {
					result.push(
						<PaginationItem key={`pagination-item-${i}`} index={i}>
							{item.props.children}
						</PaginationItem>,
					);
				}
			}
		}

		result.push(
			<span
				key="end-ellipsis"
				className="flex h-10 w-10 items-center justify-center text-gray-500"
			>
				...
			</span>,
		);

		const lastItem = paginationItems[paginationItems.length - 1];
		if (lastItem) {
			result.push(
				<PaginationItem
					key={`pagination-item-${paginationItems.length}`}
					index={paginationItems.length}
				>
					{lastItem.props.children}
				</PaginationItem>,
			);
		}
	}

	// Add remaining non-PaginationItem elements
	while (currentIndex < elements.length) {
		const element = elements[currentIndex];
		if (
			!isValidElement(element) ||
			(isValidElement(element) && element.type !== PaginationItem)
		) {
			result.push(element);
		}
		currentIndex++;
	}

	return result;
};
