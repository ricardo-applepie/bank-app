import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register/register';
import './App.css';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/dashboard';

const root = document.getElementById('root') as HTMLElement


const router = createBrowserRouter([
  {
    path: "/",
    element: <>welcome</>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <ProtectedRoute> <Dashboard/> </ProtectedRoute>,
  },
]);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
