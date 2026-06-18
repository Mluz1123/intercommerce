import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/productsService";
import { productKeys } from "./queryKeys";

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
