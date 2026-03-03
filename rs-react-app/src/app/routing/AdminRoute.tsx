import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectIsAuthenticated, selectRole } from '@/shared/model/authSlice';

export function AdminRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
