import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // En producción: enviar a Sentry/logging.
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="grid min-h-screen place-items-center px-5">
            <div className="rounded-card bg-surface p-12 text-center ring-1 ring-black/5">
              <p className="text-lg font-bold">Algo salió mal</p>
              <p className="mt-1 text-sm text-subtle">
                Ocurrió un error inesperado. Recarga para continuar.
              </p>
              <button
                type="button"
                onClick={() => window.location.assign("/")}
                className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
