# Button Component Technical Documentation

## Overview

The Button component is a highly configurable and accessible React component that implements various design patterns and modern React/TypeScript features. Let's break down each part of the implementation.

## Key Patterns and Concepts

### 1. Class Variance Authority (CVA)

The `cva` function is a utility for creating variant-based styling. It allows you to define a base style and variants that can be combined dynamically.

```typescript
const buttonVariants = cva(
  // Base styles applied to all buttons
  "flex items-center font-medium",
  {
    variants: {
      // Variant groups
      variant: {
        primary: [...],
        secondary: [...],
        // ...
      },
      size: {
        md: "gap-1 rounded px-4 py-[10px] text-sm",
        lg: "gap-[6px] rounded px-[18px] py-[10px] text-base",
        // ...
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

The CVA pattern provides:

- Type-safe variants
- Default variants
- Composable styles
- Runtime validation

### 2. Forward Refs Pattern

The component uses the `forwardRef` pattern, which allows parent components to access the underlying DOM node of the button.

```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // Component implementation
});
```

Benefits:

- Enables ref forwarding to the DOM button element
- Maintains component composition capabilities
- Supports imperative handle patterns

### 3. Component Props Pattern

The component uses TypeScript's type extension to combine HTML button attributes with custom props:

```typescript
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  textContent?: string;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  iconSize?: number;
  isDisabled?: boolean;
}
```

This pattern:

- Preserves all native button functionality
- Adds type-safe custom props
- Includes variant props from CVA

### 4. Icon Cloning Pattern

The component uses React's `cloneElement` to modify icon properties:

```typescript
const renderedIcon = icon && iconSize ? cloneElement(icon, { size: iconSize }) : icon;
```

This allows:

- Dynamic icon sizing
- Prop injection into icon components
- Maintaining icon component integrity

## Annotated Implementation

Here's the fully documented implementation:

````typescript
import { ButtonHTMLAttributes, cloneElement, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Defines the visual variants and sizes for the button component using CVA.
 * @see https://cva.style/docs
 */
const buttonVariants = cva(
  "flex items-center font-medium",
  {
    variants: {
      variant: {
        primary: [
          "bg-indigo-700 fill-white text-white",
          "shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "hover:bg-indigo-800 hover:shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "focus:bg-indigo-800 focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        // ... other variants
      },
      size: {
        md: "gap-1 rounded px-4 py-[10px] text-sm",
        lg: "gap-[6px] rounded px-[18px] py-[10px] text-base",
        // ... other sizes
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Props interface for the Button component.
 * Extends native button attributes and variant props.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  /** Text content to display inside the button */
  textContent?: string;
  /** Icon component to render (must be a valid React element) */
  icon?: React.ReactElement;
  /** Position of the icon relative to the text */
  iconPosition?: "left" | "right";
  /** Size of the icon in pixels */
  iconSize?: number;
  /** Whether the button is disabled */
  isDisabled?: boolean;
}

/**
 * A versatile button component that supports variants, icons, and different sizes.
 *
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="lg"
 *   textContent="Click me"
 *   icon={<Icon />}
 *   iconPosition="left"
 * />
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      textContent,
      isDisabled = false,
      icon,
      iconPosition = "left",
      iconSize,
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    // Clone and modify the icon if size is specified
    const renderedIcon = icon && iconSize
      ? cloneElement(icon, { size: iconSize })
      : icon;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {iconPosition === "left" && renderedIcon}
        {textContent}
        {iconPosition === "right" && renderedIcon}
      </button>
    );
  }
);

// Set display name for React DevTools
Button.displayName = "Button";

export { Button, buttonVariants };
````

## Usage Examples

### Basic Usage

```tsx
<Button
  variant='primary'
  size='lg'
  textContent='Click me'
/>
```

### With Icon

```tsx
<Button
  variant='secondary'
  size='md'
  textContent='Settings'
  icon={<SettingsIcon />}
  iconSize={20}
  iconPosition='left'
/>
```

### Icon Only

```tsx
<Button
  variant='tertiary'
  size='icon-2xl'
  icon={<MenuIcon />}
  iconSize={24}
/>
```

## Best Practices

1. **Accessibility**

   - Always provide text content for screen readers
   - Use proper ARIA attributes when needed
   - Ensure proper color contrast

2. **Performance**

   - Memoize icon components when needed
   - Use appropriate icon sizes
   - Avoid unnecessary re-renders

3. **Maintainability**
   - Keep variants organized and documented
   - Use consistent naming conventions
   - Maintain type safety

## Common Gotchas

1. **Icon Sizing**

   - Ensure icons support the size prop
   - Consider aspect ratio
   - Test with different sizes

2. **Variant Conflicts**

   - Be careful with className overrides
   - Test disabled states
   - Verify hover/focus states

3. **TypeScript Types**
   - Verify prop types are correct
   - Handle optional props properly
   - Maintain type safety with generics
