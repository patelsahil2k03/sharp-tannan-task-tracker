# Task Tracker Lite

A modern, full-stack task management application featuring user authentication, role-based access control, and comprehensive admin dashboard capabilities.

## 🎥 Video Demo

[Watch the complete system demonstration](https://drive.google.com/file/d/1vbVb66bdnBLk9rkT4kK5-VysPaiw9yiB/view?usp=sharing)

## 🎯 Overview

Task Tracker Lite is a production-ready web application designed to streamline task management for teams and individuals. Built with modern technologies and best practices, it offers an intuitive Kanban-style interface with powerful features for organizing, tracking, and managing tasks efficiently.

## ✨ Key Features

### Core Functionality
- **Secure Authentication** - JWT-based authentication with password hashing
- **Role-Based Access Control** - Separate permissions for Admin and Normal users
- **Category Management** - Admin-controlled task categorization system
- **Task Management** - Complete CRUD operations with multi-category support
- **Kanban Board** - Visual task organization across Todo, Doing, and Done columns
- **Status Validation** - Automatic enforcement of due date rules for status changes
- **Admin Dashboard** - Comprehensive overview with filtering and analytics

### Enhanced Features
- **Priority Levels** - Color-coded task priorities (Low, Medium, High)
- **Real-time Search** - Instant task filtering by title and description
- **Smart Notifications** - Toast notifications for all user actions
- **Confirmation Dialogs** - Safe deletion with user confirmation
- **Dark Mode** - Theme toggle with persistent user preference
- **Keyboard Shortcuts** - Quick actions (⌘K for search, ⌘N for new task)
- **Advanced Filtering** - Filter tasks by priority level
- **Flexible Sorting** - Sort by due date, priority, or creation date
- **Task Statistics** - Real-time dashboard with task counts and metrics
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach, works on all devices
- **Accessibility** - ARIA labels and semantic HTML
- **SEO Optimized** - Proper meta tags and structured data

## 🛠️ Technology Stack

### Backend
- **Runtime** - Node.js with Express.js
- **Database** - PostgreSQL
- **ORM** - Prisma (Type-safe database access)
- **Authentication** - JWT tokens with bcryptjs password hashing
- **Architecture** - MVC pattern for clean code organization

### Frontend
- **Framework** - Next.js 14 (React with App Router)
- **Language** - TypeScript
- **Styling** - TailwindCSS with dark mode support
- **Animations** - Framer Motion
- **HTTP Client** - Axios with interceptors

### DevOps
- **Containerization** - Docker with Docker Compose
- **Environment** - Multi-container setup (PostgreSQL, Backend, Frontend)

## 🚀 Quick Start

### Prerequisites
- **For Docker Setup:** Docker and Docker Compose installed
- **For Local Setup:** Node.js 20+, PostgreSQL 16+, npm

### Option 1: Docker Setup (Recommended - Easiest)

1. **Clone the repository**
```bash
git clone https://github.com/patelsahil2k03/sharp-tannan-task-tracker.git
cd sharp-tannan-task-tracker
```

2. **Start the application**
```bash
docker-compose up --build
```

3. **Access the application**
- **Frontend (Main App):** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Documentation:** http://localhost:5000/api-docs

The application will automatically:
- ✅ Set up PostgreSQL database
- ✅ Run database migrations
- ✅ Seed sample data (1 admin + 5 users + 20 tasks)
- ✅ Start all services

**That's it! The app is ready to use.**

### Option 2: Local Development Setup

#### Step 1: Setup PostgreSQL Database
```bash
# Install PostgreSQL 16 if not already installed
# Create database
createdb tasktracker
```

#### Step 2: Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Edit .env file and update DATABASE_URL:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tasktracker"

npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```
✅ Backend running on: http://localhost:5000

#### Step 3: Frontend Setup (Open new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local

# .env.local should contain:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

npm run dev
```
✅ Frontend running on: http://localhost:3000

### Default Credentials

**Admin Account**
```
Email: admin@sharpandtannan.com
Password: Admin@123
```

**Sample User Accounts**
```
john.doe@example.com / User@123
jane.smith@example.com / User@123
mike.wilson@example.com / User@123
sarah.johnson@example.com / User@123
david.brown@example.com / User@123
```

### Stopping the Application

**Docker:**
```bash
# Stop containers
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

**Local:**
```bash
# Press Ctrl+C in both terminal windows
```

## 📡 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Category Endpoints (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Task Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get user's tasks |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/:id` | Get task details |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Admin Dashboard Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/tasks` | Get all tasks with filters |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/stats` | Get statistics |

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Authentication & validation
│   │   ├── config/           # Database configuration
│   │   └── utils/            # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Sample data
│   └── Dockerfile
├── frontend/
│   ├── app/                  # Next.js pages
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities & context
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 Environment Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/tasktracker
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📋 Business Rules

### User Management
- Email addresses must be unique
- Passwords are hashed using bcryptjs
- New users are assigned "USER" role by default
- JWT tokens expire after 7 days

### Category Management
- Only Admin users can create, update, or delete categories
- Category names must be unique
- All users can view and assign categories to tasks

### Task Management
- Users can only view and manage their own tasks
- Tasks support multiple categories
- Task status can only be changed before the due date
- Task details (title, description, categories, priority) can be edited anytime
- Priority levels: Low (Green), Medium (Yellow), High (Red)

### Admin Capabilities
- View all tasks from all users
- Filter tasks by user, status, or date range
- Access comprehensive statistics dashboard
- Manage categories system-wide

## 🎨 UI/UX Features

- **Minimalistic Design** - Clean, modern interface
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Elements** - Hover effects and visual feedback
- **Color-Coded System** - Visual priority and status indicators
- **Empty States** - Helpful messages when no data exists
- **Mobile Responsive** - Seamless experience across all devices
- **Sticky Navigation** - Always accessible navigation bar
- **Dark Mode** - Eye-friendly theme with persistence

## 🧪 Sample Data

Pre-seeded data includes:
- 1 Admin user
- 5 Normal users
- 8 Categories (Accounting, Tax Filing, Audit, Development, Code Review, Client Meeting, Documentation, Compliance)
- 20 Professional tasks (Chartered Accountant and Software Developer tasks)

## 🎯 Keyboard Shortcuts

- `⌘K` or `Ctrl+K` - Focus search
- `⌘N` or `Ctrl+N` - Create new task

## 📝 License

MIT License - See LICENSE file for details

---

**Developed by Sahil Patel for Sharp and Tannan**

*A modern task management solution built with cutting-edge technologies and best practices.*
