import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Componente de loader global
 * Se muestra durante las transiciones de ruta
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isLoading()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
        <div class="relative">
          <!-- Spinner animado -->
          <div class="w-16 h-16 border-4 border-accent-violet/30 border-t-accent-cyan rounded-full animate-spin"></div>
          
          <!-- Efecto de glow -->
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent-violet rounded-full animate-spin glow-effect"></div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoaderComponent {
  public isLoading = signal<boolean>(false);

  constructor(private router: Router) {
    // Escuchar eventos de navegación
    this.router.events.pipe(
      filter(event => 
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else {
        // Pequeño delay para transición suave
        setTimeout(() => this.isLoading.set(false), 300);
      }
    });
  }
}

