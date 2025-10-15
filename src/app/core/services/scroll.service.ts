import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

/**
 * Servicio para gestionar eventos de scroll y animaciones relacionadas
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  // Signal para la posición actual del scroll
  public scrollPosition = signal<number>(0);
  
  // Signal para indicar si el usuario ha hecho scroll
  public hasScrolled = signal<boolean>(false);

  constructor() {
    this.initScrollListener();
  }

  /**
   * Inicializa el listener de scroll
   */
  private initScrollListener(): void {
    if (typeof window === 'undefined') return;

    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(10), // Throttle para mejorar performance
        map(() => window.scrollY)
      )
      .subscribe(position => {
        this.scrollPosition.set(position);
        this.hasScrolled.set(position > 50);
      });
  }

  /**
   * Scroll suave a una posición específica
   */
  scrollTo(position: number, behavior: ScrollBehavior = 'smooth'): void {
    window.scrollTo({
      top: position,
      behavior
    });
  }

  /**
   * Scroll suave a un elemento específico
   */
  scrollToElement(elementId: string, offset: number = 0): void {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    this.scrollTo(offsetPosition);
  }

  /**
   * Scroll al inicio de la página
   */
  scrollToTop(): void {
    this.scrollTo(0);
  }

  /**
   * Verifica si un elemento está visible en el viewport
   */
  isElementInViewport(element: HTMLElement, threshold: number = 0): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
      rect.top <= windowHeight - threshold &&
      rect.bottom >= threshold
    );
  }

  /**
   * Calcula el progreso de scroll de la página (0-100)
   */
  getScrollProgress(): number {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (winScroll / height) * 100;
  }

  /**
   * Habilita el scroll lock (útil para modales)
   */
  lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  /**
   * Deshabilita el scroll lock
   */
  unlockScroll(): void {
    document.body.style.overflow = '';
  }
}

