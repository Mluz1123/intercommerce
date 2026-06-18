import type { CartItem, CartTotals } from "../types";

export const TAX_RATE = 0.19; // IVA configurable

export function calculateTotals(
  items: CartItem[],
  taxRate = TAX_RATE,
): CartTotals {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const taxCents = Math.round(subtotalCents * taxRate);

  return {
    itemCount,
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
  };
}
