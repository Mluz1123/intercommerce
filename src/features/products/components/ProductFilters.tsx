import { useEffect, useState } from "react";
import { useDebouncedValue } from "../../../lib/useDebouncedValue";
import { useCategories } from "../hooks/useCategories";
import { useProductFilters } from "../hooks/useProductFilters";

export function ProductFilters() {
  const { q, category, setQuery, setCategory } = useProductFilters();
  const { data: categories = [] } = useCategories();

  const [text, setText] = useState(q);
  const debounced = useDebouncedValue(text, 400);

  useEffect(() => {
    if (debounced !== q) setQuery(debounced);
  }, [debounced, q, setQuery]);

  useEffect(() => {
    setText(q);
  }, [q]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
      active
        ? "bg-accent text-white"
        : "bg-surface text-subtle ring-1 ring-black/5 hover:text-ink"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-xl">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          className="w-full rounded-full bg-surface py-3 pl-11 pr-4 text-sm shadow-[0_1px_4px_rgba(0,0,0,0.06)] outline-none ring-1 ring-black/5 placeholder:text-muted focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCategory("")}
          aria-pressed={category === ""}
          className={chip(category === "")}
        >
          Todo
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            aria-pressed={category === c.slug}
            className={chip(category === c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
