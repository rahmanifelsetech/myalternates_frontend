import React, { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

export interface PerformanceData {
  periods: string[];
  indexPerformance: number[];
  consolidatedPerformance: number[];
}

export interface PerformanceBarChartProps {
  title?: string;
  data: PerformanceData;
  selectedIndex: string;
  indexOptions: { value: string; label: string }[];
  onIndexChange: (index: string) => void;
}

export const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({
  title = 'Performance',
  data,
  selectedIndex,
  indexOptions,
  onIndexChange,
}) => {
  const options: ApexOptions = useMemo(
    () => ({
      colors: ['#C9A641', '#2C2C2C'],
      chart: {
        fontFamily: 'Outfit, sans-serif',
        type: 'bar',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: data.periods,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            fontSize: '11px',
            fontFamily: 'Outfit, sans-serif',
            colors: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
        labels: {
          formatter: (val: number) => `${val.toFixed(0)}%`,
          style: {
            fontSize: '11px',
          },
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Outfit',
        fontSize: '13px',
        fontWeight: 400,
        markers: {
          size: 5,
          shape: 'circle',
          strokeWidth: 0,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 4,
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          show: true,
        },
        y: {
          formatter: (val: number) => `${val.toFixed(2)}%`,
        },
      },
    }),
    [data.periods]
  );

  const series = [
    {
      name: 'Index Performance',
      data: data.indexPerformance,
    },
    {
      name: 'Consolidated Portfolio',
      data: data.consolidatedPerformance,
    },
  ];

  return (
    <ComponentCard
      header={
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          <select
            value={selectedIndex}
            onChange={(e) => onIndexChange(e.target.value)}
            className={`rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs ${typographyClasses.body.caption} ${typographyClasses.colors.text.primary} dark:border-gray-700 dark:bg-gray-900 dark:text-white cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}
          >
            {indexOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      }
    >
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[700px]">
          <Chart options={options} series={series} type="bar" height={250} />
        </div>
      </div>
    </ComponentCard>
  );
};

export default PerformanceBarChart;
