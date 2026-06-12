import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
}
