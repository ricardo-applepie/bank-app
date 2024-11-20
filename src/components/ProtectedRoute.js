// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('token'); // or however you manage auth state

  return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
