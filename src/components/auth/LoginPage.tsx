import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wallet } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <Wallet className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">FinanceHub</h1>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isRegister ? 'Create Account' : 'Sign In'}
        </h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email" placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p className="text-center text-sm mt-4 text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 ml-1 font-medium">
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};