import { Shipping } from "./Shipping";
import { Cart } from "./Cart";

export interface Invoice {
    id: string;
    customer: Shipping;
    items: Cart[];
    total: number;
    date: string;
}
  