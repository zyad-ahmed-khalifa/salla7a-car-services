import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'salla7a-theme';

/** Resolve the initial theme: saved preference → OS preference → dark. */
function resolveInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable (private mode, SSR) — fall through */
  }
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  }
  return 'dark';
}

/**
 * Central theme store. The single source of truth for light/dark mode:
 * persists to localStorage, mirrors to the `<html>` class list (with a
 * short cross-fade animation), and survives page refreshes via the
 * inline guard script in index.html + this service on bootstrap.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(resolveInitialTheme());

  readonly isDark = (): boolean => this.theme() === 'dark';

  constructor() {
    // Apply the resolved theme on startup (covers the case where the
    // inline index.html guard did not run, e.g. in tests).
    this.apply(this.theme());
    effect(() => {
      this.apply(this.theme());
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private apply(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
    // Brief cross-fade; styles.css scopes transitions under `.theme-anim`.
    root.classList.add('theme-anim');
    window.setTimeout(() => root.classList.remove('theme-anim'), 400);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore write failures */
    }
  }
}
