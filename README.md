# Task Manager - MERN Stack Application

A full-stack task management application built with a React frontend and Node.js/Express/MongoDB backend. Features include user authentication, role-based access control, and an analytics dashboard.

## Features

### Authentication & Authorization
- User registration and login with email/password
- JWT-based authentication
- Role-based access control (User vs Manager)
- Secure password hashing

### Task Management
- Create, read, update, and delete tasks
- Task properties: title, description, status (pending, in-progress, completed)
- Users manage their own tasks
- Managers can view and manage all users' tasks

### Advanced Features
- **Filtering**: Filter tasks by status
- **Sorting**: Sort by date, title, or status
- **Search**: Search tasks by title or description
- **Pagination**: Configurable page size with navigation
- **Real-time Updates**: Automatic data refresh

### Dashboard Analytics
- Personal dashboard with task statistics
- Manager dashboard with system-wide analytics
- User-specific task breakdowns for managers
- Visual stat cards with color-coded status indicators

### UI/UX
- Clean, minimal design with plain CSS
- Responsive layout for mobile and desktop
- Intuitive navigation and user feedback
- Modal forms for task creation/editing

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Plain CSS** - Styling (no frameworks)
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` and configure your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Backend Setup
You will need a separate Node.js/Express backend with MongoDB. The backend should include:

Required API endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Get tasks with filtering, sorting, pagination
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/dashboard` - Get analytics data

### 5. Run the Application
```bash
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173)

## API Endpoints (Backend Required)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get tasks (with filtering, sorting, search, pagination)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Dashboard
- `GET /api/dashboard` - Get user/manager analytics

## Usage

### User Registration
1. Navigate to `/register`
2. Fill in email, password, and select role (User or Manager)
3. Submit to create account

### Task Management
1. Login and navigate to the Tasks page
2. Use "Create Task" to add new tasks
3. Click "Edit" on any task to modify it
4. Use filters, search, and sorting options to find tasks
5. Navigate through pages using pagination controls

### Dashboard Analytics
1. Navigate to the Dashboard page
2. View your task statistics
3. Managers can see system-wide statistics and per-user breakdowns

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── TaskFilters.jsx
├── context/             # React context providers
│   └── AuthContext.jsx
├── lib/                 # Utility libraries
│   └── api.js
├── pages/               # Main application pages
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Tasks.jsx
├── App.jsx
├── App.css
└── main.jsx
```

## Features Implemented

✅ User registration with role selection  
✅ Frontend ready for JWT authentication  
✅ API integration ready for backend  
✅ Task CRUD operations  
✅ Role-based permissions  
✅ Task filtering by status  
✅ Task sorting (date, title, status)  
✅ Keyword search in title/description  
✅ Pagination with configurable page size  
✅ Dashboard analytics  
✅ Manager-specific system statistics  
✅ Protected routes with proper validation  
✅ Responsive UI design  
✅ Clean Git history  

## Extra Features

- Real-time data updates
- Responsive design for mobile devices
- Clean, intuitive user interface
- Modal-based task editing
- Color-coded task status indicators
- User-friendly error handling and loading states

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

**Note**: This frontend requires a Node.js/Express/MongoDB backend to function. The backend should implement JWT authentication, bcrypt password hashing, and all the