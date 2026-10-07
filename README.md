# luan-ui

Luan UI is built with Tailwind on top of Base UI Primitives. It includes Responsive values that can be defined based on breakpoints.

## Installation

Add the npm package with your favorite package manager

```bash
npm install luan-ui
yarn add luan-ui
pnpm add luan-ui
```

## Set-up

If you haven't already, you can install Tailwind v4 in your project by following the official [Tailwind v4 documentation](https://tailwindcss.com/docs/installation).

In your project, you have to import the custom config to enable animations and custom configuration that are needed for luan-ui to work properly.

```css
/* Import tailwind */
@import 'tailwindcss';

/* Import tailwind luan-ui configuration */
@import 'luan-ui/dist/styles/index.css';

```

Now you should be able to use the components in your project.

## MCP server

The package ships a local [MCP](https://modelcontextprotocol.io) server so coding agents can look up the installed version of Luan UI — not a generic component library, and not a stale copy of the docs.

After installing `luan-ui`, point Cursor at `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "luan-ui": {
      "command": "npx",
      "args": ["-y", "luan-mcp"]
    }
  }
}
```

Claude Code uses the same shape in `.mcp.json` at the repo root.

The server exposes two tools:

- `list_components` — discover what exists
- `get_component` — full docs for one component (import, props, variants, usage, examples)

Pass `"conventions"` to `get_component` for shared patterns such as responsive values, the `render` prop, form context, and portals.

Add a line to your agent rules so the tools actually get called: *Use the `luan-ui` MCP tools (`list_components`, `get_component`) before writing UI with Luan UI.*

## Documentation

Component docs are MDX pages in Storybook, next to each set of stories. Run `pnpm dev` and open a component’s **Docs** tab. Shared patterns live under **Conventions**.

## Theming

Luan UI ships with two built-in themes that are activated via a `data-theme` attribute:

- `data-theme="luan-light"`
- `data-theme="luan-dark"`

The library styles expose semantic tokens for surfaces, borders, text, and interactive states. Both themes also define a base background and foreground color, so applying the theme attribute to a top-level container gives you a matching page background and default text color as well.

```tsx
export function App() {
	return (
		<div data-theme="luan-dark">
			<Button>Dark theme button</Button>
		</div>
	);
}
```

If you want the whole application to follow one theme, apply the attribute at the document level:

```html
<html data-theme="luan-light">
	<body>
		<div id="root"></div>
	</body>
</html>
```

This is especially recommended for components that render in a portal, such as dialogs, popovers, selects, comboboxes, and other overlays, since they inherit the theme from the document instead of a local wrapper.

## Requirements

This library requires **React 19** or higher due to its use of the ref-as-prop pattern.
