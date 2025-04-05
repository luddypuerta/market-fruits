import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useProductStore } from "@/store/products/productStore";
import { useCartStore } from "@/store/carts/cartStore";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShippingForm from "./shipping/ShippingForm";
import { generateInvoice } from "@libluddy/ui-lib";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Shipping } from "@/interfaces/Shipping";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./Cart.scss";


interface CartProps {
  onCloseCart: () => void;
}

const Cart: React.FC<CartProps> = ({ onCloseCart }) => {
  const {
    items,
    removeFromCart,
    incrementItem,
    decrementItem,
    clearCart,
    loadFromLocalStorage,
  } = useCartStore();

  const [openShipping, setOpenShipping] = useState(false);
  const { open, message, severity, showMessage, handleClose } = useSnackbar();
  const { loadProducts } = useProductStore.getState();


  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmShipping = (data: Shipping) => {
    const invoice = generateInvoice(data, items);

    const existing = localStorage.getItem("invoices");
    const allInvoices = existing ? JSON.parse(existing) : [];

    localStorage.setItem("invoices", JSON.stringify([...allInvoices, invoice]));

    updateStockAfterPurchase();
    loadProducts();
    clearCart();

    setTimeout(() => {
      setOpenShipping(false);
      onCloseCart();
    }, 1000);
  };


  const updateStockAfterPurchase = () => {
    const stored = localStorage.getItem("products");
    if (!stored) return;

    const currentStock = JSON.parse(stored);
    const updatedStock = currentStock.map((product: any) => {
      const bought = items.find((i) => i.id === product.id);
      if (!bought) return product;

      return {
        ...product,
        stock: Math.max(product.stock - bought.quantity, 0),
      };
    });

    localStorage.setItem("products", JSON.stringify(updatedStock));
  };

  return (
    <div className="cart-drawer">
      <div className="cart-drawer__header">
        <div className="cart-drawer__header-close">
          <IconButton onClick={onCloseCart}>
            <CloseIcon />
          </IconButton>
          <h2>Carrito</h2>
        </div>
        <Button
          onClick={clearCart}
          startIcon={<DeleteIcon />}
          variant="text"
          color="inherit"
        >
          Eliminar
        </Button>
      </div>
      <div className="cart-drawer__body">
        {items.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image ?? "/assets/images/default.png"}
                alt={item.name}
                className="cart-item__img"
              />
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <p className="cart-item__price">
                  <strong>{item.price.toLocaleString("es-CO")}</strong> /COP.
                </p>
                <div className="cart-item__container-quantity">
                  <p className="cart-item__quantity">
                    En el carrito<br />
                    <strong>{item.quantity} ud.</strong>
                  </p>

                  <div className="cart-item__controls">
                    <button
                      className="btn-circle outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </button>
                    <button
                      className="btn-circle filled"
                      onClick={() => decrementItem(item.id)}
                    >
                      <RemoveIcon fontSize="small" />
                    </button>
                    <button
                      className="btn-circle filled"
                      onClick={() => incrementItem(item.id)}
                    >
                      <AddIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-drawer__footer">
        <div className="cart-drawer__total">
          <span>Total aproximado</span>
          <strong>{total.toLocaleString("es-CO")} COP</strong>
        </div>
        <Button variant="contained" color="success" fullWidth onClick={() => setOpenShipping(true)}>
          Realizar pedido
        </Button>
      </div>

      <ShippingForm
        open={openShipping}
        onClose={() => setOpenShipping(false)}
        onConfirm={handleConfirmShipping}
        showMessage={showMessage}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={severity} onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Cart;
