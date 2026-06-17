import { apiFetch } from "../../../api/client";
import { toCents } from "../../../lib/money";
import type {
  Category,
  CategoryDTO,
  Product,
  ProductDTO,
  ProductQueryParams,
  ProductsPage,
  ProductsResponseDTO,
} from "../types";

const DEFAULT_LIMIT = 20;

function mapProduct(dto: ProductDTO): Product {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    priceCents: toCents(dto.price), // float -> centavos en el borde
    rating: dto.rating,
    stock: dto.stock,
    brand: dto.brand ?? null,
    thumbnail: dto.thumbnail,
    images: dto.images,
  };
}

export function buildProductsPath(params: ProductQueryParams): string {
  const { q, category, limit = DEFAULT_LIMIT, skip = 0 } = params;
  const search = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (q && q.trim().length > 0) {
    search.set("q", q.trim());
    return `/products/search?${search.toString()}`;
  }
  if (category) {
    return `/products/category/${encodeURIComponent(category)}?${search.toString()}`;
  }
  return `/products?${search.toString()}`;
}

export async function fetchProducts(
  params: ProductQueryParams,
): Promise<ProductsPage> {
  const data = await apiFetch<ProductsResponseDTO>(buildProductsPath(params));
  let items = data.products.map(mapProduct);

  // DummyJSON no combina q + category: si ambos llegan, priorizamos la
  // búsqueda y afinamos la categoría en cliente sobre la página actual.
  if (params.q && params.category) {
    items = items.filter((p) => p.category === params.category);
  }

  return { items, total: data.total, skip: data.skip, limit: data.limit };
}

export async function fetchProductById(id: number): Promise<Product> {
  const dto = await apiFetch<ProductDTO>(`/products/${id}`);
  return mapProduct(dto);
}

export async function fetchCategories(): Promise<Category[]> {
  const dtos = await apiFetch<CategoryDTO[]>("/products/categories");
  return dtos.map((c) => ({ slug: c.slug, name: c.name }));
}
