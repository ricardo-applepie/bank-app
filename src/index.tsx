import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Import your App component
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes

import Register from './pages/Register/register';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/dashboard';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<App />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route path="/account" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
