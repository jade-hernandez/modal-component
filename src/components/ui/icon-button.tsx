"use client";

export const IconButton: React.FC<{
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
        className="min-w-fit"
        aria-label={label}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
