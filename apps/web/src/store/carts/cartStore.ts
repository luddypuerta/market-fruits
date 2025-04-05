import { Cart } from "@/interfaces/Cart";
import { create } from "zustand";

interface CartState {
  items: Cart[];
  addToCart: (item: Omit<Cart, "quantity"> & { image: string }) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  loadFromLocalStorage: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) => {
    const items = get().items;
    const exists = items.find((i) => i.id === item.id);

    const updated = exists
      ? items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...items, { ...item, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  incrementItem: (id) => {
    const items = get().items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  decrementItem: (id) => {
    const items = get().items
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  removeFromCart: (id) => {
    const updated = get().items.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });

    // Restaurar stock original (si es necesario hacerlo visual)
    const original = localStorage.getItem("products");
    if (original) {
      const resetProducts = JSON.parse(original);
      localStorage.setItem("products", JSON.stringify(resetProducts));
    }
  },

  loadFromLocalStorage: () => {
    const data = localStorage.getItem("cart");
    if (data) {
      set({ items: JSON.parse(data) });
    }
  },
}));
