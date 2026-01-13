import type React from "react";
import { forwardRef } from "react";
import { typographyClasses } from '@shared/utils/typographyUtils';

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      className = "",
      min="",
      max="",
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
    },
    ref
  ) => {
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 shadow-theme-xs focus:outline-hidden focus:ring-3 ${typographyClasses.component.input} ${typographyClasses.component.placeholder} dark:bg-gray-900 dark:text-white/90 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...(value !== undefined && value !== null ? { value } : {})}
          onChange={(e) => onChange?.(e)}
          onBlur={(e) => onBlur?.(e)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={inputClasses}
        />

      {hint && (
        <p
          className={`mt-1.5 ${
            error
              ? typographyClasses.form.error
              : success
              ? "text-success-500" // Note: typographyClasses.special.success is larger, using specific color here
              : typographyClasses.form.hint
          }`}
        >
          {hint}
        </p>
      )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
