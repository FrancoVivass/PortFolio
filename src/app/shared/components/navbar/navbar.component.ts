import { Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '@core/services/theme.service';
import { ScrollService } from '@core/services/scroll.service';
import { LogoComponent } from '@shared/components/logo/logo.component';

/**
 * Componente de navegación principal
 * Navbar sticky con animaciones y theme toggle
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  template: `
    <nav 
      [class]="navClasses()"
      class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    >
      <div class="container-custom">
        <div class="flex items-center justify-between h-16 md:h-20">
          
          <!-- Logo -->
          <app-logo [size]="'small'" [showText]="false" />

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="text-accent-cyan"
                [routerLinkActiveOptions]="{exact: false}"
                class="text-sm font-medium text-dark-text dark:text-dark-text hover:text-accent-cyan transition-colors relative group"
              >
                {{ item.label }}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-300"></span>
              </a>
            }
          </div>

          <!-- Theme Toggle & Mobile Menu -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle Button -->
            <button
              (click)="toggleTheme()"
              class="p-2 rounded-lg hover:bg-accent-cyan/10 transition-colors"
              aria-label="Toggle theme"
            >
              @if (isDarkMode()) {
                <svg class="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } @else {
                <svg class="w-6 h-6 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg hover:bg-accent-cyan/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              @if (!mobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden glass-effect border-t border-white/10 animate-fade-in">
          <div class="container-custom py-4 space-y-2">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-accent-cyan/20 text-accent-cyan"
                (click)="closeMobileMenu()"
                class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent-cyan/10 transition-colors"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </div>
      }
    </nav>

    <!-- Spacer para evitar que el contenido quede debajo del navbar -->
    <div class="h-16 md:h-20"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  public mobileMenuOpen = signal<boolean>(false);
  
  public navItems = [
    { path: '/home', label: 'Inicio' },
    { path: '/about', label: 'Sobre Mí' },
    { path: '/projects', label: 'Proyectos' },
    { path: '/experience', label: 'Experiencia' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contacto' }
  ];

  public isDarkMode!: Signal<boolean>;
  public hasScrolled!: Signal<boolean>;
  public navClasses!: Signal<string>;

  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService,
    private router: Router
  ) {
    // Inicializar signals después de la inyección de dependencias
    this.isDarkMode = this.themeService.isDarkMode;
    this.hasScrolled = this.scrollService.hasScrolled;
    
    // Classes computadas para el navbar
    this.navClasses = computed(() => {
      const scrolled = this.hasScrolled();
      return scrolled 
        ? 'glass-effect shadow-lg border-b border-white/10'
        : 'bg-transparent';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}

