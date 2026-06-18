import { type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { ApiError } from "../../../api/client";
import { formatCents } from "../../../lib/money";
import { sanitizeHtml } from "../../../lib/sanitize";
import { useToast } from "../../../components/ui/toast/useToast";
import { useCartStore } from "../../cart/store/cartStore";
import { CartButton } from "../../cart/components/CartButton";
import { ProductGallery } from "./ProductGallery";

function DetailShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link
            to="/"
            className="text-sm font-semibold text-subtle hover:text-ink"
          >
            ← Volver al catálogo
          </Link>
          <CartButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <DetailShell>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="ic-shimmer aspect-square rounded-card" />
        <div className="flex flex-col gap-4">
          <div className="ic-shimmer h-3 w-24 rounded" />
          <div className="ic-shimmer h-8 w-3/4 rounded" />
          <div className="ic-shimmer h-4 w-1/2 rounded" />
          <div className="ic-shimmer h-10 w-1/3 rounded" />
          <div className="ic-shimmer h-24 w-full rounded" />
          <div className="ic-shimmer h-12 w-full rounded-full" />
        </div>
      </div>
    </DetailShell>
  );
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const invalidId = !Number.isFinite(productId) || productId <= 0;

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();

  if (isLoading) return <DetailSkeleton />;

  if (invalidId || isError || !product) {
    const notFound =
      invalidId || (error instanceof ApiError && error.status === 404);
    return (
      <DetailShell>
        <div className="rounded-card bg-surface p-12 text-center ring-1 ring-black/5">
          <p className="text-lg font-bold">
            {notFound ? "Producto no encontrado" : "Algo salió mal"}
          </p>
          <p className="mt-1 text-sm text-subtle">
            {notFound
              ? "El producto que buscas no existe o fue retirado."
              : "No pudimos cargar este producto. Inténtalo de nuevo."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
          >
            Volver al catálogo
          </Link>
        </div>
      </DetailShell>
    );
  }

  const handleAdd = () => {
    addItem(product);
    toast("Agregado al carrito");
  };

  return (
    <DetailShell>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
            <span className="font-semibold text-ink">
              ★ {product.rating.toFixed(1)}
            </span>
            {product.brand && <span>· {product.brand}</span>}
            <span>
              · {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
            </span>
          </div>

          <p className="mt-5 text-3xl font-extrabold tracking-tight">
            {formatCents(product.priceCents)}
          </p>

          <div
            className="mt-5 text-sm leading-relaxed text-subtle [&_a]:text-accent [&_a]:underline"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(product.description),
            }}
          />

          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="mt-8 flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,113,16,0.35)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </DetailShell>
  );
}
