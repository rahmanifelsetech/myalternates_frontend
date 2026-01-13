import { MouseEvent, ReactNode } from "react";
import { typographyClasses } from '@shared/utils/typographyUtils';
import { SyncIcon } from "@shared/icons";

interface IconButtonProps {
  icon?: ReactNode; // Icon element
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional classes
  loading?: boolean; // Loading state
  title?: string; // Tooltip title
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  title,
  type = 'button',
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      title={title}
      className={`inline-flex items-center justify-center rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
        disabled || loading ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <SyncIcon className="animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
};