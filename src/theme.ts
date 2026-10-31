import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "talentra-theme";
const listeners = new Set<() => void>();

const read = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEY, theme);
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Light/dark theme stored in localStorage and applied as a `dark` class on <html>; shared by every caller. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read);
  const toggle = useCallback(() => apply(read() === "dark" ? "light" : "dark"), []);
  return { theme, toggle };
}
