import { Link } from "react-router-dom";
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
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Tu selección
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">
              Carrito{" "}
              {totals.itemCount > 0 && (
                <span className="text-muted">({totals.itemCount})</span>
              )}
            </h2>
          </div>
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
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-black/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-9 text-muted"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold">Tu carrito está vacío</p>
              <p className="text-sm text-subtle">
                Explora el catálogo y agrega tus productos favoritos.
              </p>
            </div>
            <Link
              to="/"
              onClick={closeCart}
              className="mt-1 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,113,16,0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explorar catálogo
            </Link>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
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
