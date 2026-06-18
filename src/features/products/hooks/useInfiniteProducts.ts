import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productsService";
import { productKeys } from "./queryKeys";
import type { ProductsPage } from "../types";

const PAGE_SIZE = 20;

interface ProductFilters {
  q?: string;
  category?: string;
}

export function useInfiniteProducts(filters: ProductFilters) {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters),
    queryFn: ({ pageParam }) =>
      fetchProducts({ ...filters, limit: PAGE_SIZE, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsPage) => {
      const loaded = lastPage.skip + lastPage.items.length;
      return loaded < lastPage.total ? loaded : undefined;
    },
  });
}
