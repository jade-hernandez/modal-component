# Pricing Components: In-Depth Analysis

This document provides a detailed breakdown of the pricing component system in our UI library. It explains how the components work individually and together to create a complete pricing section.

## Components Relationship Overview

The pricing system consists of three main components that work together in a hierarchical manner:

1. **`pricing.tsx`**: The lowest-level component, responsible for formatting and displaying price information.
2. **`price-card.tsx`**: A mid-level component that combines pricing with features to create a complete pricing card.
3. **`price-card-example.tsx`**: The highest-level component that manages state and layout for a complete pricing section.

## 1. The Pricing Component (`pricing.tsx`)

### Purpose

This component handles the display and formatting of price information, supporting different currencies and billing cycles.

### Detailed Code Analysis

```typescript
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
```

- `cn` is a utility function that combines classnames, likely merging Tailwind classes
- `cva` (class-variance-authority) is imported to create variant-based styling

```typescript
const pricingVariants = cva("", {
  variants: {
    variant: {
      default: "text-neutral-900",
      highlighted: "text-indigo-700"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
```

- Creates a styling system for the pricing component with two variants:
  - `default`: Black text color (neutral-900)
  - `highlighted`: Purple text color (indigo-700)
- Sets "default" as the fallback when no variant is specified

```typescript
export type TCurrency = "$" | "€";
export type TBillingCycle = "monthly" | "annually";
export type TVariant = "default" | "highlighted";
```

- Defines TypeScript type aliases for the supported currencies, billing cycles, and styling variants
- These types create a type-safe API for the component

```typescript
export interface IPricingProps extends React.HTMLAttributes<HTMLDivElement> {
  pricing: string[];
  currency?: TCurrency;
  billingCycle?: TBillingCycle;
  variant?: TVariant;
}
```

- Defines the props interface, extending HTML div attributes (allowing for className, etc.)
- Required props:
  - `pricing`: An array of strings containing price values (index 0 for monthly, index 1 for annually)
- Optional props (with defaults):
  - `currency`: Dollar or Euro symbol
  - `billingCycle`: Monthly or annually
  - `variant`: Default or highlighted styling

```typescript
const Pricing = ({
  pricing,
  currency = "$",
  billingCycle = "monthly",
  variant = "default",
  className,
  ...props
}: IPricingProps) => {
```

- Component function declaration with destructured props and defaults

```typescript
const montlyPricing = Number(pricing[0]);
const annuallyPricing = Number(pricing[1]);
const annuallyPricingAsMonth = Math.round(annuallyPricing * 12);
```

- Converts string prices to numbers
- Calculates the annual price × 12 to show the total annual cost

```typescript
const currencyMap = {
  $: "en-US",
  "€": "fr-FR"
};
```

- Maps currency symbols to appropriate locales for formatting

```typescript
const formattedPrice = new Intl.NumberFormat(currencyMap[currency], {
  style: "currency",
  currency: currency === "$" ? "USD" : "EUR"
}).format(billingCycle === "monthly" ? montlyPricing : annuallyPricing);
```

- Uses JavaScript's built-in internationalization API to format the price
- Selects the correct locale based on the currency
- Formats using either monthly or annual pricing based on the current billing cycle

```typescript
  return (
    <div
      className={cn("flex flex-col", className)}
      {...props}
    >
```

- Returns a flex column container, combining the base styles with any className passed in props
- Spreads remaining props onto the div

```typescript
      <div className='flex items-baseline'>
        <span className={cn("text-5xl font-semibold", pricingVariants({ variant }))}>
          {formattedPrice}
        </span>
        <span className={cn("text-base", pricingVariants({ variant }), "ml-1")}>
          / month
        </span>
      </div>
```

- Creates a flex container for the price and "/month" text, aligning them at the baseline
- Uses large, bold text for the price, styled according to the selected variant
- Adds "/ month" with matching color but smaller font size

```typescript
      <div>
        <span className='mt-1 text-base text-neutral-600'>Billed {billingCycle}</span>
        {billingCycle === "annually" && (
          <span className='mt-1 text-base text-neutral-600'>{" "}({currency}{annuallyPricingAsMonth})</span>
        )}
      </div>
```

- Shows "Billed monthly" or "Billed annually" in gray text
- Conditionally shows the total annual cost when the billing cycle is annual
- This helps users understand the total commitment

### Key Features

- **Price Formatting**: Uses `Intl.NumberFormat` to properly format currency according to locale standards.
- **Billing Cycle Display**: Shows different pricing based on monthly or annual billing.
- **Visual Variants**: Supports different styling (default or highlighted) through class-variance-authority.
- **Annual Calculation**: Automatically calculates and displays annual cost when relevant.

## 2. The Price Card Component (`price-card.tsx`)

### Purpose Price Card

Creates a complete pricing card that combines pricing information with feature lists and a call-to-action button.

### Detailed Code Analysis Price Card

```typescript
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { CheckList } from "./check-list";
import { Pricing, TBillingCycle } from "./pricing";
```

- Imports necessary components and types:
  - `Button`: For the call-to-action
  - `CheckList`: For displaying features
  - `Pricing`: The pricing component we analyzed above

```typescript
type TVariant = "default" | "highlighted";
type TButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "linkColor"
  | "linkGray"
  | "destructive";
```

- Defines local type aliases:
  - `TVariant`: Styling options for the card (same as in Pricing)
  - `TButtonVariant`: All possible button styling options

```typescript
export interface IPriceCardProps {
  title: string;
  description: string;
  pricing: string[];
  billingCycle: TBillingCycle;
  features: { content: string; className?: string }[];
  isFeatured?: boolean;
  headingText?: string;
  variant?: TVariant;
  buttonVariant?: TButtonVariant;
}
```

- Defines the props interface for the PriceCard component:
  - `title`: The name of the plan
  - `description`: A brief description of the plan
  - `pricing`: Array of price strings (monthly, annually)
  - `billingCycle`: Currently selected billing cycle
  - `features`: Array of feature objects with content text and optional classes
  - `isFeatured`: Whether this card should be visually prominent
  - `headingText`: Optional banner text for featured cards
  - `variant`: Visual styling variant
  - `buttonVariant`: Style for the CTA button

```typescript
export const PriceCard = ({
  title,
  description,
  pricing,
  billingCycle,
  features,
  isFeatured = false,
  headingText = "",
  variant = "default",
  buttonVariant = "primary"
}: IPriceCardProps) => {
```

- Component declaration with destructured props and defaults

```typescript
  return (
    <div
      className={cn(
        "relative flex w-full max-w-[384px] flex-col justify-between rounded-md border border-neutral-200 bg-white shadow-sm",
        isFeatured ? "border-indigo-600" : ""
      )}
    >
```

- Returns a card container with:
  - Conditional colored border if the card is featured

```typescript
      {isFeatured && headingText && (
        <div className='h-fit rounded-t-lg bg-indigo-50 py-4 text-center text-xl font-semibold text-indigo-700'>
          {headingText}
        </div>
      )}
```

- Conditionally renders a banner at the top if:
  - The card is marked as featured
  - A heading text is provided

```typescript
          <Pricing
            pricing={pricing}
            billingCycle={billingCycle}
            variant={variant}
          />
```

- Includes the Pricing component, passing relevant props

```typescript
          <CheckList items={features} />
```

- Renders the features list using the CheckList component

```typescript
        </div>

        <Button
          textContent='Buy now'
          variant={buttonVariant}
          size='lg'
          className='mt-auto w-full justify-center text-center'
        />
```

- Adds a call-to-action button at the bottom of the card
- Uses the specified variant and a large size

### Key Features Price Card

- **Feature Display**: Shows a list of included features using the `CheckList` component.
- **Visual Prominence**: Supports highlighting for featured plans with border styling and an optional heading banner.
- **Flexible Button Styling**: Allows different button variants based on the plan's importance.
- **Consistent Layout**: Maintains uniform spacing and organization of pricing card elements.

## 3. The Price Card Example Component (`price-card-example.tsx`)

### Purpose Price Card Example

Demonstrates a complete pricing section with multiple plans and billing cycle toggling functionality.

### Detailed Code Analysis Price Card Example

```typescript
import { basicFeatures, premiumFeatures, standardFeatures } from "data/feature-data";
import { useState } from "react";
import { Button } from "../ui/button";
import { IPriceCardProps, PriceCard } from "../ui/price-card";
import { TBillingCycle } from "../ui/pricing";
```

- Imports feature data arrays and needed components
- Imports types from the related components

```typescript
type TPricingPlans = Omit<IPriceCardProps, "billingCycle">[];
```

- Creates a type for an array of price plans
- Uses TypeScript's `Omit` utility to create a modified version of `IPriceCardProps`
- Removes the `billingCycle` property from each plan object since it will be managed at this level

```typescript
// Define pricing plan configurations
const pricingPlans: TPricingPlans = [
  {
    title: "Basic Plan",
    description: "Access to a curated selection of abstract images",
    pricing: ["9.99", "6.99"],
    features: basicFeatures,
    buttonVariant: "secondary"
  },
  {
    title: "Standard Plan",
    description: "Next-level Integrations, priced economically",
    pricing: ["19.99", "15.99"],
    features: standardFeatures,
    isFeatured: true,
    headingText: "Most Popular",
    variant: "highlighted"
  },
  {
    title: "Premium Plan",
    description: "Experience limitless living for power users",
    pricing: ["29.99", "25.99"],
    features: premiumFeatures,
    buttonVariant: "secondary"
  }
];
```

- Defines an array of pricing plans with all necessary information
- Note the pricing arrays: first value is monthly, second is annual
- Middle plan is marked as featured with a "Most Popular" banner and highlighted styling

```typescript
export const PriceCardExample = () => {
  const [billingCycle, setBillingCycle] = useState<TBillingCycle>("monthly" as TBillingCycle);
```

- Component declaration with local state for the billing cycle
- Uses TypeScript's type assertion to ensure type safety

```typescript
const toggleBillingCycle = () => {
  setBillingCycle(prev => (prev === "monthly" ? "annually" : "monthly"));
};
```

- Toggle function that switches between monthly and annual billing
- Uses the functional form of setState to safely reference the previous state

```typescript
      <div
        className="flex justify-center items-center rounded"
      >
        <Button
          size={"lg"}
          variant={billingCycle === "monthly" ? "secondary" : "linkColor"}
          className="fill-neutral-900 text-neutral-900 min-w-[140px] justify-center"
          onClick={toggleBillingCycle}
          textContent={"Monthly"}
        />
        <Button
          size={"lg"}
          variant={billingCycle === "monthly" ? "linkColor" : "secondary"}
          className="fill-neutral-900 text-neutral-900 min-w-[140px] justify-center"
          onClick={toggleBillingCycle}
          textContent={"Annually"}
        />
      </div>
```

- Creates a toggle for switching between monthly and annual billing
- Uses two buttons side by side
- The active option appears as a secondary button (filled)
- Both buttons have minimum width to maintain consistency
- Both buttons call the same toggle function

```typescript
      <div className="flex flex-col justify-center gap-6 md:flex-row">
        {pricingPlans.map((plan, index) => (
          <PriceCard
            key={index}
            {...plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>
```

- Container for the price cards with responsive behavior:
  - On mobile (default): Cards stack vertically
  - On medium screens and up (`md:`): Cards display in a row
- Maps through the pricing plans array to create PriceCard components
- Uses the array index as the React key
- Spreads all plan properties to the PriceCard
- Additionally passes the current billingCycle from state

### Key Features Price Card Example

- **State Management**: Manages the billing cycle state (monthly/annually) and provides a toggle.
- **Plan Data Organization**: Defines pricing plan data in a structured array.
- **Responsive Layout**: Uses flex layout with responsive adjustments for different screen sizes.
- **Marketing Copy**: Includes persuasive copy that explains the value proposition.

## Data Flow Between Components

1. The top-level `PriceCardExample` component:

   - Manages the `billingCycle` state
   - Passes plan data and the current `billingCycle` to individual `PriceCard` components

2. Each `PriceCard` component:

   - Receives complete plan data and the current billing cycle
   - Passes pricing data and billing cycle down to the `Pricing` component
   - Renders features using `CheckList`

3. The `Pricing` component:
   - Takes pricing values and billing cycle information
   - Formats and displays the appropriate price based on the current billing cycle

## Benefits of This Approach

1. **Modularity**: Each component has a single responsibility, making the code easier to maintain.
2. **Reusability**: Components can be reused in different contexts.
3. **Consistency**: Styling and behavior are consistent across pricing cards.
4. **Flexibility**: The system can easily accommodate different pricing structures, features, and styling variations.
5. **Type Safety**: TypeScript ensures proper data structure throughout the component hierarchy.
6. **User Experience**: The toggle feature enhances user experience by allowing easy switching between billing cycles.
