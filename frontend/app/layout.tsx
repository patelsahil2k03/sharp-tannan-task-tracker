import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Tracker Lite - Sharp & Tannan',
  description: 'Manage your tasks efficiently with our modern task tracking application',
  keywords: 'task tracker, todo, kanban, project management',
  authors: [{ name: 'Sharp & Tannan' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0066cc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
