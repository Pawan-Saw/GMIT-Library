import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(email, password, role);
      if (success) {
        navigate(role === 'student' ? '/student/dashboard' : '/admin/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (userRole: 'student' | 'admin') => {
    if (userRole === 'student') {
      setEmail('alex@student.gmit.ie');
      setPassword('123456');
      setRole('student');
    } else {
      setEmail('admin@gmit.ie');
      setPassword('123456');
      setRole('admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GMIT Library</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Portal</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  role === 'student'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Student</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  role === 'admin'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">Admin</span>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                role === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              } text-white shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center mb-4">Demo Accounts:</p>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => quickLogin('student')}
                className="p-3 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <p className="font-medium text-blue-900">Student Demo</p>
                <p className="text-sm text-blue-600">alex@student.gmit.ie</p>
              </button>
              <button
                onClick={() => quickLogin('admin')}
                className="p-3 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <p className="font-medium text-green-900">Admin Demo</p>
                <p className="text-sm text-green-600">admin@gmit.ie</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}