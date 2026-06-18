import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { CatalogPage } from "../../products/components/CatalogPage";
import { CartDrawer } from "../components/CartDrawer";
import { useCartStore } from "../store/cartStore";

function renderCatalog() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CatalogPage />
        <CartDrawer />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Flow: add to cart", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
    localStorage.clear();
  });

  it("adds a product and updates the cart total", async () => {
    const user = userEvent.setup();
    renderCatalog();

    const addButton = await screen.findByRole("button", {
      name: /agregar producto de prueba al carrito/i,
    });
    await user.click(addButton);

    await user.click(screen.getByRole("button", { name: /^carrito/i }));

    const dialog = screen.getByRole("dialog", { name: /carrito/i });
    expect(within(dialog).getByTestId("cart-total")).toHaveTextContent(
      "$11.90",
    );
  });
});
