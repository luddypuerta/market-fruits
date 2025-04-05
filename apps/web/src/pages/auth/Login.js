import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, } from "@mui/material";
const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.username === "admin" && form.password === "admin123") {
            localStorage.setItem("token", "mock-token");
            localStorage.setItem("role", "admin");
            localStorage.setItem("user", "Administrador");
            const lastPath = localStorage.getItem("lastPath") || "/admin/invoices";
            navigate(lastPath, { replace: true });
        }
        else {
            setError("Usuario o contraseña incorrectos.");
        }
    };
    return (_jsx(Container, { maxWidth: "xs", children: _jsxs(Box, { mt: 8, display: "flex", flexDirection: "column", alignItems: "center", children: [_jsx(Typography, { component: "h1", variant: "h5", gutterBottom: true, children: "Iniciar sesi\u00F3n (Admin)" }), error && _jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, width: "100%", children: [_jsx(TextField, { margin: "normal", fullWidth: true, label: "Usuario", name: "username", value: form.username, onChange: handleChange, autoFocus: true }), _jsx(TextField, { margin: "normal", fullWidth: true, label: "Contrase\u00F1a", name: "password", type: "password", value: form.password, onChange: handleChange }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", children: "Entrar" })] })] }) }));
};
export default Login;
