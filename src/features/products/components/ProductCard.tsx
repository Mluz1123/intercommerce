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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_2px_10px_rgba(0,0,0,.06)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(0,0,0,.13)]">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-skeleton">
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.15,1)] group-hover:scale-[1.055]"
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
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold tracking-tight">
            {formatCents(product.priceCents)}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardBase);
