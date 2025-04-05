import { v4 as uuidv4 } from "uuid";
export const generateInvoice = (customer, items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
        id: uuidv4(),
        customer,
        items,
        total,
        date: new Date().toISOString(),
    };
};
