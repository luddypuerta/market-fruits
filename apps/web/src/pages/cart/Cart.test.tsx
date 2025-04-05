import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "./Cart";

vi.mock("@/hooks/useSnackbar", () => ({
  useSnackbar: () => ({
    open: false,
    message: "",
    severity: "success",
    showMessage: vi.fn(),
    handleClose: vi.fn(),
  }),
}));

vi.mock("@/store/carts/cartStore", async () => {
  const actual = await vi.importActual<typeof import("@/store/carts/cartStore")>("@/store/carts/cartStore");
  return {
    ...actual,
    useCartStore: vi.fn(() => ({
      items: [
        {
          id: 1,
          name: "Apple",
          price: 2000,
          quantity: 2,
          stock: 5,
          image: "",
        },
      ],
      removeFromCart: vi.fn(),
      incrementItem: vi.fn(),
      decrementItem: vi.fn(),
      clearCart: vi.fn(),
      loadFromLocalStorage: vi.fn(),
    })),
  };
});

vi.mock("@/store/products/productStore", async () => {
  const actual = await vi.importActual<typeof import("@/store/products/productStore")>("@/store/products/productStore");
  return {
    ...actual,
    useProductStore: {
      getState: () => ({
        loadProducts: vi.fn(),
      }),
    },
  };
});

describe("Cart Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders cart with items and total", () => {
    render(
      <BrowserRouter>
        <Cart onCloseCart={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText(/4.000/)).toBeInTheDocument();
    expect(screen.getByText("Realizar pedido")).toBeInTheDocument();
  });
});
