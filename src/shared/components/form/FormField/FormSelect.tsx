import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import Label from "../Label";

interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  label?: string;
  error?: FieldError;
  helperText?: ReactNode;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * FormSelect Component
 * Custom select component that matches existing UI components theme
 * Handles error display and label rendering
 * Uses Tailwind styling consistent with Input component
 *
 * Usage:
 * <FormSelect
 *   label="Category"
 *   options={[
 *     { label: "PMS", value: "PMS" },
 *     { label: "AIF", value: "AIF" }
 *   ]}
 *   error={errors.category}
 *   {...register("category")}
 * />
 */
function FormSelect({
  label,
  error,
  helperText,
  required,
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  className = "",
}: FormSelectProps) {
  let selectClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    selectClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    selectClasses += ` border-error-500 focus:ring-error-100 dark:focus:ring-error-900/50`;
  } else {
    selectClasses += ` border-gray-300 text-gray-700 focus:border-brand-500 focus:ring-brand-100 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-500 dark:focus:ring-brand-900/50`;
  }

  return (
    <div className="w-full">
      {label && (
        <Label>
          {label}
          {required && <span className="text-error-500"> *</span>}
        </Label>
      )}
      <select
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={selectClasses}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {error.message}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormSelect;
