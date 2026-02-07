// import type React from "react";
// import { useEffect, useRef } from "react";

// interface DropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// export const Dropdown: React.FC<DropdownProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className = "",
// }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         !(event.target as HTMLElement).closest(".dropdown-toggle")
//       ) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className={`absolute z-40  right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
//     >
//       {children}
//     </div>
//   );
// };


import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  className?: string;
  dropdownWidth?: number;
  dropdownHeight?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  anchorEl,
  children,
  className = "",
  dropdownWidth = 130,
  dropdownHeight = 120,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  // Position dropdown relative to clicked button
  useEffect(() => {
    if (!isOpen || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    // const dropdownWidth = 180;
    // const dropdownHeight = 120;
    const margin = 6;

    const spaceBelow = window.innerHeight - rect.bottom;
    const top =
      spaceBelow < dropdownHeight
        ? rect.top - dropdownHeight - margin
        : rect.bottom + margin;

    setStyle({
      position: "fixed",
      top,
      left: Math.max(28, rect.right - dropdownWidth),
      zIndex: 9999,
    });
  }, [isOpen, anchorEl]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      style={style}
      className={`rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>,
    document.body
  );
};
