import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de botón reutilizable con diferentes variantes
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (routerLink) {
      <a 
        [routerLink]="routerLink"
        [class]="buttonClasses"
        [attr.aria-label]="ariaLabel"
      >
        <ng-content></ng-content>
      </a>
    } @else {
      <button
        [type]="type"
        [disabled]="disabled"
        [class]="buttonClasses"
        [attr.aria-label]="ariaLabel"
        (click)="handleClick($event)"
      >
        @if (loading) {
          <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
        }
        <ng-content></ng-content>
      </button>
    }
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() routerLink?: string | any[];
  @Input() ariaLabel?: string;
  
  @Output() clicked = new EventEmitter<Event>();

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-cyan disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:shadow-lg hover:shadow-accent-cyan/50 hover:scale-105',
      secondary: 'bg-dark-surface dark:bg-dark-surface text-dark-text dark:text-dark-text border-2 border-accent-cyan hover:bg-accent-cyan hover:text-white',
      outline: 'border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-white',
      ghost: 'text-accent-cyan hover:bg-accent-cyan/10'
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    
    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}

