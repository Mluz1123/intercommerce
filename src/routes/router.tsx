import { createBrowserRouter, Outlet } from "react-router-dom";
import { CatalogPage } from "../features/products/components/CatalogPage";
import { ProductDetailPage } from "../features/products/components/ProductDetailPage";
import { NotFoundPage } from "../components/ui/NotFoundPage";
import { CartDrawer } from "../features/cart/components/CartDrawer";
import { Toaster } from "../components/ui/toast/Toaster";

function RootLayout() {
  return (
    <>
      <Outlet />
      <CartDrawer />
      <Toaster />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <CatalogPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
