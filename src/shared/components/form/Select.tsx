import { useState } from "react";
import { typographyClasses } from "@shared/utils/typographyUtils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] =
    useState<string>(defaultValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  let selectClasses = `
    h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-10
    shadow-theme-xs focus:outline-hidden focus:ring-3
    ${typographyClasses.component.input}
    ${typographyClasses.component.placeholder}
    text-sm
    ${className}
  `;

  if (disabled) {
    selectClasses += `
      bg-gray-100
      text-gray-400
      border-gray-200
      cursor-not-allowed
      opacity-60
      dark:bg-gray-800
      dark:text-gray-400
      dark:border-gray-700
    `;
  } else {
    selectClasses += `
      bg-gray-50
      text-gray-400
      border-gray-300
      focus:border-brand-300
      focus:ring-brand-500/20
      dark:bg-gray-900
      dark:text-white/90
      dark:border-gray-700
      dark:focus:border-brand-800
    `;
  }

  return (
    <div className="relative">
      <select
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className={selectClasses}
      >
        {/* Placeholder */}
        <option
          value=""
          disabled
          className="text-gray-400"
        >
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-800 dark:text-white"
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        ▼
      </span>
    </div>
  );
};

export default Select;

// import { useState } from "react";
// import { typographyClasses } from '@shared/utils/typographyUtils';

// interface Option {
//   value: string;
//   label: string;
// }

// interface SelectProps {
//   options: Option[];
//   placeholder?: string;
//   onChange: (value: string) => void;
//   className?: string;
//   defaultValue?: string;
// }

// const Select: React.FC<SelectProps> = ({
//   options,
//   placeholder = "Select an option",
//   onChange,
//   className = "",
//   defaultValue = "",
// }) => {
//   // Manage the selected value
//   const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedValue(value);
//     onChange(value); // Trigger parent handler
//   };

//   return (
//     <select
//       className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ${typographyClasses.component.input} ${typographyClasses.component.placeholder} ${
//         selectedValue
//           ? "text-gray-800 dark:text-white/90"
//           : "text-gray-400 dark:text-gray-400"
//       } ${className}`}
//       value={selectedValue}
//       onChange={handleChange}
//     >
//       {/* Placeholder option */}
//       <option
//         value=""
//         disabled
//         className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
//       >
//         {placeholder}
//       </option>
//       {/* Map over options */}
//       {options.map((option) => (
//         <option
//           key={option.value}
//           value={option.value}
//           className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
//         >
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;
