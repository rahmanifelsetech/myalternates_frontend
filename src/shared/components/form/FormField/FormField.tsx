import { ReactNode } from "react";
import Label from "../Label";
import Input from "../input/InputField";

interface FormFieldProps {
  label?: string;
  error?: any;
  helperText?: ReactNode;
  required?: boolean;
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  min?: string | number;
  max?: string | number;
  step?: number;
  ref?: any;
  [key: string]: any;
}

/**
 * FormField Component
 * Wraps the existing Input component with react-hook-form integration
 * Handles error display and label rendering
 *
 * Usage:
 * <FormField
 *   label="Email"
 *   type="email"
 *   placeholder="Enter email"
 *   error={errors.email}
 *   {...register("email")}
 * />
 */
function FormField({
  label,
  error,
  helperText,
  required,
  ref,
  ...props
}: FormFieldProps) {
  // Filter out react-hook-form specific props that Input doesn't understand
  const { min, max, ...inputProps } = props;

  return (
    <div className="w-full">
      {label && (
        <Label>
          {label}
          {required && <span className="text-error-500"> *</span>}
        </Label>
      )}
      <Input {...inputProps} />
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {typeof error === "string" ? error : error?.message || "Invalid field"}
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

export default FormField;
