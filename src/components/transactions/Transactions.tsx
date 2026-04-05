import React, { useState, useMemo } from 'react';
import { Plus, Download } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { TransactionFilters } from './TransactionFilters';
import { TransactionList } from './TransactionList';
import { TransactionModal } from './TransactionModal';
import { Button } from '../common/Button';
import { applyFilters } from '../../utils/filters';
import { Transaction } from '../../types';

export const Transactions: React.FC = () => {
  const { transactions, filters, userRole, addTransaction, updateTransaction, deleteTransaction, exportData } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  const filteredTransactions = useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters]
  );

  const handleAddClick = () => {
    setEditingTransaction(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSave = (transaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transaction);
    } else {
      addTransaction(transaction);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => exportData('csv')}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => exportData('json')}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export JSON</span>
          </Button>
          {userRole === 'admin' && (
            <Button
              variant="primary"
              onClick={handleAddClick}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Transaction</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* List */}
      <TransactionList
        transactions={filteredTransactions}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {userRole === 'admin' && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          transaction={editingTransaction}
        />
      )}
    </div>
  );
};
