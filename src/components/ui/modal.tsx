import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";

import { useFocusTrap } from "@/hooks/use-focus-trap";
import { cn } from "@/lib/utils";

import { Portal } from "./portal";

import { IModalProps } from "../../data/modal.types";
import { ModalCloseButton } from "./modal-close-button";

export const modalVariants = cva(
  "relative w-full transform rounded-lg bg-white shadow-xl transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full"
      },
      position: {
        center: "p-6",
        // bottom: "p-6 rounded-b-none fixed bottom-0 left-[50%] transform -translate-x-1/2"
      }
    },
    defaultVariants: {
      size: "md",
      position: "center"
    }
  }
);

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  position,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  preventScroll = true,
  className,
  overlayClassName
}: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize focus trap
  useFocusTrap(modalRef, isOpen);

  // Handle escape key and scroll lock
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      if (preventScroll) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeOnEsc, preventScroll]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:items-center'
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
      >
        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
            overlayClassName
          )}
          aria-hidden='true'
          onClick={closeOnOverlayClick ? onClose : undefined}
        />

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={cn(modalVariants({ size, position }), className)}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start ">
              {title && (
                <h2
                  id='modal-title'
                  className='text-lg font-semibold text-gray-900 '
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <div className="flex-shrink-0">
                  <ModalCloseButton onClick={onClose} className="static" />
                </div>
              )}
            </div>
          )}

          {description && (
            <p
              id='modal-description'
              className='mt-2 text-sm text-gray-500'
            >
              {description}
            </p>
          )}

          <div className={cn("mt-4", !title && !description && "mt-0")}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}

