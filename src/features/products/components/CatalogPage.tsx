import { useCallback } from "react";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { useInfiniteScroll } from "../../../lib/useInfiniteScroll";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { useCartStore } from "../../cart/store/cartStore";
import { CartButton } from "../../cart/components/CartButton";
import { useToast } from "../../../components/ui/toast/useToast";
import type { Product } from "../types";

export function CatalogPage() {
  const { q, category } = useProductFilters();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({ q, category });

  // dentro del componente:
  const addItem = useCartStore((s) => s.addItem);
  const toast = useToast();

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
      toast(`${product.title} agregado al carrito`);
    },
    [addItem, toast], // ambos estables -> el callback sigue estable
  );

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];
  const isEmpty = !isLoading && !isError && products.length === 0;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-xs font-extrabold text-white">
              IC
            </span>
            <span className="text-base font-bold tracking-tight">
              InterCommerce
            </span>
          </div>
          <CartButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8">
        <h1 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          Objetos con intención,
          <br />
          <span className="font-semibold text-muted">elegidos uno a uno.</span>
        </h1>

        <div className="mb-8">
          <ProductFilters />
        </div>

        {isError && (
          <p className="rounded-card bg-surface p-6 text-sm text-subtle ring-1 ring-black/5">
            No pudimos cargar los productos: {error.message}
          </p>
        )}

        {isEmpty && (
          <div className="rounded-card bg-surface p-12 text-center ring-1 ring-black/5">
            <p className="text-base font-semibold">
              No se encontraron productos
            </p>
            <p className="mt-1 text-sm text-subtle">
              Prueba con otra búsqueda o categoría.
            </p>
          </div>
        )}

        {!isError && !isEmpty && (
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            showSkeletons={isLoading || isFetchingNextPage}
            skeletonCount={isLoading ? 8 : 4}
          />
        )}

        <div ref={sentinelRef} className="h-px" aria-hidden />
      </main>
    </div>
  );
}
