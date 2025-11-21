'use client';

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
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-primary transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {task.categories.map((cat) => (
          <span key={cat.id} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            {cat.name}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
        
        {nextStatus && canChangeStatus && (
          <button
            onClick={() => onStatusChange(task.id, nextStatus)}
            className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Move to {nextStatus === 'DOING' ? 'In Progress' : 'Done'}
          </button>
        )}
      </div>
    </div>
  );
}
