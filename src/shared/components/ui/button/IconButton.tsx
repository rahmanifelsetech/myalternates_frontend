import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...props }) => {
  return (
    <button
      type="button"
      className={twMerge(
        "flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors duration-200",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};