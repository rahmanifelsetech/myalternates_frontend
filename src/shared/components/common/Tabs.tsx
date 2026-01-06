import React, { useState } from 'react';
import Button from '../ui/button/Button';

interface Tab {
  label: string;
  content: React.ReactNode;
  hasError?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
  activeTab?: number;
  onChange?: (index: number) => void;
  className?: string;
  variant?: 'default' | 'full-width';
}

export const Tabs: React.FC<TabsProps> = ({ tabs, initialTab = 0, activeTab: controlledActiveTab, onChange, className, variant = 'default' }) => {
  const [internalActiveTab, setInternalActiveTab] = useState(initialTab);

  const currentTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (index: number) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(index);
    }
    onChange?.(index);
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className={`-mb-px flex ${variant === 'full-width' ? 'w-full' : 'space-x-8'} overflow-auto ${className}`} aria-label="Tabs">
          {tabs.map((tab, index) => (
            <Button
                variant='plain'
                key={tab.label}
                type="button"
                onClick={() => handleTabClick(index)}
                className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all rounded-none
                    ${variant === 'full-width' ? 'flex-1 text-center' : ''}
                    ${currentTab === index
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : tab.hasError
                    ? 'border-error-500 text-error-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
                `}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div key={tab.label} className={currentTab === index ? 'block' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};