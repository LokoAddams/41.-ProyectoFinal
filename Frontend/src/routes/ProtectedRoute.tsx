import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Si requiere admin y no es admin, redirigir al dashboard u otra ruta (por ahora solo al dashboard normal)
    // Nota: El requerimiento dice "Si es Administrador renderiza los botones... si es Usuario, oculta estos botones", 
    // pero ambos pueden ver el Dashboard. Por lo tanto, el DashboardCrud no requiere estrictamente 'Admin' para entrar,
    // solo para ciertas acciones dentro. Aún así dejamos la opción abierta.
    return <Navigate to="/dashboard" replace />;
  }

  // Si está autenticado (y cumple el rol si se requiere), renderizar las rutas hijas
  return <Outlet />;
};
