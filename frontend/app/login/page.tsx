'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/tasks');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Sharp & Tannan" width={120} height={120} className="object-contain mb-4" />
          <h1 className="text-3xl font-bold text-center text-gray-800">Task Tracker</h1>
          <p className="text-gray-600 text-sm mt-2">Sign in to manage your tasks</p>
        </div>

        <div className="mb-6 relative">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-center justify-center space-x-2 hover:bg-blue-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Demo Credentials</span>
          </button>
          
          {showCredentials && (
            <div 
              className="absolute top-full mt-2 left-0 right-0 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-10 text-sm"
              onMouseLeave={() => setShowCredentials(false)}
            >
              <div className="mb-3">
                <p className="font-semibold mb-1">Admin Account:</p>
                <p className="text-gray-300">admin@sharpandtannan.com</p>
                <p className="text-gray-300">Admin@123</p>
              </div>
              <div>
                <p className="font-semibold mb-1">User Accounts:</p>
                <p className="text-gray-300">john.doe@example.com / User@123</p>
                <p className="text-gray-300">jane.smith@example.com / User@123</p>
                <p className="text-gray-300">mike.wilson@example.com / User@123</p>
                <p className="text-gray-300">sarah.johnson@example.com / User@123</p>
                <p className="text-gray-300">david.brown@example.com / User@123</p>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
