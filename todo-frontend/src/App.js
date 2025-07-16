import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        {/* Test div to verify Tailwind is working */}
        {/* <div className="bg-blue-500 text-white p-4 text-center">
          Tailwind is working!
        </div> */}
        
        {isAuthenticated && (
          <div className="bg-white/80 backdrop-blur-sm p-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">📝 TaskMaster</h1>
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        
        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />} 
            />
            <Route
              path="/tasks"
              element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;