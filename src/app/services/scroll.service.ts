import { Injectable, NgZone } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// IMPORTANT: Requires `lenis` package (not @studio-freight/lenis)
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private lenis?: any;
  private initialized = false;

  constructor(private zone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ anticipatePin: 1 });
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.1,
        lerp: 0.1,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
      });

      // Optional: keep ScrollTrigger in sync with Lenis
      const raf = (time: number) => {
        this.lenis?.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // Sync ScrollTrigger on Lenis scroll
      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Respect reduced motion
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        this.lenis?.stop();
      }
    });
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}
