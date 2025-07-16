    import React, { useState, useEffect } from 'react';

    function TaskForm({ task, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        priority: 'medium'
    });

    useEffect(() => {
        if (task) {
            // Convert the datetime to local timezone and format for datetime-local input
            let formattedDueDate = '';
            if (task.due_date) {
                const date = new Date(task.due_date);
                // Format as YYYY-MM-DDTHH:MM for datetime-local input
                formattedDueDate = date.toISOString().slice(0, 16);
            }
            
            setFormData({
                title: task.title || '',
                description: task.description || '',
                due_date: formattedDueDate,
                priority: task.priority || 'medium'
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
                </label>
                <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
                </label>
                <textarea
                id="description"
                name="description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
                </label>
                <input
                type="datetime-local"
                id="due_date"
                name="due_date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.due_date}
                onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
                </label>
                <select
                id="priority"
                name="priority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.priority}
                onChange={handleChange}
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                Cancel
                </button>
                <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                {task ? 'Update' : 'Create'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

    export default TaskForm;