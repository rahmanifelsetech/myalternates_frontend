import React, { useState, useEffect, useCallback } from 'react';
import Input from './InputField';

interface DebouncedSearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  debounceDelay?: number;
  className?: string;
}

const DebouncedSearchInput = React.forwardRef<
  HTMLInputElement,
  DebouncedSearchInputProps
>(
  (
    { placeholder = 'Search...', value, onChange, debounceDelay = 300, className },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      const timer = setTimeout(() => {
        onChange(localValue);
      }, debounceDelay);

      return () => clearTimeout(timer);
    }, [localValue, debounceDelay, onChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
      },
      []
    );

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className={className}
      />
    );
  }
);

DebouncedSearchInput.displayName = 'DebouncedSearchInput';

export default DebouncedSearchInput;
