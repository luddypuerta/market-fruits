import { Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./guards";
import Invoices from "@/pages/admin/Invoices";
import Login from "@/pages/auth/Login";
import Home from "@/pages/home/Home";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* Ruta pública para clientes */}
      <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
      
      {/* Ruta pública de login solo para admin */}
      <Route path="/auth/iniciar-sesion" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* Ruta privada solo para admin */}
      <Route path="/admin/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />

      {/* Si no existe la ruta, redirige a home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
