import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  })
  const [userStats, setUserStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const { user, getUserRole } = useAuth()
  const isManager = getUserRole() === 'manager'

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await api.get('/dashboard')
      
      setStats({
        total: data.totalTasks || 0,
        pending: data.statusBreakdown?.pending || 0,
        inProgress: data.statusBreakdown?.['in-progress'] || 0,
        completed: data.statusBreakdown?.completed || 0
      })
      if (data.userStats) {
        setUserStats(data.userStats)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h2>Dashboard</h2>
        {isManager && <span className="badge">Manager View</span>}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {isManager && userStats.length > 0 && (
        <div className="user-stats">
          <h3>User Statistics</h3>
          <div className="user-stats-table">
            <div className="table-header">
              <div>User</div>
              <div>Total</div>
              <div>Pending</div>
              <div>In Progress</div>
              <div>Completed</div>
            </div>
            {userStats.map((userStat, index) => (
              <div key={index} className="table-row">
                <div>{userStat.email}</div>
                <div>{userStat.total}</div>
                <div>{userStat.pending}</div>
                <div>{userStat.inProgress}</div>
                <div>{userStat.completed}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard