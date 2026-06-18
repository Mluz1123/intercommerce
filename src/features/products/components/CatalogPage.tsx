import { Link } from "react-router-dom";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useCategories } from "../hooks/useCategories";

export function CatalogPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({});
  const categories = useCategories();

  if (isLoading) return <p style={{ padding: 24 }}>Cargando productos…</p>;
  if (isError) return <p style={{ padding: 24 }}>Error: {error.message}</p>;

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div style={{ padding: 24 }}>
      <h1>InterCommerce ({products.length} productos)</h1>
      <p>Categorías cargadas: {categories.data?.length ?? 0}</p>
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
