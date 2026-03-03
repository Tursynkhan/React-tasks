import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectIsAuthenticated } from '@/shared/model/authSlice';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
