import { composeStories } from "@storybook/react-vite";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
			const profile = screen.getByRole("menuitem", { name: "Profile ⇧⌘P" });
			const settings = screen.getByRole("menuitem", { name: "Settings ⌘S" });
			expect(profile).toBeInTheDocument();
			expect(settings).toBeInTheDocument();

			// Close menu by clicking outside
			await user.keyboard("{Escape}");
			await waitFor(() => {
				expect(profile).not.toBeInTheDocument();
				expect(settings).not.toBeInTheDocument();
			});
		});

		it("should handle keyboard navigation", async () => {
			const user = userEvent.setup();
			render(<Default />);

			// Open menu
			await user.click(screen.getByRole("button", { name: "Open Menu" }));
			await user.keyboard("{ArrowDown}");

			// Focus first item
			const profile = screen.getByRole("menuitem", { name: "Profile ⇧⌘P" });
			expect(profile).toHaveFocus();

			// Navigate to second item
			await user.keyboard("{ArrowDown}");
			const settings = screen.getByRole("menuitem", { name: "Settings ⌘S" });
			expect(settings).toHaveFocus();

			// Navigate back to first item
			await user.keyboard("{ArrowUp}");
			expect(profile).toHaveFocus();
		});
	});

	describe("Checkbox Menu", () => {
		it("should toggle checkbox items", async () => {
			const user = userEvent.setup();
			render(<WithCheckboxItems />);

			// Open menu
			const menuButton = screen.getByRole("button", { name: "View Options" });
			await user.click(menuButton);

			// Click checkbox item

			const showToolbar = screen.getByRole("menuitemcheckbox", {
				name: /Show Toolbar/,
			});

			expect(showToolbar).toHaveAttribute("data-state", "checked");
			await user.click(showToolbar);
			await user.click(menuButton);

			expect(showToolbar).toHaveAttribute("data-state", "unchecked");

			// Click another checkbox item
			const showStatusbar = screen.getByRole("menuitemcheckbox", {
				name: /Show Statusbar/,
			});

			expect(showStatusbar).toHaveAttribute("data-state", "unchecked");
			await user.click(showStatusbar);

			await user.click(menuButton);

			expect(showStatusbar).toHaveAttribute("data-state", "checked");
		});
	});
});
