# 💰 FinanceHub - Financial Dashboard

A modern, feature-rich financial dashboard built with React, TypeScript, and Tailwind CSS. Track your transactions, visualize spending patterns, and gain insights into your financial health.

![Financial Dashboard](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Functionality

#### 📊 Dashboard Overview
- **Summary Cards**: Display total balance, current month's income, and expenses
- **Balance Trend Chart**: Interactive line chart showing balance changes over time
- **Spending Breakdown**: Pie chart visualizing expenses by category
- **Responsive Design**: Fully responsive layout that works on all devices

#### 💳 Transactions Management
- **Transaction List**: Comprehensive view of all financial transactions
- **Advanced Filtering**: Filter by search term, category, and transaction type
- **Flexible Sorting**: Sort by date, amount, or category in ascending/descending order
- **Add/Edit/Delete**: Full CRUD operations (admin only)
- **Responsive Table**: Desktop table view with mobile card view

#### 🎯 Insights Section
- **Highest Spending Category**: Identify where you spend the most
- **Monthly Comparison**: Compare current month vs previous month with percentage change
- **Average Transaction**: Calculate average transaction amount
- **Total Transactions**: View total transaction count
- **Smart Tips**: Personalized financial recommendations

#### 👥 Role-Based Access Control (RBAC)
- **Viewer Role**: Read-only access to view all data
- **Admin Role**: Full access to add, edit, and delete transactions
- **Easy Role Switching**: Toggle between roles with a single click
- **Visual Indicators**: Clear UI differences based on active role

### Optional Enhancements

✅ **Dark Mode**: Fully implemented dark theme with smooth transitions
✅ **Local Storage**: Automatic data persistence across sessions
✅ **Export Functionality**: Export transactions to CSV or JSON format
✅ **Smooth Animations**: Subtle transitions and hover effects
✅ **Empty States**: Graceful handling of no-data scenarios

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. **Clone or navigate to the project directory**
```bash
cd Temp_sd
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── dashboard/        # Dashboard components
│   │   ├── Dashboard.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── BalanceTrendChart.tsx
│   │   └── SpendingBreakdownChart.tsx
│   ├── transactions/     # Transaction components
│   │   ├── Transactions.tsx
│   │   ├── TransactionList.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionModal.tsx
│   ├── insights/         # Insights components
│   │   └── Insights.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       └── Navigation.tsx
├── context/
│   └── AppContext.tsx    # Global state management
├── data/
│   └── mockData.ts       # Sample transaction data
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/
│   ├── calculations.ts   # Financial calculations
│   └── filters.ts        # Filtering logic
├── App.tsx               # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🎨 Design Approach

### Technology Stack

- **React 18**: Modern React with hooks for component logic
- **TypeScript**: Type-safe development for better code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Recharts**: Composable charting library for data visualization
- **Lucide React**: Beautiful, consistent icon set
- **Vite**: Fast build tool and dev server
- **date-fns**: Modern date utility library

### State Management

The application uses **React Context API** for state management, providing:

- **Centralized State**: All application state in one place
- **Efficient Updates**: Only re-renders components that need updates
- **Type Safety**: Full TypeScript support for state and actions
- **Persistence**: Automatic localStorage sync for data persistence

**State Structure:**
```typescript
{
  transactions: Transaction[],      // All financial transactions
  userRole: 'admin' | 'viewer',    // Current user role
  filters: FilterState,             // Active filters for transactions
  darkMode: boolean                 // Dark mode preference
}
```

### Component Architecture

**Atomic Design Pattern:**
- **Atoms**: Button, Input, Select, Card (reusable primitives)
- **Molecules**: SummaryCard, TransactionFilters (simple combinations)
- **Organisms**: Dashboard, TransactionList, Charts (complex components)
- **Pages**: Main App views for each tab

### Responsive Design Strategy

**Mobile-First Approach:**
- Base styles designed for mobile devices
- Progressive enhancement for larger screens
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)

**Responsive Features:**
- Grid layouts that stack on mobile
- Hidden elements on small screens
- Touch-friendly button sizes
- Horizontal scrolling for tables on mobile
- Adaptive navigation

## 🎯 Feature Details

### 1. Dashboard Overview

The dashboard provides a high-level view of your financial status:

- **Real-time Calculations**: All metrics update instantly with data changes
- **Visual Insights**: Charts update dynamically based on current data
- **Time-based Filtering**: Automatically shows current month data
- **Trend Analysis**: Compare current vs previous month performance

### 2. Transaction Management

Comprehensive transaction handling with:

- **Smart Filtering**:
  - Full-text search across description and category
  - Filter by category (13 predefined categories)
  - Filter by type (income/expense)
  - Combine multiple filters simultaneously

- **Flexible Sorting**:
  - Sort by date (newest/oldest first)
  - Sort by amount (highest/lowest)
  - Sort by category (alphabetically)

- **CRUD Operations** (Admin only):
  - Add new transactions via modal form
  - Edit existing transactions
  - Delete transactions with confirmation
  - Form validation for data integrity

### 3. Insights & Analytics

Automated insights generation:

- **Category Analysis**: Identifies highest spending category
- **Trend Detection**: Calculates month-over-month changes
- **Statistical Metrics**: Average transaction size
- **Actionable Tips**: Personalized recommendations based on data

### 4. Role-Based UI

Two distinct user experiences:

**Viewer Role:**
- View all data and charts
- Use filters and search
- Export data
- No modification capabilities

**Admin Role:**
- All Viewer capabilities
- Add new transactions
- Edit existing transactions
- Delete transactions
- Full data management

## 💾 Data Persistence

The application automatically saves data to browser localStorage:

- **Transactions**: All transaction data persists across sessions
- **User Role**: Last selected role is remembered
- **Dark Mode**: Theme preference is saved
- **Filters**: Reset on page load (intentional UX decision)

**Note**: Data is stored locally in your browser. Clearing browser data will reset the application.

## 🎨 Theming

### Dark Mode

Full dark mode implementation:
- System-level dark mode detection
- Manual toggle in header
- Smooth transitions between themes
- Optimized colors for readability
- Chart color adjustments for dark backgrounds

### Color Palette

**Light Mode:**
- Primary: Blue (`#0ea5e9`)
- Success: Green (`#10b981`)
- Warning: Orange (`#f59e0b`)
- Danger: Red (`#ef4444`)

**Dark Mode:**
- Adjusted brightness for eye comfort
- Maintained color semantics
- High contrast for accessibility

## 🔧 Advanced Usage

### Customizing Categories

Edit `src/types/index.ts` to add/remove categories:

```typescript
export type Category =
  | 'Your Custom Category'
  | 'Another Category'
  // ... more categories
```

Update category options in:
- `src/components/transactions/TransactionFilters.tsx`
- `src/components/transactions/TransactionModal.tsx`

### Adding Mock Data

Add more sample transactions in `src/data/mockData.ts`:

```typescript
{
  id: 'unique-id',
  date: '2026-03-15',
  amount: 100,
  category: 'Food & Dining',
  type: 'expense',
  description: 'Lunch'
}
```

### Exporting Data

**CSV Export:**
- Click "Export CSV" button
- Opens standard save dialog
- Compatible with Excel, Google Sheets

**JSON Export:**
- Click "Export JSON" button
- Structured data format
- Easy to import into other systems

## 🧪 Testing the Application

### Test Scenarios

1. **Role Switching**:
   - Switch between Viewer and Admin roles
   - Verify Add/Edit/Delete buttons appear only for Admin
   - Ensure all data remains visible in both roles

2. **Filtering**:
   - Try different search terms
   - Combine multiple filters
   - Test sorting in both directions
   - Clear filters and verify reset

3. **CRUD Operations** (Admin mode):
   - Add a new transaction
   - Edit an existing transaction
   - Delete a transaction
   - Verify changes persist after page refresh

4. **Dark Mode**:
   - Toggle dark mode
   - Verify all components render correctly
   - Check chart visibility
   - Refresh page to verify persistence

5. **Responsive Design**:
   - Resize browser window
   - Test on mobile device/emulator
   - Verify table converts to cards on mobile
   - Check navigation is touch-friendly

6. **Data Export**:
   - Export as CSV and open in spreadsheet
   - Export as JSON and verify structure
   - Test with filtered data

## 📊 Performance Considerations

- **Memoization**: Expensive calculations cached with `useMemo`
- **Efficient Filtering**: Optimized filter algorithms
- **Code Splitting**: Potential for lazy loading (not implemented)
- **Small Bundle**: Minimal dependencies for fast load times

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and customize
- Add new features
- Improve existing functionality
- Share your enhancements

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own applications.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind Labs** for the beautiful CSS framework
- **Recharts** for the charting library
- **Lucide** for the icon set

---

**Built with ❤️ for learning and demonstration purposes**

