import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  localStorage.setItem("lastPath", location.pathname + location.search);

  if (!token) return <Navigate to="/auth/iniciar-sesion" replace />;
  if (role !== "admin") return <Navigate to="/home" replace />;

  return children;
};
