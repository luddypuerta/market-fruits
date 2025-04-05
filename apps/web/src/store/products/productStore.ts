import { Product } from "@/interfaces/Product";
import { create } from "zustand";

interface ProductState {
    products: Product[];
    loadProducts: () => void;
    updateStock: (id: number, quantity: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],

    loadProducts: () => {
        const data = localStorage.getItem("products");
        const parsed = data ? JSON.parse(data) : [];
        set({ products: parsed });
    },

    updateStock: (id, quantity) => {
        const data = localStorage.getItem("products");
        const parsed: Product[] = data ? JSON.parse(data) : [];

        const updated = parsed.map((p) =>
            p.id === id ? { ...p, stock: Math.max(p.stock - quantity, 0) } : p
        );

        localStorage.setItem("products", JSON.stringify(updated));
        set({ products: updated });
    },
}));
