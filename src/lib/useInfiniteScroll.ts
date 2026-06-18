import { useEffect, useRef } from "react";

interface Options {
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  onLoadMore,
}: Options) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetching) onLoadMore();
      },
      { rootMargin: "400px" }, // precarga antes de que el usuario llegue al fondo
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, onLoadMore]);

  return sentinelRef;
}
