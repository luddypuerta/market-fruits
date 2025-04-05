import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/carts/cartStore";
import ProductCard from "./ProductCard";
beforeEach(() => {
    useCartStore.getState().clearCart();
});
describe("ProductCard", () => {
    it("adds product to cart when clicking 'Add to Cart'", () => {
        render(_jsx(ProductCard, { id: 1, name: "Manzana Roja", stock: 5, price: 2000, tax: 0.19, image: "https://via.placeholder.com/100", category: "Frutas" }));
        const button = screen.getByRole("button", { name: /Añadir al carrito/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const items = useCartStore.getState().items;
        expect(items.length).toBe(1);
        expect(items[0].name).toBe("Manzana Roja");
        expect(items[0].quantity).toBe(1);
    });
});
