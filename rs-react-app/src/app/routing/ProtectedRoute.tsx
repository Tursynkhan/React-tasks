import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
