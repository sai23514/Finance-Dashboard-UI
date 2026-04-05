import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserRole, FilterState, AppState } from '../types';
import { mockTransactions } from '../data/mockData';

interface AppContextType extends AppState {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setUserRole: (role: UserRole) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  toggleDarkMode: () => void;
  exportData: (format: 'json' | 'csv') => void;
}

const defaultFilters: FilterState = {
  searchTerm: '',
  categoryFilter: 'all',
  typeFilter: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      const parsedTransactions = JSON.parse(saved);
      // Check if we have any April 2026 transactions
      const hasAprilData = parsedTransactions.some((t: Transaction) =>
        t.date.startsWith('2026-04')
      );
      // If no April data, use fresh mock data
      if (!hasAprilData) {
        console.log('🔄 Updating to fresh data with April transactions');
        return mockTransactions;
      }
      return parsedTransactions;
    }
    return mockTransactions;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as UserRole) || 'viewer';
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const exportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(transactions, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = ['ID', 'Date', 'Amount', 'Category', 'Type', 'Description'];
      const csvRows = [
        headers.join(','),
        ...transactions.map((t) =>
          [t.id, t.date, t.amount, t.category, t.type, `"${t.description}"`].join(',')
        ),
      ];
      const csvStr = csvRows.join('\n');
      const dataBlob = new Blob([csvStr], { type: 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const value: AppContextType = {
    transactions,
    userRole,
    filters,
    darkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setUserRole,
    updateFilters,
    resetFilters,
    toggleDarkMode,
    exportData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
