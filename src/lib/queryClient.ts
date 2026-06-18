import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "../api/client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min: no refetch innecesario al navegar
      gcTime: 1000 * 60 * 5, // 5 min en caché tras quedar inactiva
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Errores de cliente (404, 400...) no se arreglan reintentando.
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        // Red (status 0) y 5xx sí merecen reintento.
        return failureCount < 2;
      },
    },
  },
});
