const BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, message: string, url: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    // Sin conexión, DNS, CORS, etc.
    throw new ApiError(0, "No se pudo conectar con el servidor", url);
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.status === 404
        ? "Recurso no encontrado"
        : "Error en la solicitud",
      url,
    );
  }

  return response.json() as Promise<T>;
}
