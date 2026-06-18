import { describe, expect, it } from "vitest";
import { calculateTotals } from "./calculateTotals";
import type { CartItem } from "../types";

const item = (over: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  title: "X",
  priceCents: 1000,
  thumbnail: "",
  quantity: 1,
  ...over,
});

describe("calculateTotals", () => {
  it("carrito vacío da todo en cero", () => {
    expect(calculateTotals([])).toEqual({
      itemCount: 0,
      subtotalCents: 0,
      taxCents: 0,
      totalCents: 0,
    });
  });

  it("suma cantidades y aplica IVA del 19%", () => {
    const totals = calculateTotals([item({ priceCents: 1000, quantity: 2 })]);
    expect(totals.subtotalCents).toBe(2000);
    expect(totals.taxCents).toBe(380);
    expect(totals.totalCents).toBe(2380);
  });
});
