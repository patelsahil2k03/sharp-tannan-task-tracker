'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import Toast from '@/components/Toast';
import ConfirmDialog from '@/components/ConfirmDialog';
import LoadingSpinner from '@/components/LoadingSpinner';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'DOING' | 'DONE';
  dueDate: string;
  categories: { id: string; name: string }[];
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Tasks() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; taskId: string | null }>({ show: false, taskId: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'created'>('dueDate');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      showToast('Failed to fetch tasks', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setDeleteConfirm({ show: true, taskId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.taskId) return;
    
    try {
      await api.delete(`/tasks/${deleteConfirm.taskId}`);
      fetchTasks();
      showToast('Task deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete task', 'error');
    } finally {
      setDeleteConfirm({ show: false, taskId: null });
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
      showToast('Task status updated', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to update status', 'error');
    }
  };

  const getTasksByStatus = (status: string) => {
    let filtered = tasks.filter(task => {
      const matchesStatus = task.status === status;
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === '' || (task as any).priority === filterPriority;
      return matchesStatus && matchesSearch && matchesPriority;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        return (priorityOrder[(b as any).priority] || 0) - (priorityOrder[(a as any).priority] || 0);
      } else {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
    });

    return filtered;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Navbar />
      
      <KeyboardShortcuts
        onNewTask={handleCreateTask}
        onSearch={() => searchInputRef.current?.focus()}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-600 mt-1">Organize and track your work</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tasks... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full md:w-64"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleCreateTask}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { status: 'TODO', label: 'To Do', color: 'bg-gray-100' },
            { status: 'DOING', label: 'In Progress', color: 'bg-blue-50' },
            { status: 'DONE', label: 'Done', color: 'bg-green-50' }
          ].map(({ status, label, color }) => (
            <div key={status} className={`${color} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700 uppercase text-sm tracking-wide">
                  {label}
                </h2>
                <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {getTasksByStatus(status).length}
                </span>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {getTasksByStatus(status).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </AnimatePresence>
                
                {getTasksByStatus(status).length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-400 text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{getTasksByStatus('DONE').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{getTasksByStatus('DOING').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'DONE').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <TaskModal
            task={selectedTask}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              fetchTasks();
              showToast(selectedTask ? 'Task updated successfully' : 'Task created successfully', 'success');
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm.show && (
          <ConfirmDialog
            title="Delete Task"
            message="Are you sure you want to delete this task? This action cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setDeleteConfirm({ show: false, taskId: null })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
