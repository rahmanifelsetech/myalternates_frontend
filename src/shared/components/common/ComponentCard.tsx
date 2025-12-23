import React from 'react';

interface ComponentCardProps {
  title?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  headerPosition?: 'inside' | 'outside';
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  header,
  children,
  className = "",
  desc = "",
  headerPosition = 'inside',
}) => {
  const HeaderContent = header || (title ? (
    <div className="px-6 py-5">
      <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
        {title}
      </h3>
      {desc && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      )}
    </div>
  ) : null);

  if (headerPosition === 'outside') {
    return (
      <div className={className}>
        {HeaderContent}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {HeaderContent}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
