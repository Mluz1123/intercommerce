import { createBrowserRouter } from "react-router-dom";
import { CatalogPage } from "../features/products/components/CatalogPage";
import { ProductDetailPage } from "../features/products/components/ProductDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <CatalogPage /> },
  { path: "/product/:id", element: <ProductDetailPage /> },
]);
