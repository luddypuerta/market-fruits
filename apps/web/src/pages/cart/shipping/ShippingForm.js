import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { validateCountryInAmerica } from "@/utils/helpers/validateCountry";
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, } from "@mui/material";
const ShippingForm = ({ open, onClose, onConfirm, showMessage }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        country: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const { name, phone, email, country } = formData;
        if (!name || !phone || !email || !country) {
            showMessage("Todos los campos son obligatorios.", "warning");
            return;
        }
        const isValid = await validateCountryInAmerica(country);
        if (!isValid) {
            showMessage("❌ El país ingresado no pertenece al continente americano.", "error");
            return;
        }
        showMessage("✅ País válido. Pedido confirmado.", "success");
        onConfirm(formData);
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, children: [_jsx(DialogTitle, { children: "Datos de env\u00EDo" }), _jsxs(DialogContent, { children: [_jsx(TextField, { autoFocus: true, margin: "dense", label: "Nombre completo", fullWidth: true, name: "name", value: formData.name, onChange: handleChange }), _jsx(TextField, { margin: "dense", label: "Tel\u00E9fono", fullWidth: true, name: "phone", value: formData.phone, onChange: handleChange }), _jsx(TextField, { margin: "dense", label: "Correo electr\u00F3nico", fullWidth: true, name: "email", value: formData.email, onChange: handleChange }), _jsx(TextField, { margin: "dense", label: "Pa\u00EDs de env\u00EDo", fullWidth: true, name: "country", value: formData.country, onChange: handleChange })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, children: "Cancelar" }), _jsx(Button, { onClick: handleSubmit, variant: "contained", color: "primary", children: "Confirmar" })] })] }));
};
export default ShippingForm;
