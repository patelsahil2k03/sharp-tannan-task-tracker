'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

interface Task {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  user: { name: string; email: string };
  categories: { name: string }[];
}

interface User {
  id: string;
  name: string;
  email: string;
  _count: { tasks: number };
}

interface Stats {
  totalUsers: number;
  totalTasks: number;
  totalCategories: number;
  overdueTasks: number;
  tasksByStatus: { TODO?: number; DOING?: number; DONE?: number };
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filterUserId, setFilterUserId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/tasks');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchData();
    }
  }, [user, filterUserId, filterStatus]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      if (filterUserId) params.append('userId', filterUserId);
      if (filterStatus) params.append('status', filterStatus);

      const [tasksRes, usersRes, statsRes] = await Promise.all([
        api.get(`/admin/tasks?${params}`),
        api.get('/admin/users'),
        api.get('/admin/stats')
      ]);

      setTasks(tasksRes.data);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCategories}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Overdue</p>
              <p className="text-3xl font-bold text-red-500">{stats.overdueTasks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-500">{stats.tasksByStatus.DONE || 0}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
            <div className="flex space-x-4">
              <select
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="">All Users</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="">All Status</option>
                <option value="TODO">To Do</option>
                <option value="DOING">In Progress</option>
                <option value="DONE">Done</option>
              </select>

              {(filterUserId || filterStatus) && (
                <button
                  onClick={() => {
                    setFilterUserId('');
                    setFilterStatus('');
                  }}
                  className="text-primary hover:text-blue-700 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categories</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tasks.map((task) => {
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'DONE';
                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{task.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{task.user.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          task.status === 'DONE' ? 'bg-green-100 text-green-700' :
                          task.status === 'DOING' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isOverdue ? 'text-red-500' : 'text-gray-600'}`}>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {task.categories.map((cat, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {tasks.length === 0 && (
              <p className="text-gray-400 text-center py-12">No tasks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
