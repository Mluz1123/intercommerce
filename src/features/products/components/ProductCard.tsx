import { memo } from "react";
import { Link } from "react-router-dom";
import { formatCents } from "../../../lib/money";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCardBase({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden bg-skeleton">
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          aria-label={`Agregar ${product.title} al carrito`}
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-surface/90 text-ink shadow-md ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-accent hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {product.category}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-accent"
        >
          {product.title}
        </Link>
        <span className="mt-auto pt-2 text-base font-bold tracking-tight">
          {formatCents(product.priceCents)}
        </span>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardBase);
