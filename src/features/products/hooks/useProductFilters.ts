import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export interface UseProductFilters {
  q: string;
  category: string;
  sort: SortOption;
  setQuery: (q: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: SortOption) => void;
  reset: () => void;
}

export function useProductFilters(): UseProductFilters {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") as SortOption) || "featured";

  const update = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          return next;
        },
        { replace: true }, // no contaminar el historial con cada tecleo
      );
    },
    [setSearchParams],
  );

  const setQuery = useCallback(
    (value: string) => {
      update((p) => {
        const trimmed = value.trim();
        if (trimmed) p.set("q", trimmed);
        else p.delete("q");
      });
    },
    [update],
  );

  const setCategory = useCallback(
    (value: string) => {
      update((p) => {
        if (value) p.set("category", value);
        else p.delete("category");
      });
    },
    [update],
  );

  const setSort = useCallback(
    (value: SortOption) => {
      update((p) => {
        if (value && value !== "featured") p.set("sort", value);
        else p.delete("sort");
      });
    },
    [update],
  );

  const reset = useCallback(() => {
    update((p) => {
      p.delete("q");
      p.delete("category");
      p.delete("sort");
    });
  }, [update]);

  return useMemo(
    () => ({ q, category, sort, setQuery, setCategory, setSort, reset }),
    [q, category, sort, setQuery, setCategory, setSort, reset],
  );
}
