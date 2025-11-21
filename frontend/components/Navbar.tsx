'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

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
