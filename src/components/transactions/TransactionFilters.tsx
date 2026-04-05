import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Category } from '../../types';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Salary', label: 'Salary' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Other Income', label: 'Other Income' },
  { value: 'Food & Dining', label: 'Food & Dining' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Bills & Utilities', label: 'Bills & Utilities' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Other Expense', label: 'Other Expense' },
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Amount' },
  { value: 'category', label: 'Category' },
];

export const TransactionFilters: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useApp();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ categoryFilter: e.target.value as Category | 'all' });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ typeFilter: e.target.value as 'income' | 'expense' | 'all' });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ sortBy: e.target.value as 'date' | 'amount' | 'category' });
  };

  const toggleSortOrder = () => {
    updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <Select
          value={filters.categoryFilter}
          onChange={handleCategoryChange}
          options={categoryOptions}
        />

        {/* Type Filter */}
        <Select
          value={filters.typeFilter}
          onChange={handleTypeChange}
          options={typeOptions}
        />

        {/* Sort */}
        <div className="flex space-x-2">
          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            options={sortOptions}
            className="flex-1"
          />
          <Button
            variant="secondary"
            onClick={toggleSortOrder}
            className="!px-3"
            title={`Sort ${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>
    </div>
  );
};
