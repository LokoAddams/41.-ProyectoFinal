import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[]; // Array de roles permitidos para esta ruta
}

export default function PrivateRoute({ children, allowedRoles }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();

  // Si la ruta requiere roles específicos y el usuario no los tiene, redirigir
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />; // o a una página de "No Autorizado"
  }

  return children;
}
