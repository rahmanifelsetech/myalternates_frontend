import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  loading?: boolean; // Loading state
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "sm",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  type = 'button',
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-brand-600 hover:text-gray-50 dark:bg-brand-600 dark:text-gray-100 dark:ring-brand-700 dark:hover:bg-gray-100 dark:hover:text-brand-700",
  };

  const variantIconClasses = {
    primary: "text-white",
    outline: "hover:bg-brand-600 hover:text-gray-50 dark:bg-brand-600 dark:text-gray-100 dark:ring-brand-700 dark:hover:bg-gray-100 dark:hover:text-brand-700",
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
        e.preventDefault()
        return
    }
    onClick?.()
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {startIcon && <span className={`flex items-center ${variantIconClasses[variant]}`}>{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
