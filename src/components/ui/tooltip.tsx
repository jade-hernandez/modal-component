import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ReactNode, forwardRef, useState } from "react";

// Define variants for the tooltip container
const tooltipVariants = cva(
  "absolute z-10 px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-[0_10px_15px_-0.3px_rgba(0,0,0,0.1),0_4px_6px_-0.4px_rgba(0,0,0,0.1)]",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2"
      },
      variant: {
        default: "bg-neutral-950 text-white"
      }
    },
    defaultVariants: {
      position: "top",
      variant: "default"
    }
  }
);

// Define variants for the tooltip arrow
const arrowVariants = cva(
  "absolute border-[3px] border-neutral-950",
  {
    variants: {
      position: {
        top: "top-[calc(100%-3px)] left-1/2 -translate-x-1/2 transform rotate-45 rounded-br-[0.75px]",
        right: "top-1/2 left-[calc(-3px-0.5rem)] transform rotate-45 rounded-bl-[0.75px]",
        bottom: "top-[-3px] left-1/2 -translate-x-1/2 transform rotate-45 rounded-tr-[0.75px]",
        left: "top-1/2 left-[calc(100%-3px)] transform rotate-45 rounded-tl-[0.75px]"
      }
    },
    defaultVariants: {
      position: "top"
    }
  }
);

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position, variant, className }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children && children}

        {isVisible && (
          <div className={cn(tooltipVariants({ position, variant }), className)}>
            {content}
            {/* Arrow pointing to the trigger element */}
            <div className={arrowVariants({ position })} />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
