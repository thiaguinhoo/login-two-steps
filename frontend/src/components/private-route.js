import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

export default function PrivateRoute ({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />
}
