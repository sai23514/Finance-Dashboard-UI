import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserRole, FilterState, AppState } from '../types';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy
} from 'firebase/firestore';

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

  const { user } = useAuth();

  // ✅ Firestore-based transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('userRole');
    return (saved as UserRole) || 'viewer';
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // 🔥 Load transactions from Firestore (real-time)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'transactions'),
      orderBy('date', 'desc')
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as Transaction[];

      setTransactions(data);
    });

    return unsub;
  }, [user]);

  // Persist other settings (still localStorage)
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

  // ➕ Add transaction
  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!user) return;

    await addDoc(
      collection(db, 'users', user.uid, 'transactions'),
      transaction
    );
  };

  // ✏️ Update transaction
  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!user) return;

    await updateDoc(
      doc(db, 'users', user.uid, 'transactions', id),
      updates
    );
  };

  // ❌ Delete transaction
  const deleteTransaction = async (id: string) => {
    if (!user) return;

    await deleteDoc(
      doc(db, 'users', user.uid, 'transactions', id)
    );
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