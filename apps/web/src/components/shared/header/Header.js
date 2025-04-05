import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import logo from "@/assets/icons/market-fruits-logo.png";
import { useCartStore } from "@/store/carts/cartStore";
import cartIcon from "@/assets/icons/cart.png";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Button } from "@libluddy/ui-lib";
import Cart from "@/pages/cart/Cart";
import { useState } from "react";
import "./Header.scss";
const Header = () => {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("user");
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        navigate("/home", { replace: true });
    };
    const goToLogin = () => {
        console.log("goToLogin");
        navigate("/auth/iniciar-sesion");
    };
    return (_jsxs("header", { className: "header", children: [_jsxs("div", { className: "header__left", children: [_jsx("img", { src: logo, alt: "MarketFruits Logo", className: "header__logo" }), _jsx("span", { className: "header__brand", children: "MARKETFRUITS" })] }), _jsxs("div", { className: "header__right", children: [token && role === "admin" ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "header__user", children: userName }), _jsx("button", { className: "header__logout", onClick: logout, children: "Cerrar sesi\u00F3n" })] })) : (_jsx(Button, { label: "Iniciar sesi\u00F3n (Admin)", onClick: goToLogin, color: "primary" })), role !== "admin" && (_jsxs("button", { className: "header__cart", onClick: () => setCartOpen(true), children: [_jsx("img", { src: cartIcon, alt: "Carrito" }), _jsx("span", { className: "header__cart-count", children: totalItems }), _jsxs("span", { className: "header__cart-total", children: [totalPrice.toLocaleString("es-CO"), "$"] })] }))] }), _jsx(Drawer, { anchor: "right", open: isCartOpen, onClose: () => setCartOpen(false), PaperProps: { sx: { width: "360px", maxWidth: "90vw" } }, children: _jsx(Cart, { onCloseCart: () => setCartOpen(false) }) })] }));
};
export default Header;
