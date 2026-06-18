import { createBrowserRouter } from "react-router-dom";
import { CatalogPage } from "../features/products/components/CatalogPage";
import { ProductDetailPage } from "../features/products/components/ProductDetailPage";
import { NotFoundPage } from "../components/ui/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", element: <CatalogPage /> },
  { path: "/product/:id", element: <ProductDetailPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
