import { Shipping } from "../interfaces/Shipping";
import { Cart } from "../interfaces/Cart";
import { Invoice } from "../interfaces/Invoice";
export declare const generateInvoice: (customer: Shipping, items: Cart[]) => Invoice;
