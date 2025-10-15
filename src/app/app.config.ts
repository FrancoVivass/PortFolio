import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

/**
 * Configuración principal de la aplicación
 * Incluye routing, animaciones, HTTP client y Lottie
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Router con transiciones de vista y scroll management
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: false,
        onViewTransitionCreated: ({ transition }) => {
          // Log de transiciones en desarrollo
          if (!transition) return;
          console.log('View transition created');
        }
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    
    // Animaciones de Angular
    provideAnimations(),
    
    // HTTP Client
    provideHttpClient(),
    
    // Lottie animations
    provideLottieOptions({
      player: () => player,
    }),
  ]
};

