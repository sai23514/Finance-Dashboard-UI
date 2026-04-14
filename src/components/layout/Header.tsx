import React from 'react';
import { Moon, Sun, Wallet, User, Shield } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, userRole, setUserRole } = useApp();
  const { logout } = useAuth(); // ✅ added

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Wallet className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              FinanceHub
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setUserRole('viewer')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  userRole === 'viewer'
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Viewer</span>
              </button>

              <button
                onClick={() => setUserRole('admin')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  userRole === 'admin'
                    ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>

            {/* 🌙 Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="md"
              onClick={toggleDarkMode}
              className="!p-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* 🔐 Logout Button */}
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};