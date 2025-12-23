import { forwardRef } from 'react';
import Select, { 
  Props as SelectProps,
  StylesConfig,
  GroupBase,
  SingleValue,
  MultiValue
} from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

/**
 * Option interface for react-select
 */
export interface SelectOption {
  label: string;
  value: string | number;
  isDisabled?: boolean;
  [key: string]: any;
}

/**
 * Base Select Component Props
 */
export interface ReactSelectProps extends Omit<SelectProps<SelectOption, boolean, GroupBase<SelectOption>>, 'options' | 'onChange'> {
  options: SelectOption[];
  onChange?: (option: SingleValue<SelectOption> | MultiValue<SelectOption>) => void;
  onBlur?: () => void;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  required?: boolean;
  className?: string;
  value?: SelectOption | SelectOption[] | null;
  placeholder?: string;
}

/**
 * Async Select Component Props
 */
export interface AsyncReactSelectProps extends ReactSelectProps {
  loadOptions: (inputValue: string, callback: (options: SelectOption[]) => void) => void;
  defaultOptions?: SelectOption[] | boolean;
}

/**
 * Custom styles for react-select using CSS variables from theme
 * Supports light and dark modes with brand colors
 */
const getSelectStyles = (error?: boolean): StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> => ({
  control: (base) => ({
    ...base,
    minHeight: '44px',
    borderRadius: '0.5rem',
    borderColor: error ? 'var(--color-error-500)' : 'var(--color-gray-200)',
    backgroundColor: 'transparent',
    boxShadow: error ? '0 0 0 3px rgba(240, 68, 56, 0.1)' : 'none',
    '&:hover': {
      borderColor: error ? 'var(--color-error-500)' : 'var(--color-gray-400)',
    },
    '&:focus-within': {
      borderColor: error ? 'var(--color-error-500)' : 'var(--color-brand-500)',
      boxShadow: error
        ? '0 0 0 3px rgba(240, 68, 56, 0.1)'
        : '0 0 0 3px rgba(212, 175, 55, 0.1)',
    },
  }),
  input: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
    fontSize: '0.875rem',
    '& input': {
      font: 'inherit',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--color-gray-400)',
    fontSize: '0.875rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-gray-700)',
    fontSize: '0.875rem',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? 'var(--color-brand-500)' 
      : state.isFocused 
      ? 'var(--color-gray-100)'
      : 'white',
    color: state.isSelected ? 'white' : 'var(--color-gray-700)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    '&:hover': {
      backgroundColor: state.isSelected 
        ? 'var(--color-brand-500)'
        : 'var(--color-gray-50)',
    },
  }),
  menuList: (base) => ({
    ...base,
    fontSize: '0.875rem',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'var(--color-gray-400)',
    '&:hover': {
      color: 'var(--color-brand-500)',
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'var(--color-gray-400)',
    '&:hover': {
      color: 'var(--color-error-500)',
    },
  }),
  loadingIndicator: (base) => ({
    ...base,
    color: 'var(--color-brand-500)',
  }),
});

/**
 * Dark mode styles for react-select using CSS variables
 */
const getDarkSelectStyles = (error?: boolean): StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> => ({
  control: (base) => ({
    ...base,
    minHeight: '44px',
    borderRadius: '0.5rem',
    borderColor: error ? 'var(--color-error-500)' : 'var(--color-gray-700)',
    backgroundColor: 'var(--color-gray-900)',
    color: 'var(--color-gray-100)',
    boxShadow: error ? '0 0 0 3px rgba(240, 68, 56, 0.2)' : 'none',
    '&:hover': {
      borderColor: error ? 'var(--color-error-500)' : 'var(--color-gray-600)',
    },
    '&:focus-within': {
      borderColor: error ? 'var(--color-error-500)' : 'var(--color-brand-500)',
      boxShadow: error
        ? '0 0 0 3px rgba(240, 68, 56, 0.2)'
        : '0 0 0 3px rgba(212, 175, 55, 0.2)',
    },
  }),
  input: (base) => ({
    ...base,
    color: 'var(--color-gray-100)',
    fontSize: '0.875rem',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--color-gray-500)',
    fontSize: '0.875rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-gray-100)',
    fontSize: '0.875rem',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--color-brand-500)'
      : state.isFocused
      ? 'var(--color-gray-800)'
      : 'var(--color-gray-900)',
    color: state.isSelected ? 'white' : 'var(--color-gray-100)',
    cursor: 'pointer',
    fontSize: '0.875rem',
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: 'var(--color-gray-900)',
    fontSize: '0.875rem',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--color-gray-900)',
    border: `1px solid var(--color-gray-700)`,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'var(--color-gray-500)',
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'var(--color-gray-500)',
  }),
});

/**
 * Single Select Component
 * For selecting a single option from a list
 */
export const ReactSelectComponent = forwardRef<
  any,
  ReactSelectProps
>(({
  options,
  onChange,
  onBlur,
  error,
  hint,
  label,
  required,
  className,
  isDisabled,
  isLoading,
  isClearable = true,
  isSearchable = true,
  placeholder = 'Select...',
  value,
  ...props
}, ref) => {
  const isDark = document.documentElement.classList.contains('dark');
  const selectStyles = isDark ? getDarkSelectStyles(error) : getSelectStyles(error);

  return (
    <div className={className}>
      <Select
        ref={ref}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        styles={selectStyles}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        {...(value !== undefined && value !== null ? { value } : {})}
        classNamePrefix="react-select"
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {typeof error === 'string' ? error : (error as any)?.message || 'Invalid selection'}
        </p>
      )}
      {!error && hint && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
});

ReactSelectComponent.displayName = 'ReactSelect';

/**
 * Multi Select Component
 * For selecting multiple options from a list
 */
export const ReactMultiSelectComponent = forwardRef<
  any,
  ReactSelectProps
>(({
  options,
  onChange,
  onBlur,
  error,
  hint,
  label,
  required,
  className,
  isDisabled,
  isLoading,
  isClearable = true,
  isSearchable = true,
  placeholder = 'Select options...',
  value,
  ...props
}, ref) => {
  const isDark = document.documentElement.classList.contains('dark');
  const selectStyles = isDark ? getDarkSelectStyles(error) : getSelectStyles(error);

  return (
    <div className={className}>
      <Select
        ref={ref}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        isMulti
        styles={selectStyles}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        {...(Array.isArray(value) ? { value } : {})}
        classNamePrefix="react-select"
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {typeof error === 'string' ? error : (error as any)?.message || 'Invalid selection'}
        </p>
      )}
      {!error && hint && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
});

ReactMultiSelectComponent.displayName = 'ReactMultiSelect';

/**
 * Async Select Component
 * For loading options asynchronously (e.g., from API)
 */
export const ReactAsyncSelectComponent = forwardRef<
  any,
  AsyncReactSelectProps
>(({
  options,
  loadOptions,
  onChange,
  onBlur,
  error,
  hint,
  label,
  required,
  className,
  isDisabled,
  isLoading,
  isClearable = true,
  isSearchable = true,
  placeholder = 'Search...',
  value,
  defaultOptions = true,
  ...props
}, ref) => {
  const isDark = document.documentElement.classList.contains('dark');
  const selectStyles = isDark ? getDarkSelectStyles(error) : getSelectStyles(error);

  return (
    <div className={className}>
      <AsyncSelect
        ref={ref}
        loadOptions={loadOptions}
        onChange={onChange}
        onBlur={onBlur}
        defaultOptions={defaultOptions}
        styles={selectStyles}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        {...(value !== undefined && value !== null ? { value } : {})}
        classNamePrefix="react-select"
        cacheOptions
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {typeof error === 'string' ? error : (error as any)?.message || 'Invalid selection'}
        </p>
      )}
      {!error && hint && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
});

ReactAsyncSelectComponent.displayName = 'ReactAsyncSelect';

/**
 * Async Creatable Select Component
 * For loading options asynchronously AND allowing users to create new options
 */
export const ReactAsyncCreatableSelectComponent = forwardRef<
  any,
  AsyncReactSelectProps & {
    onCreateOption?: (inputValue: string) => void;
  }
>(({
  options,
  loadOptions,
  onChange,
  onBlur,
  onCreateOption,
  error,
  hint,
  label,
  required,
  className,
  isDisabled,
  isLoading,
  isClearable = true,
  isSearchable = true,
  placeholder = 'Search or create...',
  value,
  defaultOptions = true,
  ...props
}, ref) => {
  const isDark = document.documentElement.classList.contains('dark');
  const selectStyles = isDark ? getDarkSelectStyles(error) : getSelectStyles(error);

  const handleCreateOption = (inputValue: string) => {
    const newOption: SelectOption = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, '_'),
    };
    onCreateOption?.(inputValue);
    onChange?.(newOption);
  };

  return (
    <div className={className}>
      <AsyncCreatableSelect
        ref={ref}
        loadOptions={loadOptions}
        onChange={onChange}
        onBlur={onBlur}
        onCreateOption={handleCreateOption}
        defaultOptions={defaultOptions}
        styles={selectStyles}
        isDisabled={isDisabled || isLoading}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        {...(value !== undefined && value !== null ? { value } : {})}
        classNamePrefix="react-select"
        cacheOptions
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error-500 dark:text-error-400">
          {typeof error === 'string' ? error : (error as any)?.message || 'Invalid selection'}
        </p>
      )}
      {!error && hint && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
});

ReactAsyncCreatableSelectComponent.displayName = 'ReactAsyncCreatableSelect';

export default ReactSelectComponent;
