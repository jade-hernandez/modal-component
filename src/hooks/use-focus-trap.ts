// src/hooks/use-focus-trap.ts
"use client";

import { useEffect } from "react";

export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    console.log("element", element);
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    console.log("focusableElements", focusableElements);
    console.table(focusableElements);

    const firstFocusable = focusableElements[0] as HTMLElement;
    console.log("firstFocusable", firstFocusable);
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    console.log("lastFocusable", lastFocusable);

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      console.log("Tab is pressed", e.key === "Tab");

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

    // Store last focused element to restore focus when menu closes
    const lastFocusedElement = document.activeElement as HTMLElement;
    console.log("lastFocusedElement", lastFocusedElement);

    // Focus first element when opened
    firstFocusable?.focus();
    console.log("First elements has been focused", firstFocusable);

    element.addEventListener("keydown", handleTabKey);

    return () => {
      element.removeEventListener("keydown", handleTabKey);
      // Restore focus when menu closes
      lastFocusedElement?.focus();
    };
  }, [isActive, ref]);
}
