import { Component, ElementRef, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente que revela contenido al hacer scroll
 */
@Component({
  selector: 'app-scroll-reveal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="scroll-reveal-wrapper"
      [class.revealed]="isRevealed"
      [attr.data-animation]="animation"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .scroll-reveal-wrapper {
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .scroll-reveal-wrapper.revealed {
      opacity: 1;
    }

    /* Animación desde abajo */
    .scroll-reveal-wrapper[data-animation="slide-up"] {
      transform: translateY(50px);
    }

    .scroll-reveal-wrapper[data-animation="slide-up"].revealed {
      transform: translateY(0);
    }

    /* Animación desde la izquierda */
    .scroll-reveal-wrapper[data-animation="slide-left"] {
      transform: translateX(-50px);
    }

    .scroll-reveal-wrapper[data-animation="slide-left"].revealed {
      transform: translateX(0);
    }

    /* Animación desde la derecha */
    .scroll-reveal-wrapper[data-animation="slide-right"] {
      transform: translateX(50px);
    }

    .scroll-reveal-wrapper[data-animation="slide-right"].revealed {
      transform: translateX(0);
    }

    /* Animación de escala */
    .scroll-reveal-wrapper[data-animation="scale"] {
      transform: scale(0.8);
    }

    .scroll-reveal-wrapper[data-animation="scale"].revealed {
      transform: scale(1);
    }

    /* Animación de rotación */
    .scroll-reveal-wrapper[data-animation="rotate"] {
      transform: rotate(-10deg) scale(0.8);
    }

    .scroll-reveal-wrapper[data-animation="rotate"].revealed {
      transform: rotate(0) scale(1);
    }

    /* Animación de flip */
    .scroll-reveal-wrapper[data-animation="flip"] {
      transform: perspective(1000px) rotateY(90deg);
    }

    .scroll-reveal-wrapper[data-animation="flip"].revealed {
      transform: perspective(1000px) rotateY(0);
    }

    /* Animación de bounce */
    .scroll-reveal-wrapper[data-animation="bounce"].revealed {
      animation: bounceIn 0.8s;
    }

    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
  `]
})
export class ScrollRevealComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() animation: 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'flip' | 'bounce' = 'slide-up';
  @Input() delay: number = 0;
  
  public isRevealed = false;
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.delay > 0) {
      this.el.nativeElement.querySelector('.scroll-reveal-wrapper').style.transitionDelay = `${this.delay}ms`;
    }
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isRevealed) {
            this.isRevealed = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const wrapper = this.el.nativeElement.querySelector('.scroll-reveal-wrapper');
    if (wrapper) {
      this.observer.observe(wrapper);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

