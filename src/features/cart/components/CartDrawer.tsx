import { useCartStore } from "../store/cartStore";
import { useCart } from "../hooks/useCart";
import { formatCents } from "../../../lib/money";
import { TAX_RATE } from "../lib/calculateTotals";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const { items, totals } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-canvas shadow-[0_12px_36px_rgba(0,0,0,0.3)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="text-lg font-extrabold tracking-tight">
            Tu carrito{" "}
            {totals.itemCount > 0 && (
              <span className="text-muted">({totals.itemCount})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="grid h-9 w-9 place-items-center rounded-full text-subtle hover:bg-black/5"
          >
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-base font-semibold">Tu carrito está vacío</p>
            <p className="text-sm text-subtle">
              Agrega productos desde el catálogo.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-black/5 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-black/5">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-1 text-sm font-semibold">
                      {item.title}
                    </span>
                    <span className="text-sm text-subtle">
                      {formatCents(item.priceCents)}
                    </span>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center rounded-full bg-surface ring-1 ring-black/5">
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          className="grid h-8 w-8 place-items-center text-subtle hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="grid h-8 w-8 place-items-center text-subtle hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold text-muted hover:text-[#e55]"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-bold">
                    {formatCents(item.priceCents * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <footer className="border-t border-black/5 bg-surface px-5 py-4">
              <dl className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between text-subtle">
                  <dt>Subtotal</dt>
                  <dd>{formatCents(totals.subtotalCents)}</dd>
                </div>
                <div className="flex justify-between text-subtle">
                  <dt>Impuestos ({Math.round(TAX_RATE * 100)}%)</dt>
                  <dd>{formatCents(totals.taxCents)}</dd>
                </div>
                <div className="mt-1 flex justify-between border-t border-black/5 pt-2 text-base font-extrabold">
                  <dt>Total</dt>
                  <dd data-testid="cart-total">
                    {formatCents(totals.totalCents)}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-accent py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,113,16,0.35)]"
              >
                Finalizar compra
              </button>
              <button
                type="button"
                onClick={clear}
                className="mt-2 w-full py-2 text-xs font-semibold text-muted hover:text-ink"
              >
                Vaciar carrito
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
