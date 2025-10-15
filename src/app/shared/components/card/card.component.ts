import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de tarjeta reutilizable con efecto glass y hover 3D
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="cardClasses"
      [class.hover-3d]="hover3d"
    >
      <!-- Header opcional -->
      @if (hasHeader) {
        <div class="card-header p-6 border-b border-white/10">
          <ng-content select="[header]"></ng-content>
        </div>
      }
      
      <!-- Contenido principal -->
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>
      
      <!-- Footer opcional -->
      @if (hasFooter) {
        <div class="card-footer p-6 border-t border-white/10">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'glass' | 'gradient' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() hover3d: boolean = true;
  @Input() hasHeader: boolean = false;
  @Input() hasFooter: boolean = false;

  get cardClasses(): string {
    const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
    
    const variantClasses = {
      default: 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-lg hover:shadow-2xl',
      glass: 'glass-effect shadow-xl hover:shadow-2xl',
      gradient: 'bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 border border-white/10 shadow-xl hover:shadow-2xl'
    };
    
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get contentClasses(): string {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };
    
    return paddingClasses[this.padding];
  }
}

