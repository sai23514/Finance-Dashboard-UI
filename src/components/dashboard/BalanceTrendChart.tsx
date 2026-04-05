import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../common/Card';
import { formatCurrency, formatDate } from '../../utils/calculations';
import { useApp } from '../../hooks/useApp';

interface BalanceTrendChartProps {
  data: { date: string; balance: number }[];
}

export const BalanceTrendChart: React.FC<BalanceTrendChartProps> = ({ data }) => {
  const { darkMode } = useApp();

  const formattedData = data.map((item) => ({
    ...item,
    displayDate: formatDate(item.date),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {payload[0].payload.displayDate}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Balance Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? '#374151' : '#e5e7eb'}
          />
          <XAxis
            dataKey="displayDate"
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
