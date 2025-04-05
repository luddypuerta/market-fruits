import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin")
        return _jsx(Navigate, { to: "/admin/invoices", replace: true });
    return children;
};
