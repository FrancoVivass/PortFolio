import { Injectable, signal, effect } from '@angular/core';

/**
 * Servicio para gestionar el tema (dark/light mode)
 * Utiliza signals de Angular y localStorage para persistencia
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal reactivo para el tema actual
  private darkModeSignal = signal<boolean>(false);
  
  // Exponer el signal como readonly
  public isDarkMode = this.darkModeSignal.asReadonly();

  constructor() {
    // Effect que se ejecuta cuando cambia el tema
    effect(() => {
      const isDark = this.darkModeSignal();
      this.applyTheme(isDark);
      this.saveThemePreference(isDark);
    });
  }

  /**
   * Inicializa el tema desde localStorage o preferencias del sistema
   */
  initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme !== null) {
      // Usar tema guardado
      this.darkModeSignal.set(savedTheme === 'dark');
    } else {
      // Usar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkModeSignal.set(prefersDark);
    }
  }

  /**
   * Alterna entre modo oscuro y claro
   */
  toggleTheme(): void {
    this.darkModeSignal.update(isDark => !isDark);
  }

  /**
   * Establece el tema directamente
   */
  setTheme(isDark: boolean): void {
    this.darkModeSignal.set(isDark);
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    }
  }

  /**
   * Guarda la preferencia de tema en localStorage
   */
  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}

