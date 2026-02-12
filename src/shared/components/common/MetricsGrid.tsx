import React from "react";
import Badge from "../ui/badge/Badge";
import { typographyClasses } from "@shared/utils/typographyUtils";

export type MetricDirection = "up" | "down" | "neutral";

export interface MetricItem {
  id?: string | number;
  title?: string | React.ReactNode;
  value: string | number | React.ReactNode;
  change?: string;
  direction?: MetricDirection;
  comparisonText?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
  cardClass?: string;
}

export interface MetricsGridProps {
    metrics: MetricItem[];
    columns?: 1 | 2 | 3 | 4;
    labelPosition?: "top" | "bottom";
    contentPosition?: "left" | "center" | "right";
}

const getBadgeColor = (
  direction?: MetricDirection
): "success" | "error" | "warning" => {
  switch (direction) {
    case "up":
      return "success";
    case "down":
      return "error";
    default:
      return "warning";
  }
};

const getGridColumns = (columns?: number): string => {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
    default:
      return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
  }
};

const MetricsGrid: React.FC<MetricsGridProps> = ({ 
  metrics, 
  columns = 4,
  labelPosition = "bottom",
  contentPosition = "left"
}) => {
  const isLabelOnTop = labelPosition === "top";
  const contentAlignment = contentPosition === "center" ? "flex flex-col items-center justify-center" : contentPosition === "right" ? "flex flex-col items-end justify-end" : "flex flex-col items-start justify-start";

  return (
    <div className={`grid ${getGridColumns(columns)} gap-4 md:gap-6`}>
      {metrics.map((item) => (
        <div
          key={item.id || item.title?.toString() || Math.random().toString(36).substr(2, 9)}
          className={`flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] ${item.cardClass}`}
        >
          {/* Icon */}
          {item.icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
              {item.icon}
            </div>
          )}

          {/* Content */}
          <div className={`flex-1 ${contentAlignment}`}>
            {isLabelOnTop ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  {item.title && (
                    <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} ${item.labelClassName || ""}`}>
                      {item.title}
                    </span>
                  )}
                  {(item.change || item.direction) && (
                    <Badge color={getBadgeColor(item.direction)}>
                      <span className={typographyClasses.component.badge}>
                        {item.change}
                      </span>
                    </Badge>
                  )}
                </div>
                <div className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} ${item.valueClassName || ""}`}>
                  {item.value}
                </div>
              </>
            ) : (
              <>
                <div className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} ${item.valueClassName || ""}`}>
                  {item.value}
                </div>
                <div className="flex items-center justify-between gap-2">
                  {item.title && (
                    <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} ${item.labelClassName || ""}`}>
                      {item.title}
                    </span>
                  )}
                  {(item.change || item.direction) && (
                    <Badge color={getBadgeColor(item.direction)}>
                      <span className={typographyClasses.component.badge}>
                        {item.change}
                      </span>
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
