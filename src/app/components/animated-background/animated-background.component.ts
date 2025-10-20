import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-bg">
      <div class="particle" *ngFor="let particle of particles" 
           [style.left.px]="particle.x" 
           [style.top.px]="particle.y"
           [style.animation-delay.s]="particle.delay"
           [style.animation-duration.s]="particle.duration">
      </div>
      <div class="mouse-follower" 
           [style.left.px]="mouseX" 
           [style.top.px]="mouseY">
        <div class="follower-glow"></div>
      </div>
    </div>
  `,
  styleUrls: ['./animated-background.component.scss']
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  particles: Array<{x: number, y: number, delay: number, duration: number, vx: number, vy: number}> = [];
  mouseX = 0;
  mouseY = 0;
  private animationId: number | null = null;
  private isMouseMoving = false;
  private mouseStopTimeout: number | null = null;

  ngOnInit() {
    this.createParticles();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.mouseStopTimeout) {
      clearTimeout(this.mouseStopTimeout);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.isMouseMoving = true;
    
    // Clear existing timeout
    if (this.mouseStopTimeout) {
      clearTimeout(this.mouseStopTimeout);
    }
    
    // Set new timeout to detect when mouse stops moving
    this.mouseStopTimeout = window.setTimeout(() => {
      this.isMouseMoving = false;
    }, 100);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseMoving = false;
  }

  private createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.5 - Math.random() * 0.5
      });
    }
  }

  private startAnimation() {
    const animate = () => {
      this.particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Mouse interaction
        if (this.isMouseMoving) {
          const dx = this.mouseX - particle.x;
          const dy = this.mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx -= (dx / distance) * force * 0.02;
            particle.vy -= (dy / distance) * force * 0.02;
          }
        }
        
        // Add some friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Reset particles that go off screen
        if (particle.y < -50) {
          particle.y = window.innerHeight + 50;
          particle.x = Math.random() * window.innerWidth;
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = -0.5 - Math.random() * 0.5;
        }
        
        // Keep particles in bounds horizontally
        if (particle.x < -50) {
          particle.x = window.innerWidth + 50;
        } else if (particle.x > window.innerWidth + 50) {
          particle.x = -50;
        }
      });
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }
}