import { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "../../../lib/useDebouncedValue";
import { useCategories } from "../hooks/useCategories";
import { useProductFilters, type SortOption } from "../hooks/useProductFilters";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Destacados",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  rating: "Mejor valorados",
};

const VISIBLE_COUNT = 6;

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-accent">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
);

export function ProductFilters() {
  const { q, category, sort, setQuery, setCategory, setSort } = useProductFilters();
  const { data: categories = [] } = useCategories();

  const [text, setText] = useState(q);
  const debounced = useDebouncedValue(text, 400);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounced !== q) setQuery(debounced);
  }, [debounced, q, setQuery]);

  useEffect(() => { setText(q); }, [q]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const visible = categories.slice(0, VISIBLE_COUNT);
  const hidden = categories.slice(VISIBLE_COUNT);
  const moreActive = hidden.some((c) => c.slug === category);

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
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
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

      <div className="flex items-center gap-3">
        {/* Chips — scroll horizontal independiente */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setCategory("")}
            aria-pressed={category === ""}
            className={chip(category === "")}
          >
            Todo
          </button>

          {visible.map((c) => (
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

          {hidden.length > 0 && (
            <div ref={moreRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                className={`${chip(moreActive)} flex items-center gap-1`}
              >
                Más <Chevron />
              </button>
              {moreOpen && (
                <div className="absolute left-0 top-full z-20 mt-1.5 min-w-[200px] rounded-2xl bg-surface p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.13)] ring-1 ring-black/5">
                  {hidden.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => { setCategory(c.slug); setMoreOpen(false); }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-black/5"
                    >
                      {c.name}
                      {category === c.slug && <Check />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ordenar — siempre visible, no entra al scroll */}
        <div ref={sortRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-[13px] font-semibold ring-1 ring-black/5 hover:ring-black/15"
          >
            <span className="hidden text-muted sm:inline">Ordenar:</span>
            <span className="text-ink">{SORT_LABELS[sort]}</span>
            <span className="text-muted"><Chevron /></span>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-20 mt-1.5 min-w-[220px] rounded-2xl bg-surface p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.13)] ring-1 ring-black/5">
              {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setSort(key); setSortOpen(false); }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-black/5"
                >
                  {label}
                  {sort === key && <Check />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
