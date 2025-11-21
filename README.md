# Task Tracker Lite

A full-stack task management application with user authentication, role-based access control, and admin dashboard built for Sharp and Tannan.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Role Management**: Admin and Normal User roles with different permissions
- **Category Management**: Admin-only CRUD operations for task categories
- **Task Management**: Create, update, delete tasks with multiple categories
- **Kanban Board**: Visual task organization (Todo → Doing → Done)
- **Status Tracking**: Automatic due date validation for status changes
- **Admin Dashboard**: Complete overview with filtering and statistics

## Tech Stack

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
- Axios (API calls)

**DevOps:**
- Docker + Docker Compose
- Multi-container setup

## Quick Start

### Prerequisites
- Docker and Docker Compose installed

### Run with Docker (Recommended)

```bash
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Default Admin Credentials
```
Email: admin@sharpandtannan.com
Password: Admin@123
```

## Local Development

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

## API Endpoints

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

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   │   ├── authController.js
│   │   │   ├── categoryController.js
│   │   │   ├── taskController.js
│   │   │   └── adminController.js
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

## Environment Variables

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

## Business Rules

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
   - Title, description, and categories can be edited anytime
   - Tasks are organized in Kanban board: Todo → Doing → Done

4. **Admin Dashboard**: 
   - Admins can view all tasks from all users
   - Filter tasks by user, status, or due date range
   - View statistics: total users, tasks, categories, overdue tasks

## Features Implemented

✅ User authentication with JWT  
✅ Role-based access control (Admin/User)  
✅ Category management (Admin only)  
✅ Task CRUD operations  
✅ Kanban board interface  
✅ Due date validation for status changes  
✅ Admin dashboard with filters  
✅ Statistics and analytics  
✅ Fully Dockerized setup  
✅ Responsive UI with TailwindCSS  

## License

MIT
