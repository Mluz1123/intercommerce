import { useEffect, useState } from "react";
import { useDebouncedValue } from "../../../lib/useDebouncedValue";
import { useCategories } from "../hooks/useCategories";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductFilters() {
  const { q, category, setQuery, setCategory, reset } = useProductFilters();
  const { data: categories = [] } = useCategories();

  const [text, setText] = useState(q);
  const debounced = useDebouncedValue(text, 400);

  // Comprometer el texto debounced a la URL (solo si cambió).
  useEffect(() => {
    if (debounced !== q) setQuery(debounced);
  }, [debounced, q, setQuery]);

  // Sincronizar el input si la URL cambia por fuera (reset, atrás).
  useEffect(() => {
    setText(q);
  }, [q]);

  const hasActiveFilters = q !== "" || category !== "";

  return (
    <div>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar productos…"
        aria-label="Buscar productos"
      />

      <div role="group" aria-label="Categorías">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={category === c.slug}
            onClick={() => setCategory(category === c.slug ? "" : c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {hasActiveFilters && (
        <button type="button" onClick={reset}>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
