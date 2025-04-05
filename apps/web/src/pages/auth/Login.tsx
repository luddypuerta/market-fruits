import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.username === "admin" && form.password === "admin123") {
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", "Administrador");

      const lastPath = localStorage.getItem("lastPath") || "/admin/invoices";
      navigate(lastPath, { replace: true });
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5" gutterBottom>
          Iniciar sesión (Admin)
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            margin="normal"
            fullWidth
            label="Usuario"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
