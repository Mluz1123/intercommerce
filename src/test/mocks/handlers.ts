import { http, HttpResponse } from "msw";

const products = [
  {
    id: 1,
    title: "Producto de prueba",
    description: "Una descripción de prueba.",
    category: "beauty",
    price: 10, // $10.00
    discountPercentage: 0,
    rating: 4.5,
    stock: 20,
    brand: "Marca",
    thumbnail: "https://example.com/p1.jpg",
    images: ["https://example.com/p1.jpg"],
  },
];

export const handlers = [
  http.get("https://dummyjson.com/products", () =>
    HttpResponse.json({ products, total: products.length, skip: 0, limit: 20 }),
  ),
  http.get("https://dummyjson.com/products/categories", () =>
    HttpResponse.json([{ slug: "beauty", name: "Beauty", url: "" }]),
  ),
  http.get("https://dummyjson.com/products/:id", ({ params }) => {
    const product = products.find((p) => String(p.id) === params.id);
    return product
      ? HttpResponse.json(product)
      : new HttpResponse(null, { status: 404 });
  }),
];
