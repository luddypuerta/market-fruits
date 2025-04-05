import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./Cart.scss";
const Cart = ({ onCloseCart }) => {
    const { items, removeFromCart, incrementItem, decrementItem, clearCart, loadFromLocalStorage, } = useCartStore();
    const [openShipping, setOpenShipping] = useState(false);
    const { open, message, severity, showMessage, handleClose } = useSnackbar();
    const { loadProducts } = useProductStore.getState();
    useEffect(() => {
        loadFromLocalStorage();
    }, [loadFromLocalStorage]);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const handleConfirmShipping = (data) => {
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
        if (!stored)
            return;
        const currentStock = JSON.parse(stored);
        const updatedStock = currentStock.map((product) => {
            const bought = items.find((i) => i.id === product.id);
            if (!bought)
                return product;
            return {
                ...product,
                stock: Math.max(product.stock - bought.quantity, 0),
            };
        });
        localStorage.setItem("products", JSON.stringify(updatedStock));
    };
    return (_jsxs("div", { className: "cart-drawer", children: [_jsxs("div", { className: "cart-drawer__header", children: [_jsxs("div", { className: "cart-drawer__header-close", children: [_jsx(IconButton, { onClick: onCloseCart, children: _jsx(CloseIcon, {}) }), _jsx("h2", { children: "Carrito" })] }), _jsx(Button, { onClick: clearCart, startIcon: _jsx(DeleteIcon, {}), variant: "text", color: "inherit", children: "Eliminar" })] }), _jsx("div", { className: "cart-drawer__body", children: items.length === 0 ? (_jsx("p", { children: "Tu carrito est\u00E1 vac\u00EDo" })) : (items.map((item) => (_jsxs("div", { className: "cart-item", children: [_jsx("img", { src: item.image ?? "/assets/images/default.png", alt: item.name, className: "cart-item__img" }), _jsxs("div", { className: "cart-item__info", children: [_jsx("p", { className: "cart-item__name", children: item.name }), _jsxs("p", { className: "cart-item__price", children: [_jsx("strong", { children: item.price.toLocaleString("es-CO") }), " /COP."] }), _jsxs("div", { className: "cart-item__container-quantity", children: [_jsxs("p", { className: "cart-item__quantity", children: ["En el carrito", _jsx("br", {}), _jsxs("strong", { children: [item.quantity, " ud."] })] }), _jsxs("div", { className: "cart-item__controls", children: [_jsx("button", { className: "btn-circle outline", onClick: () => removeFromCart(item.id), children: _jsx(DeleteOutlineIcon, { fontSize: "small" }) }), _jsx("button", { className: "btn-circle filled", onClick: () => decrementItem(item.id), children: _jsx(RemoveIcon, { fontSize: "small" }) }), _jsx("button", { className: "btn-circle filled", onClick: () => incrementItem(item.id), children: _jsx(AddIcon, { fontSize: "small" }) })] })] })] })] }, item.id)))) }), _jsxs("div", { className: "cart-drawer__footer", children: [_jsxs("div", { className: "cart-drawer__total", children: [_jsx("span", { children: "Total aproximado" }), _jsxs("strong", { children: [total.toLocaleString("es-CO"), " COP"] })] }), _jsx(Button, { variant: "contained", color: "success", fullWidth: true, onClick: () => setOpenShipping(true), children: "Realizar pedido" })] }), _jsx(ShippingForm, { open: openShipping, onClose: () => setOpenShipping(false), onConfirm: handleConfirmShipping, showMessage: showMessage }), _jsx(Snackbar, { open: open, autoHideDuration: 3000, onClose: handleClose, anchorOrigin: { vertical: "bottom", horizontal: "center" }, children: _jsx(Alert, { severity: severity, onClose: handleClose, sx: { width: "100%" }, children: message }) })] }));
};
export default Cart;
