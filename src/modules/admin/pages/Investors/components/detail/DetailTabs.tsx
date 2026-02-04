import React, { useState } from 'react';
import { typographyClasses } from '@shared/utils/typographyUtils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface DetailTabsProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  children: React.ReactNode;
}

export const DetailTabs: React.FC<DetailTabsProps> = ({
  tabs,
  activeTabId: controlledActiveTabId,
  onTabChange,
  children,
}) => {
  const [uncontrolledActiveTabId, setUncontrolledActiveTabId] = useState(tabs[0]?.id || '');
  const activeTabId = controlledActiveTabId ?? uncontrolledActiveTabId;

  const handleTabClick = (tabId: string) => {
    setUncontrolledActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Tabs Header */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex gap-0 overflow-x-auto px-4 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-4 transition-colors
                ${
                  activeTabId === tab.id
                    ? 'border-brand-600 text-brand-600 dark:border-brand-500 dark:text-brand-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span className={`${typographyClasses.body.small} font-medium`}>{tab.label}</span>
              {tab.badge && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900 dark:text-brand-200">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default DetailTabs;
