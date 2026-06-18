import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  showSkeletons?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({
  products,
  onAddToCart,
  showSkeletons = false,
  skeletonCount = 8,
}: ProductGridProps) {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(210px,1fr))]">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
      {showSkeletons &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={`sk-${i}`} />
        ))}
    </div>
  );
}
