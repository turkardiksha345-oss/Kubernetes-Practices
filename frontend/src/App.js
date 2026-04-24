import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  useEffect(() => {
    fetchTasks();
  }, []);

 const API_URL = "";
 console.log("API URL:", API_URL);

  const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    const data = await response.json();

    // ✅ Safety: ensure always array
    setTasks(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    setTasks([]);
  }
};

  const addTask = async () => {
    if (!title.trim()) return;
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });
    if (response.ok) {
      setTitle('');
      setDescription('');
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  const filteredTasks = (tasks || []).filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = (tasks || []).filter(task => task.completed).length;
  const pendingCount = (tasks || []).length - completedCount;

  return (
    <div className="App">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <div className="stats">
          <span className="stat pending">⏳ {pendingCount} Pending</span>
          <span className="stat completed">✅ {completedCount} Completed</span>
        </div>
      </header>

      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <input
          type="text"
          placeholder="Add description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} disabled={!title.trim()}>
          ➕ Add Task
        </button>
      </div>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      <ul className="task-list">
        {Array.isArray(filteredTasks) && filteredTasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <div className="task-content">
              <h3>{task.completed ? '✅ ' : '⏳ '}{task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <div className="task-actions">
              <button
                className="toggle-btn"
                onClick={() => toggleComplete(task._id, task.completed)}
              >
                {task.completed ? '🔄 Undo' : '✅ Complete'}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <li className="empty-state">
            <div className="empty-content">
              <span className="empty-icon">📝</span>
              <h3>No tasks found</h3>
              <p>
                {filter === 'all'
                  ? 'Add your first task above!'
                  : filter === 'pending'
                  ? 'All tasks completed! 🎉'
                  : 'No completed tasks yet.'}
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;