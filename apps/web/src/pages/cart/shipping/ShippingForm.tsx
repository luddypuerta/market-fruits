import { validateCountryInAmerica } from "@/utils/helpers/validateCountry";
import { Shipping } from "@/interfaces/Shipping";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

interface ShippingFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Shipping) => void;
  showMessage: (msg: string, level?: "success" | "error" | "info" | "warning") => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ open, onClose, onConfirm, showMessage }) => {
  const [formData, setFormData] = useState<Shipping>({
    name: "",
    phone: "",
    email: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Datos de envío</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre completo"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          fullWidth
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Correo electrónico"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="País de envío"
          fullWidth
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShippingForm;
