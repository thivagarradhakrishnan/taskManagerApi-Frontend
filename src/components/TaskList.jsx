const TaskList = ({ tasks, loading, onEdit, onDelete, isManager }) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found</div>
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'in-progress':
        return 'status-in-progress'
      default:
        return 'status-pending'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <span className={`task-status ${getStatusClass(task.status)}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-meta">
            <span className="task-date">
              Created: {formatDate(task.createdAt)}
            </span>
            {isManager && task.profiles && (
              <span className="task-owner">
                Owner: {task.user?.email || task.userEmail || 'Unknown'}
              </span>
            )}
          </div>
          
          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="btn btn-outline btn-sm">
              Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList