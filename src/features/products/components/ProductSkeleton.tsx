export function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card bg-surface shadow-[0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
      <div className="ic-shimmer aspect-square" />
      <div className="flex flex-col gap-2 p-4">
        <div className="ic-shimmer h-2.5 w-1/3 rounded" />
        <div className="ic-shimmer h-3.5 w-4/5 rounded" />
        <div className="ic-shimmer mt-2 h-4 w-1/4 rounded" />
      </div>
    </div>
  );
}
