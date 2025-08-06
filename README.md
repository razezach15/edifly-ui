# Edifly UI

A modern React UI component library inspired by Ant Design, built with TypeScript and designed for flexibility and ease of use.

## Features

- 🎨 **Modern Design**: Clean and professional components with thoughtful spacing and typography
- 🔧 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- 🎭 **Theming**: CSS variables-based theming system with light and dark mode support
- 📱 **Responsive**: Mobile-first responsive design
- 🧩 **Modular**: Import only what you need for optimal bundle size
- 📚 **Storybook**: Interactive component documentation and playground
- ♿ **Accessible**: Built with accessibility best practices

## Installation

```bash
npm install edifly-ui
# or
yarn add edifly-ui
```

## Quick Start

```tsx
import { Button, Input, Card } from 'edifly-ui';

function App() {
  return (
    <Card title="Welcome to Edifly UI">
      <Input placeholder="Enter your name" />
      <Button variant="primary" style={{ marginTop: '16px' }}>
        Get Started
      </Button>
    </Card>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from 'edifly-ui';

<Button variant="primary" size="large">
  Primary Button
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `loading`: boolean

### Input

A flexible input component with prefix/suffix support and validation states.

```tsx
import { Input } from 'edifly-ui';

<Input
  placeholder="Enter email"
  prefix="@"
  suffix=".com"
  error={false}
  errorMessage="Invalid email"
/>
```

### Card

A content container with optional header, cover, and actions.

```tsx
import { Card, Button } from 'edifly-ui';

<Card
  title="Card Title"
  cover={<img src="image.jpg" alt="cover" />}
  actions={[
    <Button key="edit">Edit</Button>,
    <Button key="delete" variant="danger">Delete</Button>
  ]}
>
  Card content goes here
</Card>
```

### Accordion

A collapsible content container that can display multiple panels.

```tsx
import { Accordion } from 'edifly-ui';

<Accordion
  items={[
    {
      key: '1',
      title: 'Panel 1',
      content: 'Content of panel 1',
    },
    {
      key: '2',
      title: 'Panel 2',
      content: 'Content of panel 2',
    },
  ]}
  defaultActiveKey={['1']}
  accordion={false}
/>
```

**Props:**
- `items`: Array of accordion items with `key`, `title`, `content`, and optional `disabled`, `extra`
- `accordion`: boolean - Only allow one panel open at a time
- `defaultActiveKey`: string | string[] - Initially active panels
- `bordered`: boolean - Show borders around panels
- `ghost`: boolean - Remove background and borders
- `expandIconPosition`: 'start' | 'end' - Position of expand icon

## Theming

Edifly UI uses CSS variables for theming. You can customize the appearance by overriding these variables:

```css
:root {
  --edifly-color-primary: #1890ff;
  --edifly-color-success: #52c41a;
  --edifly-color-warning: #faad14;
  --edifly-color-danger: #ff4d4f;
  --edifly-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Dark theme */
[data-theme="dark"] {
  --edifly-color-text: #ffffffd9;
  --edifly-color-bg: #141414;
  --edifly-color-border: #424242;
}
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Storybook

Run Storybook to see all components in action:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can interact with all components and see their documentation.

## Build

Build the library for distribution:

```bash
npm run build
```

This creates optimized bundles in the `dist` folder:
- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES modules build
- `dist/index.d.ts` - TypeScript declarations
- `dist/index.css` - Bundled styles

## License

MIT © Edifly Team