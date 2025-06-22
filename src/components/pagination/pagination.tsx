import { Slot } from "@components/slot/slot";
import { cn } from "@utilities/cn/cn";
import { mergeRefs } from "@utilities/merge-refs/merge-refs";
import { getTruncatedElements } from "@utilities/pagination/get-truncated-elements";
import { handleKeyboardNavigation } from "@utilities/pagination/keyboard-navigation";
import clsx from "clsx";
import {
	createContext,
	forwardRef,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

/**
 * Pagination Context
 */

type PaginationContextValue = {
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	setPage: (page: number) => void;
	registerRef: (index: number, element: HTMLButtonElement | null) => void;
};

const PaginationContext = createContext<PaginationContextValue | undefined>(
	undefined,
);

const usePaginationContext = () => {
	const context = useContext(PaginationContext);
	if (!context) {
		throw new Error("Pagination components must be used within a Pagination");
	}
	return context;
};

/**
 * Pagination
 */

export type PaginationProps = {
	children?: React.ReactNode;
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Pagination component that provides navigation controls for a set of pages.
 *
 * @param {number} props.page - The current active page number
 * @param {number} props.totalPages - The total number of pages
 * @param {(page: number) => void} props.onPageChange - Callback function called when page changes
 * @param {boolean} [props.asChild] - Whether to render the root element as a child component
 * @param {React.ReactNode} [props.children] - The content to render within the pagination component
 * @param {string} [props.className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <Pagination page={1} totalPages={10} onPageChange={(page) => console.log(page)}>
 *   <PaginationPrev>Previous</PaginationPrev>
 *   <PaginationItem index={1}>1</PaginationItem>
 *   <PaginationItem index={2}>2</PaginationItem>
 *   <PaginationNext>Next</PaginationNext>
 * </Pagination>
 * ```
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(
	(
		{
			children,
			page: initialPage,
			totalPages: initialTotalPages,
			onPageChange,
			className,
			asChild,
			...props
		},
		ref,
	) => {
		const [page, setPage] = useState(initialPage);
		const [totalPages, setTotalPages] = useState(initialTotalPages);
		const [hasNextPage, setHasNextPage] = useState(page < totalPages);
		const [hasPreviousPage, setHasPreviousPage] = useState(page > 1);

		const refs = useRef(new Map<number, HTMLButtonElement>());

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) =>
				handleKeyboardNavigation(e, { current: refs.current }, totalPages),
			[totalPages],
		);

		const registerRefWrapper = useCallback(
			(index: number, element: HTMLButtonElement | null) => {
				if (element) {
					refs.current.set(index, element);
				} else {
					refs.current.delete(index);
				}
			},
			[],
		);

		useEffect(() => {
			document.addEventListener("keydown", handleKeyDown);
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
			};
		}, [handleKeyDown]);

		useEffect(() => {
			setHasNextPage(page < totalPages);
			setHasPreviousPage(page > 1);
		}, [page, totalPages]);

		useEffect(() => {
			setPage(initialPage);
			setTotalPages(initialTotalPages);
		}, [initialPage, initialTotalPages]);

		useEffect(() => {
			if (onPageChange) {
				onPageChange(page);
			}
		}, [page, onPageChange]);

		const memoContextValue = useMemo(
			() => ({
				page,
				setPage,
				totalPages,
				hasNextPage,
				hasPreviousPage,
				registerRef: registerRefWrapper,
			}),
			[page, totalPages, hasNextPage, hasPreviousPage, registerRefWrapper],
		);

		const Component = asChild ? Slot : "nav";

		return (
			<Component
				aria-label="Pagination"
				className={clsx("flex items-center gap-1", className)}
				{...props}
				ref={ref}
			>
				<PaginationContext.Provider value={memoContextValue}>
					{getTruncatedElements({ page, children })}
				</PaginationContext.Provider>
			</Component>
		);
	},
);

/**
 * Pagination Item
 */

export type PaginationItemProps = {
	children?: React.ReactNode;
	index?: number;
} & React.HTMLAttributes<HTMLButtonElement>;

/**
 * Individual page item within the Pagination component.
 *
 * @example
 * ```tsx
 * <PaginationItem index={1}>1</PaginationItem>
 */
const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
	({ index, children, className, ...props }, ref) => {
		const { registerRef, page, setPage } = usePaginationContext();

		const isActive = page === index;
		const handleClick = () => {
			if (index !== undefined) {
				setPage(index);
			}
		};

		return (
			<button
				type="button"
				onClick={handleClick}
				ref={mergeRefs(ref, (el) => registerRef(index ?? 0, el))}
				className={cn(
					"flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200",
					{
						"bg-gray-700 text-white hover:bg-gray-800": isActive,
					},
					className,
				)}
				aria-current={isActive ? "page" : undefined}
				{...props}
			>
				{children ?? index}
			</button>
		);
	},
);

/**
 * Pagination Prev
 */

/**
 * Previous page button component for the Pagination.
 * Automatically disabled when on the first page.
 *
 * @example
 * ```tsx
 * <PaginationPrev>Previous</PaginationPrev>
 * ```
 */
const PaginationPrev = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
>(({ children, className, ...props }, ref) => {
	const { registerRef, page, setPage, hasPreviousPage } =
		usePaginationContext();

	return (
		<button
			type="button"
			onClick={() => setPage(page - 1)}
			ref={mergeRefs(ref, (el) => registerRef(0, el))}
			disabled={!hasPreviousPage}
			className={cn(
				"flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-25",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
});

/**
 * Pagination Next
 */

/**
 * Next page button component for the Pagination.
 * Automatically disabled when on the last page.
 *
 * @example
 * ```tsx
 * <PaginationNext>Next</PaginationNext>
 * ```
 */
const PaginationNext = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
>(({ children, className, ...props }, ref) => {
	const { page, setPage, hasNextPage, registerRef, totalPages } =
		usePaginationContext();
	return (
		<button
			type="button"
			className={cn(
				"flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 disabled:opacity-25",
				className,
			)}
			onClick={() => setPage(page + 1)}
			disabled={!hasNextPage}
			ref={mergeRefs(ref, (el) => registerRef(totalPages + 1, el))}
			{...props}
		>
			{children}
		</button>
	);
});

export { Pagination, PaginationItem, PaginationPrev, PaginationNext };
