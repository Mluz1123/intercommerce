import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("../features/products/components/CatalogPage"),
  },
  {
    path: "/product/:id",
    lazy: () => import("../features/products/components/ProductDetailPage"),
  },
]);
