import { Shipping } from "../interfaces/Shipping";
import { Invoice } from "../interfaces/Invoice";
import { Cart } from "../interfaces/Cart";
import { v4 as uuidv4 } from "uuid";

export const generateInvoice = (customer: Shipping, items: Cart[]): Invoice => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    id: uuidv4(),
    customer,
    items,
    total,
    date: new Date().toISOString(),
  };
};
