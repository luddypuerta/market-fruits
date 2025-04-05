import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { validateCountryInAmerica } from "@/utils/helpers/validateCountry";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ShippingForm from "./ShippingForm";

vi.mock("@/utils/helpers/validateCountry", () => ({
  validateCountryInAmerica: vi.fn(),
}));

const mockOnClose = vi.fn();
const mockOnConfirm = vi.fn();
const mockShowMessage = vi.fn();

const fillForm = () => {
  fireEvent.change(screen.getByLabelText(/nombre completo/i), {
    target: { value: "Edward Larsson" },
  });
  fireEvent.change(screen.getByLabelText(/teléfono/i), {
    target: { value: "123456789" },
  });
  fireEvent.change(screen.getByLabelText(/correo/i), {
    target: { value: "edward@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/país/i), {
    target: { value: "Colombia" },
  });
};

describe("ShippingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show warning if any field is empty", () => {
    render(
      <ShippingForm
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        showMessage={mockShowMessage}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));
    expect(mockShowMessage).toHaveBeenCalledWith("Todos los campos son obligatorios.", "warning");
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("should show error if country is not in America", async () => {
    (validateCountryInAmerica as ReturnType<typeof vi.fn>).mockResolvedValue(false);

    render(
      <ShippingForm
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        showMessage={mockShowMessage}
      />
    );

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith(
        "❌ El país ingresado no pertenece al continente americano.",
        "error"
      );
    });

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("should call onConfirm and show success message if form is valid", async () => {
    (validateCountryInAmerica as ReturnType<typeof vi.fn>).mockResolvedValue(true);

    render(
      <ShippingForm
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        showMessage={mockShowMessage}
      />
    );

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /confirmar/i }));

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith({
        name: "Edward Larsson",
        phone: "123456789",
        email: "edward@example.com",
        country: "Colombia",
      });

      expect(mockShowMessage).toHaveBeenCalledWith(
        "✅ País válido. Pedido confirmado.",
        "success"
      );
    });
  });
});
