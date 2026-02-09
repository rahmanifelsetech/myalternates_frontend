import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon, CloseIcon } from "../../icons";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
  value?: string | Date;
  onClear?: () => void;
  error?: boolean;
  hint?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
  value,
  onClear,
  error,
  hint,
}: PropsType) {
  const flatpickrRef = useRef<Instance | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      flatpickrRef.current = flatpickr(inputRef.current, {
        mode: mode || "single",
        static: true,
        monthSelectorType: "static",
        dateFormat: "Y-m-d",
        defaultDate: value || defaultDate,
        onChange,
      });
    }

    return () => {
      flatpickrRef.current?.destroy();
    };
  }, [mode, onChange, defaultDate]);

  useEffect(() => {
    if (flatpickrRef.current) {
      if (value) {
        flatpickrRef.current.setDate(value, true);
      } else {
        flatpickrRef.current.clear();
      }
    }
  }, [value]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {value && onClear && (
            <button
              type="button"
              className="mr-2 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <CloseIcon className="size-4" />
            </button>
          )}
          <span className="text-gray-500 pointer-events-none dark:text-gray-400">
            <CalenderIcon className="size-6" />
          </span>
        </div>
      </div>
      {hint && (
        <p className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {hint}
        </p>
      )}
    </div>
  );
}
