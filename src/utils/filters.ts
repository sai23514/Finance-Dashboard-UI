import { Transaction, FilterState } from '../types';

export const applyFilters = (
  transactions: Transaction[],
  filters: FilterState
): Transaction[] => {
  let filtered = [...transactions];

  // Search filter
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (filters.categoryFilter !== 'all') {
    filtered = filtered.filter((t) => t.category === filters.categoryFilter);
  }

  // Type filter
  if (filters.typeFilter !== 'all') {
    filtered = filtered.filter((t) => t.type === filters.typeFilter);
  }

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }

    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  return filtered;
};
