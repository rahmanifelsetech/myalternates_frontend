import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ComponentCard from '@shared/components/common/ComponentCard';

export interface DistributionItem {
  name: string;
  value: number;
  percentage: number;
}

export interface DistributionPieChartProps {
  title?: string;
  data: DistributionItem[];
  colors?: string[];
  height?: number;
}

export const DistributionPieChart: React.FC<DistributionPieChartProps> = ({
  title = 'Distribution',
  data,
  colors = ['#465fff', '#fdb022', '#32d583', '#fd853a'],
  height = 220,
}) => {
  const options: ApexOptions = useMemo(
    () => ({
      colors,
      labels: data.map((item) => item.name),
      chart: {
        fontFamily: 'Outfit, sans-serif',
        type: 'donut',
        height,
        sparkline: {
          enabled: false,
        },
      },
      stroke: {
        show: false,
        width: 0,
        colors: ['transparent'],
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: false,
              },
              total: {
                show: false,
              },
            },
          },
          expandOnClick: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "darken",
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
      // tooltip: {
      //   y: {
      //     formatter: (val: number) => `${val}%`,
      //   },
      // },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
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
      responsive: [
        {
          breakpoint: 640,
          options: {
            legend: {
              itemMargin: {
                horizontal: 6,
                vertical: 3,
              },
              fontSize: '11px',
            },
          },
        },
      ],
    }),
    [data, colors, height]
  );

  const series = data.map((item) => item.value);

  return (
    <ComponentCard title={title}>
      <div className="flex justify-center">
        <div className="w-full">
          <Chart options={options} series={series} type="donut" height={height} />
        </div>
      </div>
    </ComponentCard>
  );
};

export default DistributionPieChart;
