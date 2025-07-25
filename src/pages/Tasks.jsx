import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskFilters from '../components/TaskFilters'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    sort: 'created_at:desc',
    page: 1,
    limit: 10
  })
  const [totalTasks, setTotalTasks] = useState(0)
  
  const { user, getUserRole } = useAuth()
  const isManager = getUserRole() === 'manager'

  useEffect(() => {
    fetchTasks()
  }, [filters])

  const fetchTasks = async () => {
    setLoading(true)
    setError('')

    try {
      // Build query parameters
      const params = new URLSearchParams()
      
      if (filters.status) params.append('status', filters.status)
      if (filters.search) params.append('search', filters.search)
      if (filters.sort) params.append('sort', filters.sort)
      params.append('page', filters.page)
      params.append('limit', filters.limit)

      const data = await api.get(`/tasks?${params.toString()}`)
        // console.log("Fetched tasks:", data.tasks); 
      
      setTasks(data.tasks || [])
      setTotalTasks(data.total || 0)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await api.delete(`/tasks/${taskId}`)

      fetchTasks()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        await api.put(`/tasks/${editingTask._id}`, taskData)
        // console.log("Updating task:", editingTask)

      } else {
        // Create new task
        await api.post('/tasks', taskData)
      }

      setShowForm(false)
      setEditingTask(null)
      fetchTasks()
    } catch (error) {
      setError(error.message)
    }
  }

  const totalPages = Math.ceil(totalTasks / filters.limit)

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h2>Tasks</h2>
        <button onClick={handleCreateTask} className="btn btn-primary">
          Create Task
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <TaskFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
        isManager={isManager}
      />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
        />
      )}

      <TaskList
        tasks={tasks}
        loading={loading}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        isManager={isManager}
      />

      {totalTasks > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={filters.page === 1}
            className="btn btn-outline"
          >
            Previous
          </button>
          
          <span className="pagination-info">
            Page {filters.page} of {totalPages} ({totalTasks} total)
          </span>
          
          <button 
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={filters.page === totalPages}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Tasks