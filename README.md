# InterCommerce

SPA de e-commerce que consume la API pública de [DummyJSON](https://dummyjson.com). Catálogo con filtros sincronizados a la URL, infinite scroll, detalle de producto y carrito persistente.

- **Demo en vivo:** _https://intercommerce-chi.vercel.app/_
- **Repositorio:** _https://github.com/Mluz1123/intercommerce_

---

## Stack

Vite + React 18 + TypeScript (modo estricto), TanStack Query para estado de servidor, Zustand para estado de cliente, React Router para navegación, Tailwind CSS v4 para estilos, y Vitest + React Testing Library + MSW para pruebas.

---

## Arquitectura

El proyecto sigue una organización **feature-first** con separación estricta de capas. Ningún componente contiene lógica de negocio: la UI solo recibe datos y emite eventos.

```
src/
  api/                 # cliente fetch + normalización de errores (ApiError)
  features/
    products/
      components/      # UI: grid, card, skeleton, filtros, detalle
      hooks/           # useInfiniteProducts, useProduct, useProductFilters, queryKeys
      services/        # buildProductsPath + mappers DTO -> dominio
      types.ts         # DTOs (API) y modelo de dominio, separados
    cart/
      components/      # drawer, botón con badge
      hooks/           # useCart (modelo de lectura + totales derivados)
      store/           # cartStore (Zustand + persist)
      lib/             # calculateTotals (lógica pura, sin React)
      types.ts
  components/ui/       # ErrorBoundary, Toast, NotFoundPage (UI reutilizable)
  lib/                 # money, sanitize, useDebouncedValue, useInfiniteScroll
  routes/              # definición de rutas
  test/                # setup de Vitest + mocks de MSW
```

### Decisiones clave

**Dinero en centavos enteros.** Todos los montos se manejan como enteros (`1999` = $19.99). Los precios de la API (floats) se convierten a centavos en el _mapper_ de la capa de red, evitando errores de redondeo de punto flotante. Los impuestos se calculan sobre enteros y se redondean una sola vez.

**DTO vs. modelo de dominio.** La forma cruda de la API (`ProductDTO`) está separada del modelo que consume la app (`Product`). Esto aísla la UI de cambios en la API y elimina el uso de `any`.

**URL como única fuente de verdad de los filtros.** Búsqueda y categoría viven en `URLSearchParams`. Recargar o compartir el enlace restaura el estado exacto. Como el `queryKey` incluye los filtros, cambiar uno dispara una query nueva desde la primera página automáticamente.

**Factory de query keys.** Centraliza las llaves de caché en `queryKeys.ts`, haciendo la invalidación predecible y evitando strings mágicos.

**Reintentos selectivos.** El `retry` no reintenta errores de cliente (404, 400) porque no se resuelven reintentando; sí reintenta fallos de red y errores 5xx.

**Carrito persistente.** El store de Zustand usa el middleware `persist` (LocalStorage). `partialize` persiste solo los items, no el estado de apertura del drawer. Cada item guarda una instantánea del producto (precio congelado) en lugar de una referencia viva.

### Limitación conocida de la API

DummyJSON no combina búsqueda por texto y filtro por categoría en un mismo endpoint. Cuando ambos están activos, se prioriza la búsqueda (`/products/search`) y la categoría se filtra en cliente sobre la página actual; en ese caso el conteo total puede no coincidir con los resultados visibles. Es una restricción de la API, no del cliente.

---

## Librerías y justificación

| Librería           | Uso                                 | Por qué                                                                                                                             |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| TanStack Query     | Estado de servidor                  | Caché, reintentos, invalidación y `useInfiniteQuery` para el infinite scroll, con devtools que hacen visible el manejo de caché.    |
| Zustand            | Estado de cliente (carrito, toasts) | Mínimo boilerplate, middleware `persist` para LocalStorage y un modelo de estado que escala a multi-tienda sin reescribir la vista. |
| React Router       | Navegación                          | Rutas dinámicas (`/product/:id`) y `useSearchParams` para los filtros en la URL.                                                    |
| Tailwind CSS v4    | Estilos                             | Diseño mobile-first con tokens en `@theme` (config CSS-first).                                                                      |
| DOMPurify          | Seguridad                           | Sanitización de HTML para prevenir XSS en la descripción del producto.                                                              |
| Vitest + RTL + MSW | Pruebas                             | Integración nativa con Vite; MSW intercepta la red sin acoplar el test a la implementación del fetch.                               |

### Optimización de rendimiento

- `React.memo` en `ProductCard`: se renderiza N veces en el grid; evita el re-render masivo al cargar una página nueva.
- `useCallback` en `handleAddToCart`: mantiene estable la prop pasada a las cards para que `React.memo` sea efectivo.
- `useMemo` en `useCart`: deriva los totales solo cuando cambian los items.

---

## Instalación y ejecución

Requiere Node 18+ y pnpm.

```bash
pnpm install      # instalar dependencias
pnpm dev          # entorno local en http://localhost:5173
pnpm build        # build de producción en /dist
pnpm preview      # previsualizar el build
```

## Pruebas

```bash
pnpm test         # modo watch
pnpm test:run     # ejecución única
pnpm test:coverage # con reporte de cobertura
```

Incluye un test unitario de la lógica de totales (`calculateTotals`) y un test de integración del flujo: agregar al carrito → total actualizado.

---

## Preguntas de profundidad técnica

### 1. Hidratación / caché en un entorno SSR (Next.js)

En el servidor se prefetchea la query con `queryClient.prefetchQuery`, se serializa el estado con `dehydrate(queryClient)` y en el cliente se envuelve el árbol con `<HydrationBoundary state={dehydratedState}>`. El `queryKey` actúa como contrato entre lo prefetcheado en el servidor y lo que el hook busca en el cliente: si coinciden, no hay refetch al hidratar. El fetch inicial del catálogo se movería a Server Components, dejando como cliente solo lo interactivo (filtros, carrito).

### 2. Sanitización contra XSS

La descripción nunca se inyecta cruda. Se sanitiza con DOMPurify (`lib/sanitize.ts`) usando una _allowlist_ mínima de tags y atributos inocuos antes de pasarla a `dangerouslySetInnerHTML`. Si el contenido no requiere HTML, se renderiza como texto plano y el riesgo desaparece. Es defensa en profundidad: no se asume que la API ya saneó.

### 3. Escalabilidad a múltiples tiendas

El estado del carrito pasaría de `items: CartItem[]` a `carts: Record<StoreId, CartItem[]>`, con las acciones recibiendo un `storeId` y `useCart(storeId)` devolviendo el slice de esa tienda. Para aislamiento total entre tiendas, la alternativa es un _store factory_ (`createCartStore(storeId)`). En ambos casos la vista no cambia: consume el hook y los componentes permanecen iguales.
