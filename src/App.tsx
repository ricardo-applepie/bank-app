import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register/register';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Register Route */}
        <Route path="register" element={<Register />} />

        {/* Login Route */}
        <Route path="login" element={<Login />} />

        {/* Protected Route */}
        <Route path="account" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
