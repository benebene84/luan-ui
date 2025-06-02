# luan-ui

Luan UI is built with Tailwind on top of Radix UI Primitives. It includes Responsive values that can be defined based on breakpoints.

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

## Philosophy

While I strive for some standardisation and enforcement of best practices, it is equally important that all components remain flexible and that they easily adapt to changing requirements among consumers. Having common design requirements shouldn't limit consumers in their way how they use the components.

Therefore all the components pass on their standard HTML props. You can use and overwrite all props like id, event handlers and so on. Also all components forward their ref, hence they can be targeted by other libraries or with settings refs yourself.

Radix Ui is used as a headless UI library. Using a headless ui library gives you the advantage to have full control over the styling, while the "heavy-lifting" - especially in regards to accessibility - is done for you already. Because handling focus, setting the appropriate aria attributes and similar things are a difficult task to do right.

All of the components are built with composability and extensibility in mind.
