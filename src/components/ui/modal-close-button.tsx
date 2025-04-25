// modal-close-button.tsx
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface ICloseButtonProps extends ComponentProps<"button"> {
  className?: string;
}

export function ModalCloseButton({ className, ...props }: ICloseButtonProps) {
  return (
    <button
      className={cn(
        "absolute right-4 top-4 rounded p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-900",
        className
      )}
      aria-label='Close modal'
      {...props}
    >
      <svg
        className='h-5 w-5'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );
}
