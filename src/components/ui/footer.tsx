"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes, forwardRef } from "react";
import { IconButton } from "./icon-button"; // Adjusted the path to locate the module correctly

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  navItems: Array<{
    id: number | string;
    title: string;
    path: string;
  }>;
  socialIcons: Array<{
    id: string;
    icon: React.ReactElement;
    label: string;
    onClick?: () => void;
  }>;
  companyName?: string;
  showSocialIcons?: boolean;
  showCopyright?: boolean;
  initialYear?: number;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({
    navItems,
    socialIcons,
    companyName,
    showSocialIcons = true,
    showCopyright = true,
    initialYear,
    className,
    ...props
  }, ref) => {
    const currentYear = new Date().getFullYear();
    const yearDisplay = initialYear && initialYear !== currentYear
      ? `${initialYear}-${currentYear}`
      : currentYear;

    return (
      <footer
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-4", className)}
        {...props}
      >
        {navItems && navItems.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {navItems.map(({ path, id, title }) => (
              <Link
                key={id}
                href={path}
                className="text-neutral-600 text-sm p-[2px]"
              >
                {title}
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-4">
          {showSocialIcons && socialIcons && socialIcons.length > 0 && (
            <div className="flex gap-6 justify-center items-center flex-wrap">
              {socialIcons.map((icon) => (
                <IconButton
                  key={icon.id}
                  label={icon.label}
                >
                  {icon.icon}
                </IconButton>
              ))}
            </div>
          )}

          {showCopyright && (
            <div className="text-neutral-900 text-sm">
              &copy; {yearDisplay} {companyName}. All rights reserved.
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export { Footer };
