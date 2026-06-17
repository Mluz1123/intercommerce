/** Centavos como entero. 1999 === $19.99 */
export type Cents = number;

export const toCents = (amount: number): Cents => Math.round(amount * 100);

export const formatCents = (
  cents: Cents,
  currency = "USD",
  locale = "en-US",
): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    cents / 100,
  );
