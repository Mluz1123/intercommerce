import type { Cents } from "../../lib/money";

export interface CartItem {
  id: number;
  title: string;
  priceCents: Cents;
  thumbnail: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotalCents: Cents;
  taxCents: Cents;
  totalCents: Cents;
}
