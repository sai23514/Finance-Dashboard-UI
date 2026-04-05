import { Transaction, InsightData, Category } from '../types';
import { startOfMonth, endOfMonth, subMonths, parseISO } from 'date-fns';

export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === 'income'
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const getTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter((t) => {
    const date = parseISO(t.date);
    return date >= startDate && date <= endDate;
  });
};

export const getCurrentMonthTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  return getTransactionsByDateRange(transactions, start, end);
};

export const getPreviousMonthTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const previousMonth = subMonths(now, 1);
  const start = startOfMonth(previousMonth);
  const end = endOfMonth(previousMonth);
  return getTransactionsByDateRange(transactions, start, end);
};

export const getCategoryBreakdown = (transactions: Transaction[]): Record<Category, number> => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const breakdown: Record<string, number> = {};
  
  expenses.forEach((t) => {
    breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
  });
  
  return breakdown as Record<Category, number>;
};

export const calculateInsights = (transactions: Transaction[]): InsightData => {
  const currentMonthTxns = getCurrentMonthTransactions(transactions);
  const previousMonthTxns = getPreviousMonthTransactions(transactions);
  
  const categoryBreakdown = getCategoryBreakdown(currentMonthTxns);
  const highestCategory = Object.entries(categoryBreakdown).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category: category as Category, amount } : max),
    { category: 'Other Expense' as Category, amount: 0 }
  );

  const currentMonthExpenses = calculateTotalExpenses(currentMonthTxns);
  const previousMonthExpenses = calculateTotalExpenses(previousMonthTxns);
  
  const percentageChange = previousMonthExpenses > 0
    ? ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100
    : 0;

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = transactions.length > 0 ? totalAmount / transactions.length : 0;

  return {
    highestSpendingCategory: highestCategory,
    monthlyComparison: {
      currentMonth: currentMonthExpenses,
      previousMonth: previousMonthExpenses,
      percentageChange,
    },
    averageTransaction,
    totalTransactions: transactions.length,
  };
};

export const getBalanceTrendData = (transactions: Transaction[]) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningBalance = 0;
  return sortedTransactions.map((t) => {
    runningBalance += t.type === 'income' ? t.amount : -t.amount;
    return {
      date: t.date,
      balance: runningBalance,
    };
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
