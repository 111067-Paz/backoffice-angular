import { Injectable, signal, effect } from '@angular/core';

export type ArcadeTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'tup-arcade-theme';
  
  readonly currentTheme = signal<ArcadeTheme>(this.getInitialTheme());

  constructor() {
    // Sincroniza inmediatamente el atributo en el DOM cuando cambia el signal
    effect(() => {
      const theme = this.currentTheme();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        try {
          localStorage.setItem(this.STORAGE_KEY, theme);
        } catch {
          // localStorage no disponible
        }
      }
    });
  }

  private getInitialTheme(): ArcadeTheme {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY) as ArcadeTheme;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'light';
  }

  toggleTheme(): void {
    this.currentTheme.update(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: ArcadeTheme): void {
    this.currentTheme.set(theme);
  }
}
