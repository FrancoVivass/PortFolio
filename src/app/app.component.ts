import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ThemeService } from './core/services/theme.service';

/**
 * Componente raíz de la aplicación
 * Gestiona el layout principal con navbar, router outlet y footer
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoaderComponent
  ],
  template: `
    <div class="app-container min-h-screen flex flex-col">
      <!-- Loader global -->
      <app-loader />
      
      <!-- Navbar sticky -->
      <app-navbar />
      
      <!-- Contenido principal con animaciones de ruta -->
      <main class="flex-grow">
        <router-outlet />
      </main>
      
      <!-- Footer -->
      <app-footer />
      
      <!-- Background particles/effects -->
      <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute top-0 -left-4 w-72 h-72 bg-accent-violet/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div class="absolute top-0 -right-4 w-72 h-72 bg-accent-cyan/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-accent-electric/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 4s;"></div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      position: relative;
      background: var(--bg-primary);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Portfolio Angular';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Inicializar tema desde localStorage
    this.themeService.initTheme();
  }
}

