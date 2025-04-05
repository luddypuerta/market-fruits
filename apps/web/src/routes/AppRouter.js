import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./guards";
import Invoices from "@/pages/admin/Invoices";
import Login from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
export const AppRouter = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/home", replace: true }) }), _jsx(Route, { path: "/home", element: _jsx(PublicRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/auth/iniciar-sesion", element: _jsx(PublicRoute, { children: _jsx(Login, {}) }) }), _jsx(Route, { path: "/admin/invoices", element: _jsx(PrivateRoute, { children: _jsx(Invoices, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/home", replace: true }) })] }));
};
