import { Link } from "react-router-dom";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductFilters } from "./ProductFilters";

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

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div style={{ padding: 24 }}>
      <h1>InterCommerce</h1>
      <ProductFilters />

      {isLoading && <p>Cargando productos…</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && products.length === 0 && (
        <p>No se encontraron productos.</p>
      )}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.title}</Link> — $
            {(p.priceCents / 100).toFixed(2)}
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </div>
  );
}
