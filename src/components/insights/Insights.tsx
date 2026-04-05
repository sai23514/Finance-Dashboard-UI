import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt, AlertCircle } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Card } from '../common/Card';
import { calculateInsights, formatCurrency } from '../../utils/calculations';

export const Insights: React.FC = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => calculateInsights(transactions), [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Insights Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add some transactions to see your financial insights.
          </p>
        </div>
      </div>
    );
  }

  const isSpendingUp = insights.monthlyComparison.percentageChange > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Financial Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Key observations from your financial data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Spending Category */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Highest Spending Category
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {insights.highestSpendingCategory.category}
              </p>
              <p className="text-lg text-red-600 dark:text-red-400 font-semibold">
                {formatCurrency(insights.highestSpendingCategory.amount)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This month's largest expense category
              </p>
            </div>
          </div>
        </Card>

        {/* Monthly Comparison */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-4">
            <div
              className={`p-3 rounded-full ${
                isSpendingUp
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-green-100 dark:bg-green-900'
              }`}
            >
              {isSpendingUp ? (
                <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Monthly Spending Trend
              </h3>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.abs(insights.monthlyComparison.percentageChange).toFixed(1)}%
                </p>
                <span
                  className={`text-sm font-medium ${
                    isSpendingUp
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {isSpendingUp ? 'increase' : 'decrease'}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current month:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(insights.monthlyComparison.currentMonth)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Previous month:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(insights.monthlyComparison.previousMonth)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Average Transaction */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Average Transaction
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(insights.averageTransaction)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Average amount per transaction
              </p>
            </div>
          </div>
        </Card>

        {/* Total Transactions */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Receipt className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Transactions
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {insights.totalTransactions}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                All-time transaction count
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 Quick Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Your highest spending is in <strong>{insights.highestSpendingCategory.category}</strong>.
              Consider setting a budget for this category.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              {isSpendingUp
                ? 'Your spending has increased this month. Review your expenses to stay on track.'
                : 'Great job! Your spending has decreased compared to last month.'}
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Track your expenses regularly to maintain better control over your finances.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
