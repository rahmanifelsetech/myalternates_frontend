import React from 'react';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

export interface CategoryItem {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

export interface CategoryBarProps {
  title?: string;
  data: CategoryItem[];
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  title = 'Categorization',
  data,
}) => {
  return (
    <ComponentCard title={title}>
      <div className="space-y-4">
        {/* Horizontal Bar Chart */}
        <div className="flex h-8 w-full gap-px overflow-hidden rounded-lg">
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              title={`${item.name} ${item.percentage}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.secondary}`}>
                {item.name} <span className={`font-semibold ${typographyClasses.colors.text.primary}`}>{item.percentage}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </ComponentCard>
  );
};

export default CategoryBar;
