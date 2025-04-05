import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCartStore } from "@/store/carts/cartStore";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSnackbar } from "@/hooks/useSnackbar";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./ProductCard.scss";
const ProductCard = ({ id, name, stock, price, tax, image, }) => {
    const { items, addToCart, incrementItem, decrementItem, removeFromCart, } = useCartStore();
    const itemInCart = items.find((item) => item.id === id);
    const quantityInCart = itemInCart?.quantity || 0;
    const { open, message, showMessage, handleClose } = useSnackbar();
    const handleAdd = () => {
        if (quantityInCart >= stock) {
            showMessage("No hay más stock disponible para este producto.");
            return;
        }
        addToCart({ id, name, price, image });
    };
    const handleIncrement = () => {
        if (quantityInCart < stock) {
            incrementItem(id);
        }
        else {
            showMessage("Stock máximo alcanzado para este producto.");
        }
    };
    const handleDecrement = () => {
        decrementItem(id);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "product-card", children: [_jsx("img", { src: image, alt: name, className: "product-card__image" }), _jsx("h3", { className: "product-card__title", children: name }), _jsxs("p", { className: "product-card__description", children: ["Stock: ", stock] }), _jsxs("p", { className: "product-card__price", children: [_jsx("strong", { children: price.toLocaleString("es-CO") }), " COP ", tax > 0 && "(+IVA)"] }), !itemInCart ? (_jsx("button", { className: "product-card__add-cart", onClick: handleAdd, children: "A\u00F1adir al carrito" })) : (_jsxs("div", { className: "product-card__controls", children: [_jsxs("p", { children: ["En el carrito", _jsx("br", {}), _jsxs("strong", { children: [quantityInCart, " ud."] })] }), _jsx("button", { onClick: () => removeFromCart(id), className: "btn-circle outline", children: _jsx(DeleteOutlineIcon, { fontSize: "small" }) }), _jsx("button", { onClick: handleDecrement, className: "btn-circle filled", children: _jsx(RemoveIcon, { fontSize: "small" }) }), _jsx("button", { onClick: handleIncrement, className: "btn-circle filled", children: _jsx(AddIcon, { fontSize: "small" }) })] }))] }), _jsx(Snackbar, { open: open, autoHideDuration: 3000, onClose: handleClose, anchorOrigin: { vertical: "bottom", horizontal: "center" }, children: _jsx(Alert, { severity: "warning", onClose: handleClose, sx: { width: "100%" }, children: message }) })] }));
};
export default ProductCard;
