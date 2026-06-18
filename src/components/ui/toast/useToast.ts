import { useToastStore } from "./toastStore";

export function useToast() {
  return useToastStore((s) => s.show);
}
