import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

/**
 * Servicio para gestionar animaciones GSAP con ScrollTrigger
 * Estilo Apple/ASUS ROG scrollytelling
 */
@Injectable({
  providedIn: 'root'
})
export class GsapService {
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isInitialized = true;
      this.initGSAP();
    }
  }

  private async initGSAP(): Promise<void> {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
  }

  /**
   * Animación de fade in con scroll
   */
  async fadeInOnScroll(element: string | Element, options?: any): Promise<void> {
    if (!this.isInitialized) return;

    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
        ...options
      }
    );
  }

  /**
   * Parallax effect
   */
  async parallax(element: string | Element, speed: number = 0.5): Promise<void> {
    if (!this.isInitialized) return;

    await import('gsap/ScrollTrigger');

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /**
   * Rotación 3D con scroll (tipo Apple)
   */
  async rotate3DOnScroll(element: string | Element): Promise<void> {
    if (!this.isInitialized) return;

    await import('gsap/ScrollTrigger');

    gsap.to(element, {
      rotateY: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });
  }

  /**
   * Scale/Zoom con scroll
   */
  async zoomOnScroll(element: string | Element, fromScale: number = 0.8, toScale: number = 1): Promise<void> {
    if (!this.isInitialized) return;

    await import('gsap/ScrollTrigger');

    gsap.fromTo(element,
      { scale: fromScale },
      {
        scale: toScale,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        }
      }
    );
  }

  /**
   * Pin section (mantener fija mientras otras se mueven)
   */
  async pinSection(element: string | Element, duration: number = 1): Promise<void> {
    if (!this.isInitialized) return;

    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: `+=${duration * 100}%`,
      pin: true,
      pinSpacing: true
    });
  }

  /**
   * Horizontal scroll gallery
   */
  async horizontalScroll(container: string | Element, items: string | Element): Promise<void> {
    if (!this.isInitialized) return;

    await import('gsap/ScrollTrigger');

    const itemsElement = typeof items === 'string' ? document.querySelector(items) : items;
    if (!itemsElement) return;

    gsap.to(items, {
      x: () => -(itemsElement.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${itemsElement.scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });
  }

  /**
   * Text reveal con clip-path
   */
  async textReveal(element: string | Element): Promise<void> {
    if (!this.isInitialized) return;

    await import('gsap/ScrollTrigger');

    gsap.fromTo(element,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  /**
   * Cambio de fondo por sección
   */
  async backgroundChange(sections: string | Element, colors: string[]): Promise<void> {
    if (!this.isInitialized) return;

    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    const sectionElements = typeof sections === 'string' 
      ? document.querySelectorAll(sections) 
      : [sections];

    sectionElements.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => this.changeBg(colors[index]),
        onEnterBack: () => this.changeBg(colors[index])
      });
    });
  }

  private changeBg(color: string): void {
    gsap.to('body', { backgroundColor: color, duration: 0.8 });
  }

  /**
   * Refresh ScrollTrigger
   */
  async refresh(): Promise<void> {
    if (!this.isInitialized) return;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.refresh();
  }

  /**
   * Kill all ScrollTriggers
   */
  async killAll(): Promise<void> {
    if (!this.isInitialized) return;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

