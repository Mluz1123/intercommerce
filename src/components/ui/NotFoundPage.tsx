import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <p className="text-5xl font-extrabold tracking-tight">404</p>
        <p className="mt-2 text-sm text-subtle">Esta página no existe.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
