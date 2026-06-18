import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(Number(id));

  if (isLoading) return <p style={{ padding: 24 }}>Cargando producto…</p>;
  if (isError) return <p style={{ padding: 24 }}>Error: {error.message}</p>;
  if (!product) return <p style={{ padding: 24 }}>Producto no encontrado.</p>;

  return (
    <div style={{ padding: 24 }}>
      <Link to="/">← Volver</Link>
      <h1>{product.title}</h1>
      <p>${(product.priceCents / 100).toFixed(2)}</p>
      <p>{product.description}</p>
    </div>
  );
}
