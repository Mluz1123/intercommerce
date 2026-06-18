import { useMemo } from "react";
import { useCartStore } from "../store/cartStore";
import { calculateTotals } from "../lib/calculateTotals";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const totals = useMemo(() => calculateTotals(items), [items]);
  return { items, totals };
}
