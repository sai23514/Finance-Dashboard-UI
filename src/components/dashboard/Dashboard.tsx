import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { SummaryCard } from './SummaryCard';
import { BalanceTrendChart } from './BalanceTrendChart';
import { SpendingBreakdownChart } from './SpendingBreakdownChart';
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  getCategoryBreakdown,
  getBalanceTrendData,
  formatCurrency,
  getCurrentMonthTransactions,
  getPreviousMonthTransactions,
} from '../../utils/calculations';

export const Dashboard: React.FC = () => {
  const { transactions } = useApp();

  const currentMonthTxns = useMemo(
    () => getCurrentMonthTransactions(transactions),
    [transactions]
  );

  const previousMonthTxns = useMemo(
    () => getPreviousMonthTransactions(transactions),
    [transactions]
  );

  const totalBalance = useMemo(
    () => calculateTotalBalance(transactions),
    [transactions]
  );

  const totalIncome = useMemo(
    () => calculateTotalIncome(currentMonthTxns),
    [currentMonthTxns]
  );

  const totalExpenses = useMemo(
    () => calculateTotalExpenses(currentMonthTxns),
    [currentMonthTxns]
  );

  const previousMonthExpenses = useMemo(
    () => calculateTotalExpenses(previousMonthTxns),
    [previousMonthTxns]
  );

  const expensesTrend = useMemo(() => {
    if (previousMonthExpenses === 0) return null;
    const change = ((totalExpenses - previousMonthExpenses) / previousMonthExpenses) * 100;
    return {
      value: change,
      isPositive: change < 0, // Lower expenses is positive
    };
  }, [totalExpenses, previousMonthExpenses]);

  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(currentMonthTxns),
    [currentMonthTxns]
  );

  const balanceTrendData = useMemo(
    () => getBalanceTrendData(transactions),
    [transactions]
  );

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Wallet className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Transactions Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {useApp().userRole === 'admin'
              ? 'Start by adding your first transaction!'
              : 'No data available to display.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          color="blue"
        />
        <SummaryCard
          title="Income (This Month)"
          value={formatCurrency(totalIncome)}
          icon={TrendingUp}
          color="green"
        />
        <SummaryCard
          title="Expenses (This Month)"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          color="red"
          trend={expensesTrend || undefined}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart data={balanceTrendData} />
        <SpendingBreakdownChart data={categoryBreakdown} />
      </div>
    </div>
  );
};
