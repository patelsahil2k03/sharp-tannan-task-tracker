'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onNewTask: () => void;
  onSearch: () => void;
}

export default function KeyboardShortcuts({ onNewTask, onSearch }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearch();
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        onNewTask();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNewTask, onSearch]);

  return null;
}
