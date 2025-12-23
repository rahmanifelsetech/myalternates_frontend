// import { useState } from "react";
// import Select from "react-select";
// import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";
// import { countryList } from "@/constants/countries.constant";
// import { SelectOption } from "../select/ReactSelect";

// interface PhoneInputProps {
//   placeholder?: string;
//   onChange?: (phoneNumber: string) => void;
//   selectPosition?: "start" | "end";
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   placeholder = "+1 (555) 000-0000",
//   onChange,
//   selectPosition = "start",
// }) => {
//   // Convert countryList to SelectOption format
//   const countryOptions: SelectOption[] = countryList.map((country) => ({
//     label: country.dialCode,
//     value: country.value,
//   }));

//   const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(
//     countryOptions[countryList.findIndex((c) => c.value === "US")] || countryOptions[0]
//   );
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [displayNumber, setDisplayNumber] = useState<string>("");

//   const handleCountryChange = (option: SelectOption | null) => {
//     if (option) {
//       setSelectedCountry(option);
//       // Parse and format with new country
//       const formattedNumber = formatPhoneNumberWithCountry(phoneNumber, option.value as string);
//       if (onChange) {
//         onChange(formattedNumber);
//       }
//     }
//   };

//   const formatPhoneNumberWithCountry = (digits: string, countryCode: string): string => {
//     if (!digits) return "";
    
//     try {
//       // Try to parse the phone number
//       const parsed = parsePhoneNumber(digits, countryCode as any);
      
//       if (parsed && isValidPhoneNumber(digits, countryCode as any)) {
//         // Store only digits, display formatted
//         const digitOnly = parsed.number.toString().replace(/\D/g, "");
//         setDisplayNumber(parsed.formatInternational());
//         return digitOnly;
//       }
//     } catch (error) {
//       // If parsing fails, just return digits
//     }
    
//     // Return only digits if parsing fails
//     const digitOnly = digits.replace(/\D/g, "");
//     setDisplayNumber(digits);
//     return digitOnly;
//   };

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     const digitOnly = inputValue.replace(/\D/g, "");
    
//     setPhoneNumber(digitOnly);
    
//     if (selectedCountry?.value) {
//       const formattedNumber = formatPhoneNumberWithCountry(digitOnly, selectedCountry.value as string);
//       if (onChange) {
//         onChange(formattedNumber);
//       }
//     }
//   };

//   // Custom styles for react-select to match input field
//   const selectStyles = {
//     control: (base: any) => ({
//       ...base,
//       minHeight: "44px",
//       borderRadius: selectPosition === "start" ? "0.5rem 0 0 0.5rem" : "0 0.5rem 0.5rem 0",
//       borderColor: "var(--color-gray-300)",
//       backgroundColor: "transparent",
//       borderLeft: selectPosition === "start" ? "1px solid var(--color-gray-300)" : "none",
//       borderRight: selectPosition === "end" ? "1px solid var(--color-gray-300)" : "none",
//       boxShadow: "none",
//       "&:hover": {
//         borderColor: "var(--color-gray-400)",
//       },
//       "&:focus-within": {
//         borderColor: "var(--color-brand-500)",
//         boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)",
//       },
//     }),
//     input: (base: any) => ({
//       ...base,
//       color: "var(--color-gray-700)",
//       fontSize: "0.875rem",
//     }),
//     placeholder: (base: any) => ({
//       ...base,
//       color: "var(--color-gray-400)",
//       fontSize: "0.875rem",
//     }),
//     singleValue: (base: any) => ({
//       ...base,
//       color: "var(--color-gray-700)",
//       fontSize: "0.875rem",
//     }),
//     option: (base: any, state: any) => ({
//       ...base,
//       backgroundColor: state.isSelected 
//         ? "var(--color-brand-500)" 
//         : state.isFocused 
//         ? "var(--color-gray-100)"
//         : "white",
//       color: state.isSelected ? "white" : "var(--color-gray-700)",
//       cursor: "pointer",
//       fontSize: "0.875rem",
//     }),
//     menuList: (base: any) => ({
//       ...base,
//       fontSize: "0.875rem",
//     }),
//   };

//   // Dark mode styles
//   const isDark = document.documentElement.classList.contains("dark");
//   const darkSelectStyles = isDark
//     ? {
//         control: (base: any) => ({
//           ...base,
//           minHeight: "44px",
//           borderRadius: selectPosition === "start" ? "0.5rem 0 0 0.5rem" : "0 0.5rem 0.5rem 0",
//           borderColor: "var(--color-gray-700)",
//           backgroundColor: "var(--color-gray-900)",
//           borderRight: selectPosition === "start" ? "1px solid var(--color-gray-700)" : "none",
//           borderLeft: selectPosition === "end" ? "1px solid var(--color-gray-700)" : "none",
//           boxShadow: "none",
//           "&:hover": {
//             borderColor: "var(--color-gray-600)",
//           },
//           "&:focus-within": {
//             borderColor: "var(--color-brand-500)",
//             boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.1)",
//           },
//         }),
//         input: (base: any) => ({
//           ...base,
//           color: "var(--color-gray-100)",
//           fontSize: "0.875rem",
//         }),
//         placeholder: (base: any) => ({
//           ...base,
//           color: "var(--color-gray-400)",
//           fontSize: "0.875rem",
//         }),
//         singleValue: (base: any) => ({
//           ...base,
//           color: "var(--color-gray-100)",
//           fontSize: "0.875rem",
//         }),
//         option: (base: any, state: any) => ({
//           ...base,
//           backgroundColor: state.isSelected 
//             ? "var(--color-brand-500)" 
//             : state.isFocused 
//             ? "var(--color-gray-800)"
//             : "var(--color-gray-900)",
//           color: state.isSelected ? "white" : "var(--color-gray-100)",
//           cursor: "pointer",
//           fontSize: "0.875rem",
//         }),
//         menuList: (base: any) => ({
//           ...base,
//           backgroundColor: "var(--color-gray-900)",
//           fontSize: "0.875rem",
//         }),
//       }
//     : selectStyles;

//   return (
//     <div className="relative flex">
//       {selectPosition === "start" && (
//         <div className="w-34">
//           <Select
//             options={countryOptions}
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             styles={darkSelectStyles}
//             isSearchable={false}
//             isClearable={false}
//             classNamePrefix="react-select"
//           />
//         </div>
//       )}

//       <input
//         type="tel"
//         value={displayNumber}
//         onChange={handlePhoneNumberChange}
//         placeholder={placeholder}
//         className={`h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
//         style={{ borderRadius: selectPosition === "start" ? "0 0.5rem 0.5rem 0" : "0.5rem 0 0 0.5rem" }}
//       />

//       {selectPosition === "end" && (
//         <div className="w-34">
//           <Select
//             options={countryOptions}
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             styles={darkSelectStyles}
//             isSearchable={false}
//             isClearable={false}
//             classNamePrefix="react-select"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhoneInput;


// import { useEffect, useState } from "react";
// import Select from "react-select";
// import { parsePhoneNumberFromString } from "libphonenumber-js";
// import { countryList } from "@/constants/countries.constant";
// import { SelectOption } from "../select/ReactSelect";

// interface ExtendedSelectOption extends SelectOption {
//   countryName: string;
// }

// interface PhoneInputProps {
//   value?: string;              // "15551234567"
//   countryCode?: string;        // "1"
//   placeholder?: string;
//   onChange?: (phoneNumber: string) => void;
//   onCountryChange?: (dialCode: string) => void;
//   selectPosition?: "start" | "end";
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   value,
//   countryCode,
//   placeholder = "+1 (555) 000-0000",
//   onChange,
//   onCountryChange,
//   selectPosition = "start",
// }) => {

//   useEffect(() => {
//     if (!value) {
//       setPhoneNumber("");
//       setDisplayNumber("");
//       return;
//     }

//     try {
//       // value = "15551234567" // countrycode + number
//       const parsed = parsePhoneNumberFromString("+" + value);
//       if (parsed) {
//         // sync country
//         const foundCountry = countryOptions.find(
//           (c) => c.label.replace("+", "") === parsed.countryCallingCode
//         );

//         if (foundCountry) {
//           setSelectedCountry(foundCountry);
//         }

//         // sync number (NO +, NO dial code)
//         setPhoneNumber(parsed.nationalNumber);
//         setDisplayNumber(parsed.nationalNumber);
//       }
//     } catch {
//       // fallback
//       setPhoneNumber(value);
//       setDisplayNumber(value);
//     }
//   }, [value]);
  
//   /** ---------------------------------------
//    * Country options
//    * --------------------------------------*/
//   const countryOptions: ExtendedSelectOption[] = countryList.map((country) => ({
//     label: country.dialCode, // +1
//     value: country.value,   // US
//     countryName: country.label,
//   }));

//   const [selectedCountry, setSelectedCountry] =
//     useState<ExtendedSelectOption | null>(
//       countryOptions.find((c) => c.value === "US") || countryOptions[0]
//     );

//   const [phoneNumber, setPhoneNumber] = useState<string>(""); // digits only
//   const [displayNumber, setDisplayNumber] = useState<string>("");

//   /** ---------------------------------------
//    * Helpers
//    * --------------------------------------*/
//   const formatPhoneNumberWithCountry = (digits: string, countryCode: string): string => {
//     if (!digits) {
//       setDisplayNumber("");
//       return "";
//     }

//     try {
//       const parsed = parsePhoneNumberFromString(digits, countryCode as any);

//       if (parsed?.isValid()) {
//         // ✔ display ONLY national number (no +, no dial code)
//         setDisplayNumber(parsed.nationalNumber);

//         // ✔ store ONLY digits (country code + national number)
//         return `${parsed.countryCallingCode}${parsed.nationalNumber}`;
//       }
//     } catch {
//       // ignore
//       console.error("Phone number parsing failed");
//     }

//     // fallback
//     const digitOnly = digits.replace(/\D/g, "");
//     setDisplayNumber(digitOnly);
//     return digitOnly;
//   };

//   /** ---------------------------------------
//    * Handlers
//    * --------------------------------------*/
//   const handleCountryChange = (option: ExtendedSelectOption | null) => {
//     // if (!option) return;

//     // setSelectedCountry(option);
    
//     // // Notify parent of country change (pass dial code)
//     // onCountryChange?.(option.label);

//     // if (phoneNumber) {
//     //   const formatted = formatPhoneNumberWithCountry(
//     //     phoneNumber,
//     //     option.value.toString()
//     //   );
//     //   onChange?.(formatted);
//     // }
//     if (!option) return;

//     setSelectedCountry(option);
//     onCountryChange?.(option.label.replace("+", ""));

//     if (phoneNumber) {
//       const storedValue = formatPhoneNumberWithCountry(
//         phoneNumber,
//         option.value as string
//       );
//       onChange?.(storedValue);
//     }
    
//   };

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value.replace(/\D/g, "");

//     setPhoneNumber(inputValue);

//     if (selectedCountry?.value) {
//       const storedValue = formatPhoneNumberWithCountry(
//         inputValue,
//         selectedCountry.value as string
//       );

//       onChange?.(storedValue);
//     }
//   }

//   /** ---------------------------------------
//    * react-select rendering & search
//    * --------------------------------------*/
//   // const formatCountryOption = (option: ExtendedSelectOption) => (
//   //   <div className="flex flex-col leading-tight">
//   //     <span className="text-sm font-medium">{option.label}</span>
//   //     <span className="text-xs text-gray-500 dark:text-gray-400">
//   //       {option.countryName}
//   //     </span>
//   //   </div>
//   // );

//   const formatCountryOption = (
//     option: ExtendedSelectOption,
//     { context }: { context: "menu" | "value" }
//   ) => {
//     if (context === "value") {
//       // Selected value → ONLY dial code
//       return <span className="text-sm font-medium">{option.label}</span>;
//     }

//     // Dropdown menu → dial code + country name
//     return (
//       <div className="flex flex-col leading-tight">
//         <span className="text-sm font-medium">{option.label}</span>
//         <span className="text-xs text-gray-500 dark:text-gray-400">
//           {option.countryName}
//         </span>
//       </div>
//     );
//   };


//   const filterCountryOption = (
//     option: any,
//     inputValue: string
//   ) => {
//     const search = inputValue.toLowerCase();
//     const data = option.data as ExtendedSelectOption;

//     return (
//       data.label.toLowerCase().includes(search) ||
//       data.countryName.toLowerCase().includes(search) ||
//       data.value.toString().toLowerCase().includes(search)
//     );
//   };

//   /** ---------------------------------------
//    * Styles (UNCHANGED)
//    * --------------------------------------*/
//   const selectStyles = {
//     control: (base: any) => ({
//       ...base,
//       minHeight: "44px",
//       borderRadius:
//         selectPosition === "start"
//           ? "0.5rem 0 0 0.5rem"
//           : "0 0.5rem 0.5rem 0",
//       borderColor: "var(--color-gray-300)",
//       backgroundColor: "transparent",
//       borderLeft:
//         selectPosition === "start"
//           ? "1px solid var(--color-gray-300)"
//           : "none",
//       borderRight:
//         selectPosition === "end"
//           ? "1px solid var(--color-gray-300)"
//           : "none",
//       boxShadow: "none",
//     }),
//   };

//   const isDark =
//     typeof document !== "undefined" &&
//     document.documentElement.classList.contains("dark");

//   const darkSelectStyles = isDark
//     ? {
//         control: (base: any) => ({
//           ...base,
//           minHeight: "44px",
//           backgroundColor: "var(--color-gray-900)",
//           borderColor: "var(--color-gray-700)",
//         }),
//       }
//     : selectStyles;

//   /** ---------------------------------------
//    * Render
//    * --------------------------------------*/
//   return (
//     <div className="relative flex w-full">
//       {selectPosition === "start" && (
//         <div className="w-24 shrink-0">
//           <Select
//             options={countryOptions}
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             styles={darkSelectStyles}
//             isSearchable
//             isClearable={false}
//             formatOptionLabel={formatCountryOption}
//             filterOption={filterCountryOption}
//             classNamePrefix="react-select"
//           />
//         </div>
//       )}

//       <input
//         type="tel"
//         value={displayNumber}
//         onChange={handlePhoneNumberChange}
//         onBlur={() => {
//           if (selectedCountry?.value) {
//             formatPhoneNumberWithCountry(
//               phoneNumber,
//               selectedCountry.value.toString()
//             );
//           }
//         }}
//         placeholder={placeholder}
//         className="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
//         style={{
//           borderRadius:
//             selectPosition === "start"
//               ? "0 0.5rem 0.5rem 0"
//               : "0.5rem 0 0 0.5rem",
//         }}
//       />

//       {selectPosition === "end" && (
//         <div className="w-24 shrink-0">
//           <Select
//             options={countryOptions}
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             styles={darkSelectStyles}
//             isSearchable
//             isClearable={false}
//             formatOptionLabel={formatCountryOption}
//             filterOption={filterCountryOption}
//             classNamePrefix="react-select"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhoneInput;



import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { parsePhoneNumberFromString, isValidPhoneNumber } from "libphonenumber-js";
import { countryList } from "@shared/constants/countries.constant";
import { SelectOption } from "../select/ReactSelect";

interface ExtendedSelectOption extends SelectOption {
  countryName: string;
}

interface PhoneInputProps {
  value?: string;
  countryCode?: string;
  placeholder?: string;
  codeDisabled?: boolean;
  phoneDisabled?: boolean;
  codeClassName?: string;
  onChange?: (phoneNumber: string) => void;
  onCountryChange?: (dialCode: string) => void;
  selectPosition?: "start" | "end";
  disabled?: boolean;
  onError?: (error: string | null) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  countryCode,
  placeholder = "+91 983*** **49",
  codeDisabled = false,
  phoneDisabled = false,
  codeClassName = "",
  onChange,
  onCountryChange,
  selectPosition = "start",
  disabled = false,
  onError,
}) => {
  const countryOptions: ExtendedSelectOption[] = useMemo(
    () =>
      countryList.map((country) => ({
        label: country.dialCode,
        value: country.value,
        countryName: country.label,
      })),
    []
  );

  const [selectedCountry, setSelectedCountry] = useState<ExtendedSelectOption | null>(
    () => countryOptions.find((c) => c.value === "IN") || countryOptions[0]
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [displayNumber, setDisplayNumber] = useState<string>("");
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!value) {
      setPhoneNumber("");
      setDisplayNumber("");
      setError(null);
      onError?.(null);
      return;
    }

    try {
      const parsed = parsePhoneNumberFromString("+" + value);
      if (parsed && parsed.isValid()) {
        const foundCountry = countryOptions.find(
          (c) => c.label.replace("+", "") === parsed.countryCallingCode
        );

        if (foundCountry) {
          setSelectedCountry(foundCountry);
        }

        setPhoneNumber(parsed.nationalNumber);
        setDisplayNumber(parsed.nationalNumber);
        setError(null);
        onError?.(null);
      }
    } catch (error) {
      console.error("Phone number parsing failed:", error);
      setPhoneNumber(value);
      setDisplayNumber(value);
    }
  }, [value, countryOptions, onError]);

  useEffect(() => {
    if (countryCode) {
      const foundCountry = countryOptions.find(
        (c) => c.label.replace("+", "") === countryCode
      );
      if (foundCountry && foundCountry.value !== selectedCountry?.value) {
        setSelectedCountry(foundCountry);
      }
    }
  }, [countryCode, countryOptions, selectedCountry?.value]);

  const formatPhoneNumberWithCountry = (
    digits: string,
    countryISOCode: string
  ): string => {
    if (!digits) {
      return "";
    }

    try {
      const parsed = parsePhoneNumberFromString(digits, countryISOCode as any);

      if (parsed?.isValid()) {
        return `${parsed.countryCallingCode}${parsed.nationalNumber}`;
      }
    } catch (error) {
      console.error("Phone number formatting failed:", error);
    }

    return digits.replace(/\D/g, "");
  };

  const validatePhoneNumber = (
    phoneDigits: string,
    countryISOCode: string
  ): boolean => {
    if (!phoneDigits) {
      return false;
    }

    try {
      return isValidPhoneNumber(phoneDigits, countryISOCode as any);
    } catch (error) {
      console.error("Phone validation failed:", error);
      return false;
    }
  };

  const handleCountryChange = (option: ExtendedSelectOption | null) => {
    if (!option) return;

    setSelectedCountry(option);
    onCountryChange?.(option.label.replace("+", ""));

    if (phoneNumber) {
      const storedValue = formatPhoneNumberWithCountry(
        phoneNumber,
        option.value as string
      );
      onChange?.(storedValue);

      const isValid = validatePhoneNumber(
        phoneNumber,
        option.value as string
      );
      console.log("Validating on country change:", isValid);
      if (!isValid) {
        const errorMsg = "Invalid phone number for this country";
        setError(errorMsg);
        onError?.(errorMsg);
      } else {
        setError(null);
        onError?.(null);
      }

    }

  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    setPhoneNumber(inputValue);
    setDisplayNumber(inputValue);

    if (selectedCountry?.value) {
      const storedValue = formatPhoneNumberWithCountry(
        inputValue,
        selectedCountry.value as string
      );
      onChange?.(storedValue);

      const isValid = validatePhoneNumber(
        phoneNumber,
        selectedCountry.value as string
      );

      if (!isValid) {
        const errorMsg = "Invalid phone number for the selected country";
        setError(errorMsg);
        onError?.(errorMsg);
      } else {
        setError(null);
        onError?.(null);
      }

    }
  };

  // const handlePhoneNumberBlur = () => {
  //   if (phoneNumber && selectedCountry?.value) {
  //     const isValid = validatePhoneNumber(
  //       phoneNumber,
  //       selectedCountry.value as string
  //     );

  //     if (!isValid) {
  //       const errorMsg = "Invalid phone number for the selected country";
  //       setError(errorMsg);
  //       onError?.(errorMsg);
  //     } else {
  //       setError(null);
  //       onError?.(null);
  //     }
  //   } else if (phoneNumber) {
  //     const errorMsg = "Phone number is required";
  //     setError(errorMsg);
  //     onError?.(errorMsg);
  //   }
  // };

  // const handleCountryBlur = () => {
  //   if (phoneNumber && selectedCountry?.value) {
  //     const isValid = validatePhoneNumber(
  //       phoneNumber,
  //       selectedCountry.value as string
  //     );

  //     if (!isValid) {
  //       const errorMsg = "Invalid phone number for this country";
  //       setError(errorMsg);
  //       onError?.(errorMsg);
  //     }
  //   }
  // };

  const formatCountryOption = (
    option: ExtendedSelectOption,
    { context }: { context: "menu" | "value" }
  ) => {
    if (context === "value") {
      return <span className="text-sm font-medium">{option.label}</span>;
    }

    return (
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">{option.label}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {option.countryName}
        </span>
      </div>
    );
  };

  const filterCountryOption = (option: any, inputValue: string) => {
    const search = inputValue.toLowerCase();
    const data = option.data as ExtendedSelectOption;

    return (
      data.label.toLowerCase().includes(search) ||
      data.countryName.toLowerCase().includes(search) ||
      data.value.toString().toLowerCase().includes(search)
    );
  };

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "44px",
      borderRadius:
        selectPosition === "start"
          ? "0.5rem 0 0 0.5rem"
          : "0 0.5rem 0.5rem 0",
      borderColor: error 
        ? "var(--color-red-500)" 
        : isDark ? "var(--color-gray-700)" : "var(--color-gray-300)",
      backgroundColor: isDark ? "var(--color-gray-900)" : "transparent",
      borderLeft:
        selectPosition === "start"
          ? `1px solid ${error ? "var(--color-red-500)" : isDark ? "var(--color-gray-700)" : "var(--color-gray-300)"}`
          : "none",
      borderRight:
        selectPosition === "end"
          ? `1px solid ${error ? "var(--color-red-500)" : isDark ? "var(--color-gray-700)" : "var(--color-gray-300)"}`
          : "none",
      boxShadow: "none",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? "var(--color-gray-100)" : "var(--color-gray-700)",
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? "var(--color-gray-100)" : "var(--color-gray-700)",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? "var(--color-gray-900)" : "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--color-brand-500)"
        : state.isFocused
        ? isDark ? "var(--color-gray-800)" : "var(--color-gray-100)"
        : isDark ? "var(--color-gray-900)" : "white",
      color: state.isSelected
        ? "white"
        : isDark ? "var(--color-gray-100)" : "var(--color-gray-700)",
    }),
  };

  return (
    <div className="relative w-full">
      <div className="relative flex w-full">
        {selectPosition === "start" && (
          <div className={`w-24 shrink-0 ${codeClassName}`}>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              styles={selectStyles}
              isSearchable
              isClearable={false}
              isDisabled={codeDisabled || disabled}
              formatOptionLabel={formatCountryOption}
              filterOption={filterCountryOption}
              classNamePrefix="react-select"
            />
          </div>
        )}

        <input
          type="tel"
          value={displayNumber}
          onChange={handlePhoneNumberChange}
          // onBlur={handlePhoneNumberBlur}
          disabled={phoneDisabled || disabled}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border py-3 px-4 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? "border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500 dark:bg-red-900/20 dark:text-red-200 dark:focus:border-red-500"
              : "border-gray-300 bg-transparent text-gray-800 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          }`}
          style={{
            borderRadius:
              selectPosition === "start"
                ? "0 0.5rem 0.5rem 0"
                : "0.5rem 0 0 0.5rem",
          }}
        />

        {selectPosition === "end" && (
          <div className={`w-24 shrink-0 ${codeClassName}`}>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              styles={selectStyles}
              isSearchable
              isClearable={false}
              isDisabled={disabled}
              formatOptionLabel={formatCountryOption}
              filterOption={filterCountryOption}
              classNamePrefix="react-select"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;