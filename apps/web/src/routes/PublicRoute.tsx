import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") return <Navigate to="/admin/invoices" replace />;

  return children;
};
