'use client';

import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'DOING' | 'DONE';
  dueDate: string;
  categories: { id: string; name: string }[];
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'DONE';
  const canChangeStatus = new Date(task.dueDate) >= new Date();

  const getNextStatus = () => {
    if (task.status === 'TODO') return 'DOING';
    if (task.status === 'DOING') return 'DONE';
    return null;
  };

  const nextStatus = getNextStatus();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition">{task.title}</h3>
          {(task as any).priority && (
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
              (task as any).priority === 'HIGH' ? 'bg-red-100 text-red-700' :
              (task as any).priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {(task as any).priority}
            </span>
          )}
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-primary hover:bg-blue-50 rounded transition"
            title="Edit task"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"
            title="Delete task"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {task.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.categories.map((cat) => (
            <span key={cat.id} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
              {cat.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
        
        {nextStatus && canChangeStatus && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStatusChange(task.id, nextStatus)}
            className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {nextStatus === 'DOING' ? '→ In Progress' : '→ Done'}
          </motion.button>
        )}
        
        {!canChangeStatus && task.status !== 'DONE' && (
          <span className="text-xs text-red-500 font-medium">Locked</span>
        )}
      </div>
    </motion.div>
  );
}
