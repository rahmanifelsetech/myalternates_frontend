import React from 'react';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

export interface Top5Item {
  id: string;
  name: string;
  percentage: number;
}

export interface Top5ListProps {
  title?: string;
  data: Top5Item[];
  onViewAll?: () => void;
  viewAllText?: string;
}

export const Top5List: React.FC<Top5ListProps> = ({
  title = 'Top 5 Items',
  data,
  onViewAll,
  viewAllText = 'View All',
}) => {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <>
        <div className="space-y-3">
            {data?.length ? data.map((item) => (
                <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
                        {item.name}
                    </p>
                    <span className={`${typographyClasses.body.small} font-semibold text-brand-600 dark:text-brand-500`}>
                        {item.percentage.toFixed(1)}%
                    </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-full rounded-full bg-black dark:bg-gray-400"
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                    </div>
                </div>
            )) : (
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} italic`}>
                    No data available
                </p>
            )}
        </div>
        {
            data.length == 5 && (
                <a
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    handleViewAll();
                    }}
                    className={`text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400`}
                >
                    {viewAllText} →
                </a>
            )
        }
    </>
  );
};

export default Top5List;
