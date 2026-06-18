import { useToastStore } from "./toastStore";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          onClick={() => dismiss(t.id)}
          className={`pointer-events-auto cursor-pointer rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] animate-[ic-toast-in_.25s_ease] ${
            t.variant === "error" ? "bg-[#e55]" : "bg-ink"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
