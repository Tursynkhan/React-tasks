import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectIsAuthenticated } from '@/shared/model/authSlice/authSlice';

export function PublicRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
