import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Import your App component
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Use HashRouter instead of BrowserRouter

import Register from './pages/Register/register';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/dashboard';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
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
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
