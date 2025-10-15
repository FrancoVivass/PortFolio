import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';

/**
 * Componente de página 404 - No encontrada
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center">
      <div class="container-custom text-center">
        <!-- Animación 404 -->
        <div class="mb-8 animate-float">
          <h1 class="text-9xl md:text-[12rem] font-bold text-gradient leading-none">
            404
          </h1>
        </div>

        <!-- Mensaje -->
        <div class="space-y-4 mb-8 animate-fade-in" style="animation-delay: 0.2s;">
          <h2 class="text-3xl md:text-4xl font-bold">
            Página No Encontrada
          </h2>
          <p class="text-xl text-text-secondary dark:text-dark-text max-w-2xl mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>

        <!-- Ilustración decorativa -->
        <div class="mb-12 animate-scale-in" style="animation-delay: 0.4s;">
          <svg class="w-64 h-64 mx-auto text-accent-cyan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>

        <!-- Botones de navegación -->
        <div class="flex flex-wrap justify-center gap-4 animate-fade-in" style="animation-delay: 0.6s;">
          <app-button variant="primary" size="lg" routerLink="/home">
            Volver al Inicio
          </app-button>
          
          <app-button variant="outline" size="lg" routerLink="/projects">
            Ver Proyectos
          </app-button>
        </div>

        <!-- Enlaces útiles -->
        <div class="mt-12 animate-fade-in" style="animation-delay: 0.8s;">
          <p class="text-text-secondary dark:text-dark-text mb-4">O visita una de estas páginas:</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a routerLink="/about" class="text-accent-cyan hover:underline">Sobre Mí</a>
            <span class="text-text-secondary dark:text-dark-text">•</span>
            <a routerLink="/experience" class="text-accent-cyan hover:underline">Experiencia</a>
            <span class="text-text-secondary dark:text-dark-text">•</span>
            <a routerLink="/blog" class="text-accent-cyan hover:underline">Blog</a>
            <span class="text-text-secondary dark:text-dark-text">•</span>
            <a routerLink="/contact" class="text-accent-cyan hover:underline">Contacto</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFoundComponent {}

