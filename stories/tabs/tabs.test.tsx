import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as stories from "./tabs.stories";

const { Default } = composeStories(stories);

describe("Tabs", () => {
	it("should render all tabs", () => {
		render(<Default />);

		expect(screen.getByRole("tab", { name: "Account" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Password" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
	});

	it("should switch between tabs when clicked", async () => {
		const user = userEvent.setup();
		render(<Default />);

		const accountTab = screen.getByRole("tab", { name: "Account" });
		const passwordTab = screen.getByRole("tab", { name: "Password" });

		expect(accountTab).toHaveAttribute("data-active");
		expect(passwordTab).not.toHaveAttribute("data-active");

		await user.click(passwordTab);

		expect(accountTab).not.toHaveAttribute("data-active");
		expect(passwordTab).toHaveAttribute("data-active");
	});

	it("should show correct content for selected tab", async () => {
		const user = userEvent.setup();
		render(<Default />);

		const accountContent = screen.getByText("Account settings content");

		expect(accountContent).toBeVisible();

		await user.click(screen.getByRole("tab", { name: "Password" }));
		const passwordContent = screen.queryByText("Password settings content");
		expect(accountContent).not.toBeVisible();
		expect(passwordContent).toBeVisible();
	});

	it("should not allow disabled tabs to be clicked", async () => {
		const user = userEvent.setup();
		render(<Default />);

		const disabledTab = screen.getByRole("tab", { name: "Disabled" });
		expect(disabledTab).toHaveAttribute("aria-disabled", "true");

		await user.click(disabledTab);

		const accountContent = screen.getByText("Account settings content");
		expect(accountContent).toBeVisible();

		expect(disabledTab).not.toHaveAttribute("data-active");
	});
});
