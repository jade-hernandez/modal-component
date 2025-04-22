import { cn } from "@/lib/utils";
import { sectionsData } from "../../data/footer-data";
import { HTMLAttributes, forwardRef } from "react";
import FacebookIcon from "@/components/icons/facebook-icon";
import GithubIcon from "../icons/github-icon";
import InstagramIcon from "../icons/instagram-icon";
import XIcon from "../icons/x-icon";
import YoutubeIcon from "../icons/youtube-icon";

// Default icons configuration
const ICON_SIZE = 24;
const ICON_COLOR = "#A3A3A3";
const defaultIcons = [
  {
    id: "youtube",
    icon: <YoutubeIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit Youtube profile",
  },
  {
    id: "instagram",
    icon: <InstagramIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit Instagram profile",
  },
  {
    id: "facebook",
    icon: <FacebookIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit facebook profile",
  },
  {
    id: "github",
    icon: <GithubIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit github profile",
  },
  {
    id: "x",
    icon: <XIcon size={ICON_SIZE} color={ICON_COLOR} />,
    label: "Visit X profile",
  }
];

// IconButton component
const IconButton: React.FC<{
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({
  children,
  label,
  onClick,
}) => {
    return (
      <button
        className="p-2"
        aria-label={label}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

// Props interface for the Footer component
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  companyName?: string;
  navItems?: Array<{
    id: number | string;
    title: string;
    path: string;
  }>;
  socialIcons?: Array<{
    id: string;
    icon: React.ReactElement;
    label: string;
    onClick?: () => void;
  }>;
  showSocialIcons?: boolean;
  showCopyright?: boolean;
  initialYear?: number;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({
    companyName = "Abstractly, Inc.",
    navItems = sectionsData,
    socialIcons = defaultIcons,
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
        className={cn("flex flex-col items-center py-[286px] gap-4", className)}
        {...props}
      >
        {navItems && navItems.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {navItems.map(({ path, id, title }) => (
              <a
                key={id}
                href={path}
                className="text-neutral-600 text-sm p-[2px]"
              >
                {title}
              </a>
            ))}
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-4">
          {showSocialIcons && socialIcons && socialIcons.length > 0 && (
            <div className="flex gap-6 justify-center items-center">
              {socialIcons.map((icon) => (
                <IconButton
                  key={icon.id}
                  label={icon.label}
                // onClick={icon.onClick}
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
