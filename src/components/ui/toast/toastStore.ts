import { create } from "zustand";

export interface Toast {
  id: string;
  message: string;
  variant: "success" | "error";
}

interface ToastStore {
  toasts: Toast[];
  show: (message: string, variant?: Toast["variant"]) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastStore>()((set, get) => ({
  toasts: [],
  show: (message, variant = "success") => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    setTimeout(() => get().dismiss(id), 2800);
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
