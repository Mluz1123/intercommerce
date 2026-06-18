import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export interface UseProductFilters {
  q: string;
  category: string;
  setQuery: (q: string) => void;
  setCategory: (category: string) => void;
  reset: () => void;
}

export function useProductFilters(): UseProductFilters {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

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

  const reset = useCallback(() => {
    update((p) => {
      p.delete("q");
      p.delete("category");
    });
  }, [update]);

  return useMemo(
    () => ({ q, category, setQuery, setCategory, reset }),
    [q, category, setQuery, setCategory, reset],
  );
}
