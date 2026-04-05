import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './components/transactions/Transactions';
import { Insights } from './components/insights/Insights';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'insights'>('dashboard');

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && <Transactions />}
          {activeTab === 'insights' && <Insights />}
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © 2026 FinanceHub. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
