import React from 'react';

interface FormSectionProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};