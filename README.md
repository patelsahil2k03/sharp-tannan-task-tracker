# Task Tracker Lite

A full-stack task management application with user authentication, role-based access control, and admin dashboard.

## Features

- **User Authentication**: Register, login, logout with JWT tokens
- **Role Management**: Admin and Normal User roles
- **Category Management**: Admin-only CRUD operations for task categories
- **Task Management**: Create, update, delete tasks with multiple categories
- **Status Tracking**: Todo, Doing, Done with due date validation
- **Admin Dashboard**: View all tasks with filtering options

## Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs

**Frontend:**
- Next.js 14
- TailwindCSS
- Framer Motion

**DevOps:**
- Docker + Docker Compose

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Run with Docker

```bash
docker-compose up --build
```

The application will be available at:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

### Default Admin Credentials
```
Email: admin@sharpandtannan.com
Password: Admin@123
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

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
- `GET /api/admin/tasks` - Get all tasks (with filters)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get dashboard statistics

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

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── Dockerfile
├── frontend/
│   ├── app/
│   ├── components/
│   └── lib/
├── docker-compose.yml
└── README.md
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/tasktracker
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
```

## Business Rules

1. **User Registration**: Email must be unique, password must match confirmation
2. **Categories**: Only admins can create, update, or delete categories
3. **Tasks**: 
   - Users can only view and manage their own tasks
   - Tasks can have multiple categories
   - Status can only be changed before the due date
   - Title, description, and categories can be edited anytime
4. **Admin Dashboard**: Admins can view all tasks and filter by user, status, or due date

## License

MIT
