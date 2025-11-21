# Task Tracker Lite

A full-stack task management application with user authentication, role-based access control, and admin dashboard built for Sharp and Tannan.

## 🎯 Features

### Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Role Management**: Admin and Normal User roles with different permissions
- **Category Management**: Admin-only CRUD operations for task categories
- **Task Management**: Create, update, delete tasks with multiple categories
- **Kanban Board**: Visual task organization (Todo → Doing → Done)
- **Status Tracking**: Automatic due date validation for status changes
- **Admin Dashboard**: Complete overview with filtering and statistics

### Enhanced Features
- **Task Priority**: Low, Medium, High priority levels with color-coded badges
- **Search Functionality**: Real-time task search by title and description
- **Toast Notifications**: Success/error feedback for all actions
- **Confirm Dialogs**: Safe deletion with confirmation prompts
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first, works on all devices
- **Loading States**: Elegant loading indicators
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Keyboard Shortcuts**: ⌘K for search, ⌘N for new task
- **Task Filtering**: Filter by priority level
- **Task Sorting**: Sort by due date, priority, or created date
- **Task Statistics**: Real-time dashboard showing task counts and overdue items

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express (MVC Architecture)
- PostgreSQL (Database)
- Prisma ORM (Type-safe database access)
- JWT Authentication
- bcryptjs (Password hashing)

**Frontend:**
- Next.js 14 (React Framework)
- TypeScript
- TailwindCSS (Styling)
- Framer Motion (Animations)
- Axios (API calls)

**DevOps:**
- Docker + Docker Compose
- Multi-container setup

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed

### Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/patelsahil2k03/sharp-tannan-task-tracker.git
cd sharp-tannan-task-tracker

# Start all services
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Default Credentials

**Admin Account:**
```
Email: admin@sharpandtannan.com
Password: Admin@123
```

**User Accounts:**
```
Email: john.doe@example.com
Password: User@123

Email: jane.smith@example.com
Password: User@123

Email: mike.wilson@example.com
Password: User@123
```

## 💻 Local Development

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs on: http://localhost:3000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Categories (Admin only)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Admin Dashboard
- `GET /api/admin/tasks` - Get all tasks (with filters: userId, status, dueDateFrom, dueDateTo)
- `GET /api/admin/users` - Get all users with task counts
- `GET /api/admin/stats` - Get dashboard statistics

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   │   ├── authController.js
│   │   │   ├── categoryController.js
│   │   │   ├── taskController.js
│   │   └── adminController.js
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth & validation
│   │   ├── config/           # Database config
│   │   └── utils/            # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Initial data
│   └── Dockerfile
├── frontend/
│   ├── app/                  # Next.js pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── tasks/            # Kanban board
│   │   ├── categories/       # Category management
│   │   └── admin/            # Admin dashboard
│   ├── components/           # Reusable components
│   ├── lib/                  # API client & context
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔧 Environment Variables

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

1. **User Registration**: 
   - Email must be unique
   - Password must match confirmation
   - New users get "USER" role by default

2. **Categories**: 
   - Only admins can create, update, or delete categories
   - Category names must be unique
   - All users can view categories

3. **Tasks**: 
   - Users can only view and manage their own tasks
   - Tasks can have multiple categories
   - **Status can only be changed BEFORE the due date**
   - Title, description, categories, and priority can be edited anytime
   - Tasks are organized in Kanban board: Todo → Doing → Done
   - Priority levels: Low (Green), Medium (Yellow), High (Red)

4. **Admin Dashboard**: 
   - Admins can view all tasks from all users
   - Filter tasks by user, status, or due date range
   - View statistics: total users, tasks, categories, overdue tasks

## ✨ Features Implemented

✅ User authentication with JWT  
✅ Role-based access control (Admin/User)  
✅ Category management (Admin only)  
✅ Task CRUD operations  
✅ Kanban board interface  
✅ Due date validation for status changes  
✅ Admin dashboard with filters  
✅ Statistics and analytics  
✅ Task priority levels  
✅ Search functionality  
✅ Toast notifications  
✅ Confirm dialogs  
✅ Smooth animations  
✅ Fully Dockerized setup  
✅ Responsive UI with TailwindCSS  
✅ Loading states  
✅ 404 page  
✅ Dark mode with theme persistence  
✅ Keyboard shortcuts (⌘K, ⌘N)  
✅ Task filtering by priority  
✅ Task sorting (due date, priority, created)  
✅ Real-time task statistics dashboard  
✅ SEO optimized with meta tags  
✅ Accessibility improvements (ARIA labels)  

## 🎨 UI/UX Features

- **Minimalistic Design**: Clean, modern interface inspired by Linear and Notion
- **Smooth Animations**: Framer Motion powered transitions
- **Hover Effects**: Interactive elements with visual feedback
- **Color-Coded Priority**: Visual priority indicators
- **Empty States**: Helpful illustrations when no data
- **Mobile Responsive**: Works seamlessly on all screen sizes
- **Sticky Navigation**: Always accessible navigation bar

## 🧪 Sample Data

The application comes pre-seeded with:
- 1 Admin user
- 5 Normal users
- 6 Categories (Work, Personal, Urgent, Meeting, Development, Design)
- 20 Sample tasks with various statuses, priorities, and due dates

## 📝 License

MIT

---

**Built with ❤️ for Sharp and Tannan**
