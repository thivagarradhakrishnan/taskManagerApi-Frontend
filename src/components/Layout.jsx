import { useAuth } from '../context/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const { user, signOut, getUserRole } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  if (!user) {
    return <div className="container">{children}</div>
  }

  const isManager = getUserRole() === 'manager'

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Task Manager</h1>
          <nav className="nav">
            <Link 
              to="/tasks" 
              className={location.pathname === '/tasks' ? 'nav-link active' : 'nav-link'}
            >
              Tasks
            </Link>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </Link>
          </nav>
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <span className="user-role">{isManager ? 'Manager' : 'User'}</span>
            <button onClick={handleSignOut} className="btn btn-outline">
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout