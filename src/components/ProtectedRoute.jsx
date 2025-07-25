import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requireManager = false }) => {
  const { user, loading, getUserRole } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireManager && getUserRole() !== 'manager') {
    return <div className="error">Access denied. Manager role required.</div>
  }

  return children
}

export default ProtectedRoute