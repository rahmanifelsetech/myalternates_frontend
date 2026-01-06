import React, { ReactNode, useState, forwardRef } from "react";
import { Controller, FieldError } from "react-hook-form";
import Label from "../Label";
import Input from "../input/InputField";
import Checkbox from "../input/Checkbox";
import FileInput from "../input/FileInput";
import TextArea from "../input/TextArea";
import DatePicker from "../date-picker";
import PhoneInput from "../group-input/PhoneInput";
import { TimeIcon, EyeIcon, EyeCloseIcon } from "../../../icons";
import {
  ReactSelectComponent,
  ReactMultiSelectComponent,
} from "../select/ReactSelect";
import { OtpInput } from "../input/OtpInput";

/**
 * Supported field types for dynamic rendering
 */
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "otp"
  | "date"
  | "time"
  | "select"
  | "multi-select"
  | "checkbox"
  | "textarea"
  | "date-picker"
  | "payment"
  | "phone"
  | "phone-input"
  | "currency"
  | "file"
  | "custom";

interface SelectOption {
  label: string;
  value: string | number;
  text?: string;
  selected?: boolean;
}

export interface DynamicFormFieldProps {
  /** Field type to render */
  type?: FieldType;
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error object from react-hook-form */
  error?: FieldError | any;
  /** Helper text below field */
  helperText?: ReactNode;
  /** Field name */
  name?: string;
  /** Field value */
  value?: string | number | boolean | string[];
	/** Set Field Value */
	setValue?: (name: string, value: any, options?: any) => void;
  /** Change handler */
  onChange?: (value: any) => void;
  /** Blur handler */
  onBlur?: (e: any) => void;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Field is in error state */
  error_state?: boolean;
  /** Hint text (alternative to helperText) */
  hint?: string;
  /** Select/MultiSelect options */
  options?: SelectOption[];
  /** Textarea rows */
  rows?: number;
  /** Input number min value */
  min?: string | number;
  /** Input number max value */
  max?: string | number;
  /** Input step value */
  step?: number | string;
  /** Custom className */
  className?: string;
  /** Currency symbol for currency type */
  currencySymbol?: string;
  /** Phone country code */
  countryCode?: string;
  /** Date picker onChange handler */
  onDateChange?: (dates: any, currentDateString: string) => void;
  /** Custom element to render */
  renderCustom?: (props: any) => React.ReactNode;
  /** Additional props to pass */
  [key: string]: any;
}

/**
 * DynamicFormField Component
 * Renders different form field types dynamically based on the 'type' prop
 * Integrates with form-elements and react-hook-form
 *
 * Supported Types:
 * - text: Simple text input
 * - email: Email input
 * - password: Password input with visibility toggle
 * - number: Number input
 * - date: HTML date input
 * - time: HTML time input
 * - date-picker: Advanced date picker
 * - select: Dropdown select
 * - multi-select: Multiple option select
 * - checkbox: Checkbox input
 * - textarea: Text area
 * - payment: Card payment input with icon
 * - phone: Phone number input
 * - currency: Currency input
 * - custom: Custom element via renderCustom prop
 *
 * Usage Examples:
 *
 * Text Input:
 * <DynamicFormField
 *   type="text"
 *   label="Name"
 *   placeholder="Enter name"
 *   error={errors.name}
 *   {...register("name")}
 * />
 *
 * Select:
 * <DynamicFormField
 *   type="select"
 *   label="Category"
 *   options={[{ label: "Option 1", value: "opt1" }]}
 *   error={errors.category}
 *   {...register("category")}
 * />
 *
 * Checkbox:
 * <DynamicFormField
 *   type="checkbox"
 *   label="I agree to terms"
 *   error={errors.agree}
 *   {...register("agree")}
 * />
 *
 * Textarea:
 * <DynamicFormField
 *   type="textarea"
 *   label="Description"
 *   rows={5}
 *   error={errors.description}
 *   {...register("description")}
 * />
 *
 * Multi-Select:
 * <DynamicFormField
 *   type="multi-select"
 *   label="Permissions"
 *   options={[{ value: "1", text: "Read", selected: false }]}
 *   error={errors.permissions}
 *   onChange={(values) => setValue("permissions", values)}
 * />
 *
 * Date Picker:
 * <DynamicFormField
 *   type="date-picker"
 *   label="Birth Date"
 *   placeholder="Select date"
 *   onDateChange={(dates, dateStr) => setValue("birthDate", dateStr)}
 * />
 *
 * Custom:
 * <DynamicFormField
 *   type="custom"
 *   renderCustom={(props) => <MyCustomComponent {...props} />}
 * />
 */
const DynamicFormField = forwardRef<HTMLSelectElement, DynamicFormFieldProps>(
  (
    {
      type = "text",
      label,
      placeholder,
      error,
      helperText,
      hint,
      name,
      value,
      onChange,
      onBlur,
			setValue,
      required = false,
      disabled = false,
      error_state = false,
      options = [],
      rows = 5,
      min,
      max,
      step,
      className = "",
      currencySymbol = "$",
      countryCode = "+1",
      onDateChange,
      renderCustom,
      ...props
    }: DynamicFormFieldProps,
    ref
  ) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to generate a default placeholder
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (label) return `Enter ${label}`;
    return "";
  };

  // Determine if component is controlled (value prop provided and not undefined)
  const isControlled = value !== undefined && value !== null;

  // Only convert value to string/number if controlled
  const stringValue = isControlled 
    ? (typeof value === "string" ? value : (value as string | number)?.toString() || "")
    : undefined;
  const numberValue = isControlled && typeof value === "number" ? value : undefined;
  const boolValue = isControlled && typeof value === "boolean" ? value : false;

  const renderField = () => {
    switch (type) {
      case "password":
        return (
          <div className="relative">
            <Input
              ref={ref as any}
              type={showPassword ? "text" : "password"}
              placeholder={getPlaceholder()}
              {...(isControlled ? { value: stringValue } : {})}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              className={className}
              name={name}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              disabled={disabled}
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        );

      case "phone":
        return (
          <Input
            ref={ref as any}
            type="tel"
            placeholder={getPlaceholder() || countryCode}
            {...(isControlled && { value: stringValue })}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={className}
            name={name}
          />
        );

      // case "phone-input":
			// 	if (!props.control || !name) {
			// 		console.error("phone-input requires control + name");
			// 		return null;
			// 	}

			// 	const countryCodeName = props.countryCodeName;

			// 	return (
			// 		<>
			// 			<Controller
			// 				name="phone"
			// 				control={props.control}
			// 				render={({ field }) => (
			// 					<PhoneInput
			// 						value={field.value || ""}
			// 						countryCode={props.getValues(countryCodeName) || "91"}
			// 						placeholder="8232432432"
			// 						onChange={field.onChange}
			// 						onCountryChange={(dialCode) => {
			// 							if (setValue) {
			// 								setValue(countryCodeName, dialCode, {
			// 									shouldDirty: true,
			// 									shouldValidate: true,
			// 								});
			// 							}
			// 						}}
			// 					/>
			// 				)}
			// 			/>

			// 			{/* Show country code error if exists */}
			// 			{countryCodeName && props.control.getFieldState(countryCodeName).error && (
			// 				<span className="text-xs text-error-500 mt-1">
			// 					{props.control.getFieldState(countryCodeName).error?.message}
			// 				</span>
			// 			)}
			// 		</>
			// 	);

			case "phone-input":
				if (!props.control || !name) {
					console.error("phone-input requires control + name");
					return null;
				}

				const countryCodeName = props.countryCodeName || "countryCode";

				return (
					<>
						<Controller
							name={name}
							control={props.control}
							render={({ field }) => (
								<PhoneInput
									value={field.value || ""}
									countryCode={props.getValues?.(countryCodeName)}
									         codeClassName={props.codeClassName}
									placeholder={getPlaceholder() || "8232432432"}
									onChange={field.onChange}
									onCountryChange={(dialCode) => {
										console.log('dialCode selected:', dialCode);
										if (setValue) {
											setValue(countryCodeName, dialCode, {
												shouldDirty: true,
												shouldValidate: true,
											});
										}
									}}
									codeDisabled={props.codeDisabled}
									phoneDisabled={props.phoneDisabled}
								/>
							)}
						/>

						{countryCodeName && props.control.getFieldState(countryCodeName).error && (
							<p className="text-sm text-error-500 dark:text-error-400 mt-1">
								{props.control.getFieldState(countryCodeName).error?.message}
							</p>
						)}
					</>
				);

      case "currency":
        return (
          <div className="relative">
            <Input
              ref={ref as any}
              type="number"
              placeholder={getPlaceholder()}
              {...(isControlled && { value: numberValue })}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              min={typeof min === "string" ? min : min?.toString()}
              max={typeof max === "string" ? max : max?.toString()}
              step={typeof step === "number" ? step : 0.01}
              className={`${className} pl-8`}
              name={name}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {currencySymbol}
            </span>
          </div>
        );

      case "payment":
        return (
          <div className="relative">
            <Input
              ref={ref as any}
              type="text"
              placeholder={getPlaceholder() || "Card number"}
              {...(isControlled && { value: stringValue })}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              className={`${className} pl-[62px]`}
              name={name}
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 4.5C2.5 3.67 3.17 3 4 3H16C16.83 3 17.5 3.67 17.5 4.5V5H2.5V4.5ZM17.5 8.5H2.5V15.5C2.5 16.33 3.17 17 4 17H16C16.83 17 17.5 16.33 17.5 15.5V8.5ZM4 14H5.5V16H4V14Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        );

      case "date-picker":
        const sanitizedId = name ? name.replace(/[.\[\]]/g, '-') : "date-picker";
        return (
          <DatePicker
            id={sanitizedId}
            value={stringValue}
            placeholder={getPlaceholder()}
            onChange={(dates, currentDateString) => {
              if (onDateChange) {
                onDateChange(dates, currentDateString);
              }
              if (setValue && name) {
                setValue(name, currentDateString);
              } else if (onChange) {
                onChange(currentDateString);
              }
            }}
            onClear={() => {
              if (setValue && name) {
                setValue(name, null);
              }
            }}
          />
        );

      case "time":
        return (
          <div className="relative">
            <Input
              ref={ref as any}
              type="time"
              {...(isControlled && { value: stringValue })}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              className={className}
              name={name}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        );

      case "date":
        return (
          <Input
            ref={ref as any}
            type="date"
            {...(isControlled && { value: stringValue })}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={className}
            name={name}
          />
        );

      case "number":
        return (
          <Input
            ref={ref as any}
            type="number"
            placeholder={getPlaceholder()}
            {...(isControlled && { value: numberValue })}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            min={typeof min === "string" ? min : min?.toString()}
            max={typeof max === "string" ? max : max?.toString()}
            step={typeof step === "number" ? step : undefined}
            className={className}
            name={name}
          />
        );

      case "email":
        return (
          <Input
            ref={ref as any}
            type="email"
            placeholder={getPlaceholder()}
            {...(isControlled && { value: stringValue })}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={className}
            name={name}
          />
        );

      case "textarea":
        if (!props.control || !name) {
          console.error("textarea requires control + name");
          return null;
          }

          return (
          <Controller
            name={name}
            control={props.control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder={getPlaceholder()}
                onChange={field.onChange}
                disabled={disabled}
                rows={rows}
                error={error || error_state}
                hint={hint}
                className={className}
              />
            )}
          />
       );

      // case "textarea":
      //   return (
      //     <TextArea
      //       placeholder={placeholder}
      //       {...(isControlled && { value: stringValue })}
      //       onChange={(val) => onChange?.(val)}
      //       disabled={disabled}
      //       rows={rows}
      //       error={error || error_state}
      //       hint={hint}
      //       className={className}
      //     />
      //   );

      case "checkbox":
        if (!props.control || !name) {
					console.error("checkbox requires control + name");
					return null;
				}

        return (
          <div className="flex items-center gap-3">
            <Controller
              name={name}
              control={props.control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              )}
            />
            {label && (
              <label className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400 cursor-pointer">
                {label}
                {required && <span className="text-error-500"> *</span>}
              </label>
            )}
          </div>
        );
			case "select":
				if (!props.control || !name) {
					console.error("Select requires control + name");
					return null;
				}

				return (
					<Controller
						name={name}
						control={props.control}
						render={({ field }) => (
							<ReactSelectComponent
								label={label}
								options={options}
								value={
									field.value
										? options.find(o => o.value === field.value) ?? null
										: null
								}
								onChange={(opt: any) => field.onChange(opt?.value ?? null)}
								onBlur={field.onBlur}
								isDisabled={disabled}
								placeholder={getPlaceholder()}
							/>
						)}
					/>
				);

      // case "select":
      //   const selectOptions: SelectOption[] = options as SelectOption[];
      //   const selectValue = isControlled && stringValue
      //     ? selectOptions.find(opt => opt.value === stringValue) || null
      //     : null;
        
      //   return (
      //     <ReactSelectComponent
      //       ref={ref as any}
      //       label={label}
      //       name={name || label || 'select-field'}
      //       {...(isControlled && { value: numberValue })}
      //       options={selectOptions}
      //       value={selectValue}
      //       onChange={(selected) => {
      //         const option = selected as SelectOption | null;
      //         onChange?.({
      //           target: { value: option?.value || '' }
      //         } as any);
      //       }}
      //       onBlur={() => onBlur?.({ target: {} } as any)}
      //       isDisabled={disabled}
      //       error={error}
      //       placeholder={placeholder}
      //       isSearchable
      //       isClearable
      //     />
      //   );

      case "multi-select":
        const multiSelectOptions: SelectOption[] = options as SelectOption[];
        const multiSelectValue = isControlled && Array.isArray(value) 
          ? (value as unknown[]).map((v: any) => 
              typeof v === 'string' 
                ? { label: v, value: v } 
                : v
            )
          : undefined;
        
        return (
          <ReactMultiSelectComponent
            ref={ref as any}
            label={label}
            name={name || label || 'multi-select-field'}
            {...(isControlled && { value: numberValue })}
            options={multiSelectOptions}
            value={multiSelectValue}
            onChange={(selected: any) => onChange?.(selected)}
            onBlur={() => onBlur?.({ target: {} } as any)}
            isDisabled={disabled}
            isSearchable
            isClearable
          />
        );

      case "custom":
        if (!renderCustom) {
          console.warn("custom type requires renderCustom prop");
          return null;
        }
        return renderCustom({
          value,
          onChange,
          onBlur,
          disabled,
          error,
          ...props,
        });

      case "file":
        if (!props.control || !name) {
          console.error("file input requires control + name");
          return null;
        }
        return (
          <Controller
            name={name}
            control={props.control}
            render={({ field }) => (
              <FileInput
                ref={ref as any}
                onChange={(e) => {
                  field.onChange(e.target.files?.[0]);
                  onChange?.(e);
                }}
                onBlur={field.onBlur}
                disabled={disabled}
                className={className}
                name={name}
                imageUrl={props.imageUrl}
                onRemove={props.onRemove}
              />
            )}
          />
        );
      case "otp":
        if (!props.control || !name) {
          console.error("otp input requires control + name");
          return null;
        }
        return (
          <Controller
            name={name}
            control={props.control}
            render={({ field }) => (
              <OtpInput
                length={props.otpLength || 6}
                onChange={field.onChange}
                onComplete={props.onComplete}
              />
            )}
          />
        );
      case "text":
      default:
        return (
          <Input
            ref={ref as any}
            type="text"
            placeholder={getPlaceholder()}
            {...(isControlled && { value: stringValue })}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={className}
            name={name}
          />
        );
    }
  };

    // For checkbox, label is rendered inside the checkbox
    if (type === ("checkbox" as any)) {
      return (
        <div className="w-full">
          {renderField()}
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

    return (
      <div className="w-full">
        {label && (
          <Label>
            {label}
            {required && <span className="text-error-500"> *</span>}
          </Label>
        )}
        {renderField()}
        {error && (
          <p className="mt-2 text-sm text-error-500 dark:text-error-400">
            {typeof error === "string" ? error : error?.message || "Invalid field"}
          </p>
        )}
        {!error && (helperText || hint) && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText || hint}
          </p>
        )}
      </div>
    );
  }
);

DynamicFormField.displayName = "DynamicFormField";

export default DynamicFormField;
