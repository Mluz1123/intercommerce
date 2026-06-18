import { useCartStore } from "../store/cartStore";
import { useCart } from "../hooks/useCart";

export function CartButton() {
  const openCart = useCartStore((s) => s.openCart);
  const { totals } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex items-center gap-2 rounded-full bg-canvas px-4 py-2 text-sm font-semibold ring-1 ring-black/5 hover:ring-black/15"
    >
      Carrito
      {totals.itemCount > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
          {totals.itemCount}
        </span>
      )}
    </button>
  );
}
