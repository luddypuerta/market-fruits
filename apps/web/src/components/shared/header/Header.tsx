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
    navigate("/auth/iniciar-sesion");
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="MarketFruits Logo" className="header__logo" />
        <span className="header__brand">MARKETFRUITS</span>
      </div>

      <div className="header__right">
        {token && role === "admin" ? (
          <>
            <span className="header__user">{userName}</span>
            <button className="header__logout" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Button label="Iniciar sesión (Admin)" onClick={goToLogin} color="primary" />
        )}

        {role !== "admin" && (
          <button className="header__cart" onClick={() => setCartOpen(true)}>
            <img src={cartIcon} alt="Carrito" />
            <span className="header__cart-count">{totalItems}</span>
            <span className="header__cart-total">
              {totalPrice.toLocaleString("es-CO")}$
            </span>
          </button>
        )}
      </div>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{ sx: { width: "360px", maxWidth: "90vw" } }}
      >
        <Cart onCloseCart={() => setCartOpen(false)} />
      </Drawer>
    </header>
  );
};

export default Header;
