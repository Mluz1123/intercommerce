import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/productsService";
import { productKeys } from "./queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: fetchCategories,
    staleTime: Infinity,
  });
}
