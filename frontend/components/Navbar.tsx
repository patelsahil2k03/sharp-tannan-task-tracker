'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/tasks" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Sharp & Tannan" width={40} height={40} className="object-contain" />
              <span className="text-xl font-bold text-gray-800">Task Tracker</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link
                href="/tasks"
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/tasks')
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Tasks
              </Link>
              
              {user?.role === 'ADMIN' && (
                <>
                  <Link
                    href="/categories"
                    className={`px-4 py-2 rounded-lg transition font-medium ${
                      isActive('/categories')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/admin"
                    className={`px-4 py-2 rounded-lg transition font-medium ${
                      isActive('/admin')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onMouseEnter={() => setShowShortcuts(true)}
                onMouseLeave={() => setShowShortcuts(false)}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition"
                title="Keyboard shortcuts"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
              
              {showShortcuts && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-50 w-64 text-sm">
                  <p className="font-semibold mb-2">Keyboard Shortcuts</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-300">New Task</span>
                      <kbd className="bg-gray-700 px-2 py-0.5 rounded">⌘N</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Search</span>
                      <kbd className="bg-gray-700 px-2 py-0.5 rounded">⌘K</kbd>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
