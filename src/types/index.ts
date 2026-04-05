export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other Income'
  | 'Food & Dining'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Travel'
  | 'Other Expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type UserRole = 'admin' | 'viewer';

export interface FilterState {
  searchTerm: string;
  categoryFilter: Category | 'all';
  typeFilter: TransactionType | 'all';
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}

export interface AppState {
  transactions: Transaction[];
  userRole: UserRole;
  filters: FilterState;
  darkMode: boolean;
}

export interface InsightData {
  highestSpendingCategory: {
    category: Category;
    amount: number;
  };
  monthlyComparison: {
    currentMonth: number;
    previousMonth: number;
    percentageChange: number;
  };
  averageTransaction: number;
  totalTransactions: number;
}
