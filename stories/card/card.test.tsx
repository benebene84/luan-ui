import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "../../src/components/card/card";

describe("Card", () => {
	it("throws error when Card subcomponents are used outside Card context", () => {
		expect(() =>
			render(
				<CardHeader>
					<h3>Test Header</h3>
				</CardHeader>,
			),
		).toThrow("Card components must be used within a Card");

		expect(() => render(<CardContent>Test Content</CardContent>)).toThrow(
			"Card components must be used within a Card",
		);

		expect(() => render(<CardFooter>Test Footer</CardFooter>)).toThrow(
			"Card components must be used within a Card",
		);
	});

	it("allows rendering Card and its components as custom elements via render prop", () => {
		render(
			<Card render={<article />}>
				<CardHeader render={<header />}>
					<h1>Custom Header</h1>
				</CardHeader>
				<CardContent render={<main />}>Content</CardContent>
				<CardFooter render={<footer />}>Footer</CardFooter>
			</Card>,
		);

		expect(screen.getByRole("article")).toBeInTheDocument();
		expect(screen.getByRole("banner")).toBeInTheDocument(); // header element
		expect(screen.getByRole("main")).toBeInTheDocument();
		expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // footer element
	});

	it("propagates size context from Card to all subcomponents", () => {
		render(
			<Card size="large">
				<CardHeader>Header</CardHeader>
				<CardContent>Content</CardContent>
				<CardFooter>Footer</CardFooter>
			</Card>,
		);

		const header = screen.getByText("Header").closest("div");
		const content = screen.getByText("Content").closest("div");
		const footer = screen.getByText("Footer").closest("div");

		// Check large size classes on each component
		expect(header).toHaveClass("px-6", "pb-6");
		expect(content).toHaveClass("gap-6", "px-6");
		expect(footer).toHaveClass("px-6", "pt-6");
	});
});
