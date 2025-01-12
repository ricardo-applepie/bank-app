import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register/register';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/dashboard';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const navigate  = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/register')
    }

  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="page">
        <Routes>
          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Route */}
          <Route path="/account" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
