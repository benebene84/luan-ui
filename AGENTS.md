# AGENTS.md — luan-ui

React component library built on Base UI primitives with Tailwind CSS v4.

## Build & Development Commands

```bash
pnpm install          # Install dependencies (pnpm 10.26.2, Node v22.14.0)
pnpm build            # Build library (tsc + tsc-alias, outputs to dist/)
pnpm dev              # Start Storybook dev server on port 6006
pnpm build-storybook  # Build static Storybook site
```

## Lint & Format Commands

Biome is the sole linter and formatter (no ESLint, no Prettier).

```bash
pnpm check            # Run all Biome checks (lint + format) — also runs on pre-commit via Lefthook
pnpm lint             # Lint only
pnpm format           # Format (write mode)
pnpm fix              # Auto-fix lint + format issues
pnpm fix:unsafe       # Auto-fix including unsafe transformations
```

## Test Commands

Tests use Vitest 4 with Testing Library and jsdom. Tests live in `stories/` alongside Storybook stories.

```bash
pnpm test             # Run all tests in watch mode
pnpm test:ci          # Run all tests once (CI mode, --run)
pnpm test -- --run stories/button/button.test.tsx        # Run a single test file
pnpm test -- --run --testNamePattern "toggles checkbox"  # Run tests matching a name pattern
```

## CI Pipeline

On push/PR to `main`: `pnpm check` -> `pnpm test` -> `pnpm build`. All three must pass.

## Project Structure

```
src/
  index.ts                    # Public API — all exports go here
  components/                 # Component source (29 components)
    button/button.tsx          # Example: one file per component
    form-field/form-field-context.tsx  # Context providers alongside components
  styles/index.css             # Tailwind CSS v4 config (theme, keyframes)
  utilities/                   # Shared utilities (cn, merge-refs, pagination, responsive)
stories/
  button/
    button.stories.tsx         # Storybook stories
    button.test.tsx            # Tests (co-located with stories, NOT in src/)
scripts/                       # Build scripts (build.ts, color.ts, copy-build-assets.ts)
```

## Code Style Guidelines

### Formatting

- **Indentation:** Tabs (not spaces)
- **Quotes:** Double quotes for strings
- **Semicolons:** Yes (Biome default)
- **Trailing commas:** Yes (Biome default)
- **Tailwind classes:** Must be sorted — enforced by Biome `useSortedClasses` rule (error level)

### Imports

- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled):
  ```ts
  import type { ComponentProps } from "react";
  ```
- Use path aliases, not relative paths from `src/`:
  ```ts
  import { cn } from "@utilities/cn/cn";
  import { Button } from "@components/button/button";
  ```
- Available aliases: `@components/*` -> `src/components/*`, `@utilities/*` -> `src/utilities/*`
- Import order is auto-organized by Biome — do not manually reorder

### TypeScript

- Strict mode enabled with `noUncheckedIndexedAccess` and `noImplicitOverride`
- Export types alongside values from component files
- Type props with `ComponentProps<"element">` from React or `useRender.ComponentProps<"element">` from Base UI
- Name prop types as `ComponentNameProps` (e.g., `ButtonProps`, `InputProps`)
- No inferrable type annotations (Biome rule: `noInferrableTypes`)

### Component Patterns

- **Function declarations** (not arrow functions) for components:
  ```tsx
  export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  ```
  or
  ```tsx
  function Input({ className, ref, ...props }: InputProps) {
  ```
- **Named exports** — no default exports for components
- **`ref` as a prop** (React 19 style) — do not use `forwardRef`
- Set `displayName` on components that use `useRender` (polymorphic rendering)
- Use JSDoc comments above component functions to describe the component
- Spread remaining props onto the root element: `{...props}`
- Destructure props with defaults in the function signature

### Styling

- Tailwind CSS v4 with `@tailwindcss/vite` plugin (CSS-based config, no JS config file)
- Use `getVariants()` from `@utilities/responsive/responsive` for variant-based styling:
  ```ts
  const buttonStyles = getVariants({
    base: "flex w-fit cursor-pointer ...",
    variants: {
      variant: { primary: "...", secondary: "..." },
      size: { small: "...", medium: "...", large: "..." },
    },
  });
  ```
- Use `cn()` from `@utilities/cn/cn` for merging conditional class names (wraps `clsx` + `tailwind-merge`)
- Accept `className` prop and merge it into the variant output
- Tailwind class names in `clsx` and `getVariants` calls are sorted by the Biome linter

### Naming Conventions

- **Files:** Kebab-case (`form-field.tsx`, `alert-dialog.tsx`)
- **Components:** PascalCase (`Button`, `AlertDialog`, `FormField`)
- **Props types:** PascalCase with `Props` suffix (`ButtonProps`, `DialogContentProps`)
- **Variant configs:** camelCase (`buttonStyles`, `inputStyles`)
- **Utilities:** camelCase functions (`cn`, `getVariants`, `mapResponsiveValue`)
- **Constants:** UPPER_SNAKE_CASE (`SIZES`)
- **Directories:** Kebab-case matching component name (`dropdown-menu/`, `form-field/`)

### Error Handling

- No try/catch in component code — components are pure UI
- Build scripts use try/catch with `process.exit(1)` on failure

### Exports

- All public components and types must be re-exported from `src/index.ts`
- Separate `export type` and `export` statements in index.ts (required by `verbatimModuleSyntax`)
- Group related exports together (e.g., all Dialog-related exports in one block)

### Testing

- Test files go in `stories/<component-name>/<component-name>.test.tsx`
- Tests use Storybook's `composeStories` pattern — render via `await Story.run()`, not `render(<Component />)`
- Override story args in tests: `await Default.run({ args: { disabled: true } })`
- Import from vitest explicitly: `import { describe, expect, it } from "vitest"`
- Use `@testing-library/react` for queries (`screen.getByRole`, etc.)
- Use `@testing-library/user-event` for interactions (`userEvent.setup()`, `user.click()`)
- Prefer accessible queries (`getByRole`, `getByLabelText`) over test IDs

### Dependencies

- **UI primitives:** `@base-ui/react` (headless components from the Base UI library)
- **Icons:** `@radix-ui/react-icons`
- **Class utilities:** `clsx`, `tailwind-merge`, `responsive-class-variants`
- **Toasts:** `sonner`
- **Peer deps:** React 19, ReactDOM 19

### Pre-commit Hook

Lefthook runs `pnpm check` on every commit. Ensure all Biome checks pass before committing.
