import type { Cents } from "../../lib/money";

/* ---- DTOs: forma cruda de DummyJSON ---- */
export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number; // dólares con decimales
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponseDTO {
  products: ProductDTO[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryDTO {
  slug: string;
  name: string;
  url: string;
}

/* ---- Modelo de dominio: lo que consume la app ---- */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  priceCents: Cents;
  rating: number;
  stock: number;
  brand: string | null;
  thumbnail: string;
  images: string[];
}

export interface ProductsPage {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
}

export interface ProductQueryParams {
  q?: string;
  category?: string;
  limit?: number;
  skip?: number;
}
