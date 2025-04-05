import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const location = useLocation();
    localStorage.setItem("lastPath", location.pathname + location.search);
    if (!token)
        return _jsx(Navigate, { to: "/auth/iniciar-sesion", replace: true });
    if (role !== "admin")
        return _jsx(Navigate, { to: "/home", replace: true });
    return children;
};
