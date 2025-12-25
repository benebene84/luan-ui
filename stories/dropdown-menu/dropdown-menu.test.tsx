import { composeStories } from "@storybook/react-vite";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as stories from "./dropdown-menu.stories";

const { Default, WithCheckboxItems } = composeStories(stories);

describe("DropdownMenu", () => {
	describe("Default Menu", () => {
		it("should open and close the menu when clicking the trigger", async () => {
			const user = userEvent.setup();
			render(<Default />);

			// Menu should be closed initially
			expect(screen.queryByText("Profile")).not.toBeInTheDocument();

			// Open menu
			await user.click(screen.getByRole("button", { name: "Open Menu" }));

			// Wait for menu to open
			const profile = await screen.findByRole("menuitem", {
				name: "Profile⇧⌘P",
			});
			const settings = screen.getByRole("menuitem", { name: "Settings⌘S" });
			expect(profile).toBeInTheDocument();
			expect(settings).toBeInTheDocument();

			// Close menu by pressing Escape
			await user.keyboard("{Escape}");
			await waitFor(() => {
				expect(
					screen.queryByRole("menuitem", { name: "Profile⇧⌘P" }),
				).not.toBeInTheDocument();
				expect(
					screen.queryByRole("menuitem", { name: "Settings⌘S" }),
				).not.toBeInTheDocument();
			});
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();
			render(<Default />);

			// Open menu
			await user.click(screen.getByRole("button", { name: "Open Menu" }));

			// Wait for menu to open
			await screen.findByRole("menuitem", { name: "Profile⇧⌘P" });

			await user.keyboard("{ArrowDown}");

			// Focus first item
			const profile = screen.getByRole("menuitem", { name: "Profile⇧⌘P" });
			expect(profile).toHaveAttribute("data-highlighted");

			// Navigate to second item
			await user.keyboard("{ArrowDown}");
			const settings = screen.getByRole("menuitem", { name: "Settings⌘S" });
			expect(settings).toHaveAttribute("data-highlighted");

			// Navigate back to first item
			await user.keyboard("{ArrowUp}");
			expect(profile).toHaveAttribute("data-highlighted");
		});
	});

	describe("Checkbox Menu", () => {
		it("should toggle checkbox items", async () => {
			const user = userEvent.setup();
			render(<WithCheckboxItems />);

			// Open menu
			const menuButton = screen.getByRole("button", { name: "View Options" });
			await user.click(menuButton);

			// Wait for menu to open
			const showToolbar = await screen.findByRole("menuitemcheckbox", {
				name: /Show Toolbar/,
			});

			// Initial state - toolbar is checked
			expect(showToolbar).toHaveAttribute("data-checked");

			// Click to uncheck - menu stays open in Base UI
			await user.click(showToolbar);

			// Verify it's now unchecked (menu is still open)
			expect(showToolbar).toHaveAttribute("data-unchecked");

			// Click another checkbox item
			const showStatusbar = screen.getByRole("menuitemcheckbox", {
				name: /Show Statusbar/,
			});

			expect(showStatusbar).toHaveAttribute("data-unchecked");
			await user.click(showStatusbar);

			// Verify it's now checked
			expect(showStatusbar).toHaveAttribute("data-checked");
		});
	});
});
