import React, { useState, useEffect } from 'react';
import api from '../../api';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('tasks/');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    
    // Handle upcoming filter
    if (statusFilter === 'upcoming') {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      return dueDate > now && dueDate <= sevenDaysFromNow && priorityMatch;
    }
    
    return statusMatch && priorityMatch;
  });

  // Get task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };

  const handleCreateTask = async (formData) => {
    try {
      const response = await api.post('tasks/', formData);
      setTasks([...tasks, response.data]);
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      const response = await api.put(`tasks/${editingTask.id}/`, formData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`tasks/${taskId}/`);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('Failed to delete task');
      }
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const response = await api.patch(`tasks/${task.id}/`, {
        status: newStatus
      });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) {
      console.error('Error updating task status:', err);
      alert('Failed to update task status');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600">Error: {error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Task Statistics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Task Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">{taskStats.total}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{taskStats.pending}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{taskStats.high}</div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Filter Tasks</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select 
              className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none bg-white"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming (Next 7 Days)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
            <select 
              className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none bg-white"
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <button 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => {
              setStatusFilter('all');
              setPriorityFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">📋 My Tasks ({filteredTasks.length})</h2>
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setShowCreateForm(true)}
        >
          ➕ Add New Task
        </button>
      </div>
      
      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">
            {tasks.length === 0 
              ? "You don't have any tasks yet. Create your first task to get started!" 
              : "No tasks match your current filters. Try adjusting your filters or create a new task."
            }
          </p>
          {tasks.length === 0 && (
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                task.status === 'completed' ? 'border-green-500 opacity-75' : 'border-indigo-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 mb-4">{task.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                    {task.due_date && (
                      <span className="text-gray-500 text-sm">
                        📅 Due: {new Date(task.due_date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
                    onClick={() => setEditingTask(task)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm text-white transition-colors ${
                      task.status === 'completed' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onClick={() => handleStatusToggle(task)}
                  >
                    {task.status === 'completed' ? '⏳ Mark Pending' : '✅ Mark Complete'}
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Create New Task</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>
            <TaskForm 
              onSubmit={handleCreateTask}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Task</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setEditingTask(null)}
              >
                ×
              </button>
            </div>
            <TaskForm 
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;