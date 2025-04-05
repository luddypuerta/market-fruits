import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCartStore } from "@/store/carts/cartStore";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Product } from "@/interfaces/Product";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./ProductCard.scss";

const ProductCard: React.FC<Product> = ({
  id,
  name,
  stock,
  price,
  tax,
  image,
}) => {
  const {
    items,
    addToCart,
    incrementItem,
    decrementItem,
    removeFromCart,
  } = useCartStore();

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
    } else {
      showMessage("Stock máximo alcanzado para este producto.");
    }
  };

  const handleDecrement = () => {
    decrementItem(id);
  };

  return (
    <>
      <div className="product-card">
        <img
          src={new URL(`@/assets/images/${image}`, import.meta.url).href}
          alt={name}
          className="product-card__image"
        />
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__description">Stock: {stock}</p>
        <p className="product-card__price">
          <strong>{price.toLocaleString("es-CO")}</strong> COP {tax > 0 && "(+IVA)"}
        </p>

        {!itemInCart ? (
          <button className="product-card__add-cart" onClick={handleAdd}>
            Añadir al carrito
          </button>
        ) : (
          <div className="product-card__controls">
            <p>
              En el carrito<br />
              <strong>{quantityInCart} ud.</strong>
            </p>

            <button onClick={() => removeFromCart(id)} className="btn-circle outline">
              <DeleteOutlineIcon fontSize="small" />
            </button>
            <button onClick={handleDecrement} className="btn-circle filled">
              <RemoveIcon fontSize="small" />
            </button>
            <button onClick={handleIncrement} className="btn-circle filled">
              <AddIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
