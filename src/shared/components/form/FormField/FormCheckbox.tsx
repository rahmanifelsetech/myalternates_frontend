import { ReactNode, useEffect, useState } from "react";
import Checkbox from "../input/Checkbox";

interface FormCheckboxProps {
  label?: ReactNode;
  error?: any;
  checked?: boolean;
  onChange?: (checked: boolean | any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  helperText?: ReactNode;
  value?: any;
  name?: string;
  ref?: any;
  [key: string]: any;
}

/**
 * FormCheckbox Component
 * Wraps the existing Checkbox component with react-hook-form integration
 * Handles error display and label rendering
 *
 * Usage:
 * <FormCheckbox
 *   label="I agree to Terms and Conditions"
 *   error={errors.agreeToTerms}
 *   {...register("agreeToTerms")}
 * />
 */
function FormCheckbox({
  label,
  error,
  helperText,
  checked = false,
  onChange,
  disabled = false,
}: FormCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleChange = (value: boolean) => {
    setIsChecked(value);
    if (onChange) {
      // Handle both react-hook-form's ChangeHandler and custom handlers
      if (typeof onChange === "function") {
        try {
          onChange(value);
        } catch (e) {
          // If onChange expects an event, create one
          onChange({ target: { checked: value } } as any);
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={isChecked} 
          onChange={handleChange} 
          disabled={disabled} 
        />
        {label && (
          <label className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400 cursor-pointer">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-2 ml-8 text-sm text-error-500 dark:text-error-400">
          {typeof error === "string" ? error : error?.message || "Invalid field"}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 ml-8 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormCheckbox;
