import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de carta 3D con efecto flip
 */
@Component({
  selector: 'app-card-flip-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-flip-container" (click)="toggleFlip()">
      <div class="card-flip" [class.flipped]="isFlipped()">
        <!-- Frente de la carta -->
        <div class="card-face card-front">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-icon">{{ icon }}</div>
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-subtitle">{{ subtitle }}</p>
            <div class="flip-hint">Click para voltear →</div>
          </div>
        </div>
        
        <!-- Reverso de la carta -->
        <div class="card-face card-back">
          <div class="card-glow"></div>
          <div class="card-content">
            <p class="card-description">{{ description }}</p>
            <div class="card-stats">
              <div class="stat">
                <div class="stat-value">{{ stat1Value }}</div>
                <div class="stat-label">{{ stat1Label }}</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ stat2Value }}</div>
                <div class="stat-label">{{ stat2Label }}</div>
              </div>
            </div>
            <div class="flip-hint">← Click para regresar</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-flip-container {
      perspective: 1000px;
      width: 100%;
      height: 300px;
      cursor: pointer;
    }

    .card-flip {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .card-flip.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 20px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      border: 2px solid rgba(102, 126, 234, 0.3);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .card-front {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card-back {
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
      transform: rotateY(180deg);
    }

    .card-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .card-flip-container:hover .card-glow {
      opacity: 1;
      animation: glowMove 3s infinite;
    }

    .card-content {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px;
      color: white;
      text-align: center;
      z-index: 1;
    }

    .card-icon {
      font-size: 60px;
      margin-bottom: 20px;
      animation: iconFloat 3s ease-in-out infinite;
    }

    .card-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .card-subtitle {
      font-size: 16px;
      opacity: 0.9;
    }

    .card-description {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .card-stats {
      display: flex;
      gap: 30px;
      margin-bottom: 20px;
    }

    .stat {
      flex: 1;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 12px;
      opacity: 0.8;
      text-transform: uppercase;
    }

    .flip-hint {
      margin-top: auto;
      font-size: 14px;
      opacity: 0.7;
      font-style: italic;
    }

    @keyframes iconFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes glowMove {
      0% { transform: translate(0, 0); }
      50% { transform: translate(30px, 30px); }
      100% { transform: translate(0, 0); }
    }
  `]
})
export class CardFlip3dComponent {
  @Input() icon: string = '🚀';
  @Input() title: string = 'Título';
  @Input() subtitle: string = 'Subtítulo';
  @Input() description: string = 'Descripción detallada de la carta';
  @Input() stat1Value: string = '100';
  @Input() stat1Label: string = 'Stat 1';
  @Input() stat2Value: string = '200';
  @Input() stat2Label: string = 'Stat 2';

  public isFlipped = signal<boolean>(false);

  toggleFlip(): void {
    this.isFlipped.update(value => !value);
  }
}

