# Modal Hooks Documentation

This document explains the custom hooks used for modal functionality in our UI library.

## Table of Contents

- [useFocusTrap](#usefocustrap)
- [useModal](#usemodal)
- [Usage Examples](#usage-examples)
- [Accessibility Considerations](#accessibility-considerations)

## useFocusTrap

### Purpose

The `useFocusTrap` hook creates an accessibility feature known as a "focus trap" that confines keyboard focus within a specific DOM element (like a modal dialog). This is essential for:

- Preventing users from tabbing outside of modal dialogs
- Ensuring keyboard navigation remains within the active modal
- Maintaining WCAG (Web Content Accessibility Guidelines) compliance
- Improving user experience for keyboard and screen reader users

### API

```tsx
useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean): void
```

#### Parameters

- `ref`: A React ref object pointing to the DOM element to trap focus within
- `isActive`: A boolean that enables or disables the focus trap

### Implementation

```tsx
// src/hooks/use-focus-trap.ts
"use client";

import { useEffect } from "react";

export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // If no focusable elements, exit early
    if (!firstFocusable) return;

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // If shift + tab and on first element, move to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // If tab and on last element, move to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    // Store last focused element to restore focus when modal closes
    const lastFocusedElement = document.activeElement as HTMLElement;

    // Focus first element when opened
    firstFocusable?.focus();

    element.addEventListener("keydown", handleTabKey);

    return () => {
      element.removeEventListener("keydown", handleTabKey);
      // Restore focus when modal closes
      lastFocusedElement?.focus();
    };
  }, [isActive, ref]);
}
```

### How It Works

1. **Activation**: The hook only runs when `isActive` is true and a valid ref exists
2. **Element Selection**: Finds all focusable elements within the container
3. **Event Handling**: Sets up a keyboard event listener for Tab key presses
4. **Focus Looping**: Creates a loop when tabbing past the last or first focusable element
5. **Focus Restoration**: Returns focus to the previously focused element when the modal closes

## useModal

### useModal Purpose

The `useModal` hook provides a clean, reusable interface for managing modal state throughout your application. It:

- Creates a consistent API for controlling modals
- Handles state changes and callbacks
- Reduces boilerplate code in components that use modals

### useModal API

```tsx
useModal(options?: IUseModalOptions): IUseModalReturn
```

#### Types

```tsx
interface IUseModalOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface IUseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
```

#### useModal Parameters

- `options`: Optional configuration object
  - `defaultOpen`: Boolean that sets the initial state (defaults to false)
  - `onOpenChange`: Optional callback function when modal state changes

#### Return Value

- `isOpen`: Current state of the modal (boolean)
- `open`: Function to open the modal
- `close`: Function to close the modal
- `toggle`: Function to toggle the modal's state

### useModal Implementation

```tsx
// src/hooks/use-modal.ts
import { useState, useCallback } from "react";

export interface IUseModalOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface IUseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(options: IUseModalOptions = {}): IUseModalReturn {
  const { defaultOpen = false, onOpenChange } = options;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  return {
    isOpen,
    open,
    close,
    toggle
  };
}
```

### useModal How It Works

1. **State Management**: Uses React's `useState` to track the modal's open/closed state
2. **Callback Functions**: Creates memoized functions using `useCallback` for performance
3. **External Callbacks**: Calls the user-provided `onOpenChange` callback when state changes
4. **Simple API**: Provides intuitive functions (`open`, `close`, `toggle`) for state control

## Usage Examples

### Basic Modal with useModal

```tsx
import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function BasicModalExample() {
  const { isOpen, open, close } = useModal();

  return (
    <div>
      <Button
        onClick={open}
        textContent='Open Modal'
      />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title='Example Modal'
      >
        <p>This is a simple modal example.</p>
        <Button
          onClick={close}
          textContent='Close'
          variant='secondary'
        />
      </Modal>
    </div>
  );
}
```

### Custom Modal with useFocusTrap

```tsx
import { useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { Button } from "@/components/ui/button";

export function CustomModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Apply focus trap to custom modal
  useFocusTrap(modalRef, isOpen);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        textContent='Open Custom Modal'
      />

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            ref={modalRef}
            className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'
          >
            <h2 className='mb-4 text-xl font-semibold'>Custom Modal</h2>
            <input
              type='text'
              placeholder='Focus starts here'
              className='mb-4 w-full rounded border p-2'
            />
            <Button
              onClick={() => setIsOpen(false)}
              textContent='Close Modal'
              variant='secondary'
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

### Combined Example

```tsx
import { useRef } from "react";
import { useModal } from "@/hooks/use-modal";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { Button } from "@/components/ui/button";

export function AdvancedModalExample() {
  const { isOpen, open, close } = useModal({
    onOpenChange: open => console.log(`Modal is now ${open ? "open" : "closed"}`)
  });

  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen);

  return (
    <div>
      <Button
        onClick={open}
        textContent='Open Advanced Modal'
      />

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div
            ref={modalRef}
            className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'
          >
            <h2 className='mb-4 text-xl font-semibold'>Advanced Modal</h2>

            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Name'
                className='w-full rounded border p-2'
              />
              <textarea
                placeholder='Message'
                className='w-full rounded border p-2'
              />

              <div className='flex justify-end gap-2'>
                <Button
                  onClick={close}
                  textContent='Cancel'
                  variant='secondary'
                />
                <Button
                  textContent='Submit'
                  onClick={() => {
                    // Handle form submission
                    close();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Accessibility Considerations

Our modal implementation follows these accessibility best practices:

### Keyboard Navigation

- **Focus Management**: `useFocusTrap` ensures keyboard focus stays within the modal
- **Focus Restoration**: Focus returns to the triggering element when the modal closes
- **Keyboard Shortcuts**: Support for Escape key to close the modal

### Screen Reader Support

- **ARIA Attributes**: Modal component includes proper `role="dialog"` and `aria-modal="true"`
- **Labeling**: Uses `aria-labelledby` and `aria-describedby` to properly identify the modal
- **Focus Order**: Ensures logical tab order for screen reader navigation

### Visual Considerations

- **Overlay**: Visible background overlay indicates modal context
- **Visual Focus**: Visible focus indicators for keyboard users
- **Contrast**: Maintains proper contrast ratios for text and controls

## Implementation Tips

1. **Always Use Both Hooks Together**:

   - `useModal` handles state management
   - `useFocusTrap` ensures accessibility

2. **Proper Refs**:

   - Apply ref to the modal content container, not the overlay
   - Ensure the ref element contains all interactive elements

3. **Avoid Focus Issues**:

   - Make sure there's at least one focusable element inside the modal
   - Test with keyboard navigation

4. **Custom Styling**:
   - The modal's visual styling can be customized while maintaining accessibility
   - Ensure overlay has sufficient opacity for context
