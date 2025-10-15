import { Component, OnInit, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, PersonalInfo } from '@core/services/data.service';
import { GsapService } from '@core/services/gsap.service';
import { ScrollRevealComponent } from '@shared/components/scroll-reveal/scroll-reveal.component';
import { Scroll3dBackgroundComponent } from '@shared/components/scroll-3d-background/scroll-3d-background.component';
import { FordCinematicComponent } from '@shared/components/ford-cinematic/ford-cinematic.component';

/**
 * Componente Home con ScrollTelling tipo Apple/ASUS ROG
 * Storytelling cinematográfico con GSAP ScrollTrigger
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealComponent, Scroll3dBackgroundComponent, FordCinematicComponent],
  template: `
    <!-- Gamepads 3D ENORMES en el FONDO del Hero -->
    <app-scroll-3d-background 
      modelPath="assets/models/gamepads.glb"
      sectionId="hero"
      [initialRotation]="{ x: 0.3, y: 0.5, z: 0 }"
      [scaleSize]="10"
    />
    
    <!-- Hero Section - Full Screen -->
    <section id="hero" class="hero-section">
      <div class="hero-content hero-content-front">
        <div class="hero-badge">Bienvenido</div>
        <h1 class="hero-title">{{ personalInfo()?.name || 'Franco Argelio Vivas' }}</h1>
        <p class="hero-subtitle">{{ displayedTitle }}</p>
        <div class="hero-scroll-indicator">
          <span>Desliza para descubrir</span>
          <svg class="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
      
      <!-- Animated gradient orb -->
      <div class="hero-orb"></div>
    </section>

    <!-- Story Section 1: ¿Quién soy? -->
    <section id="story-intro" class="story-section">
      <div class="story-container story-container-front">
        <div class="story-content">
          <span class="story-label">Desarrollador</span>
          <h2 class="story-title">Creando experiencias digitales excepcionales</h2>
          <p class="story-text">
            {{ personalInfo()?.bio }}
          </p>
        </div>
        
        <div class="story-visual">
          <div class="floating-card card-1">
            <div class="card-content-inner">
              <div class="card-icon">💻</div>
              <h3>Frontend</h3>
              <p>Angular, TypeScript</p>
            </div>
          </div>
          <div class="floating-card card-2">
            <div class="card-content-inner">
              <div class="card-icon">⚡</div>
              <h3>Backend</h3>
              <p>Node.js, Python</p>
            </div>
          </div>
          <div class="floating-card card-3">
            <div class="card-content-inner">
              <div class="card-icon">🗄️</div>
              <h3>Databases</h3>
              <p>MySQL, SQL Server</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Teclado 3D GIGANTE en el FONDO (ScrollActivity) -->
    <section id="setup-3d" class="setup-section">
      <app-scroll-3d-background 
        modelPath="assets/models/teclado.glb"
        sectionId="setup-3d"
        [initialRotation]="{ x: -0.3, y: 0, z: 0 }"
        [scaleSize]="8"
      />
      <div class="setup-content setup-content-front">
        <h2 class="setup-title">Mi Setup de Desarrollo</h2>
        <p class="setup-desc">Herramientas profesionales para crear soluciones excepcionales</p>
      </div>
    </section>

    <!-- Projects Section - Grid Normal (sin scroll horizontal por ahora) -->
    <section id="projects-section" class="projects-section">
      <div class="projects-container">
        <h2 class="projects-title">Proyectos Destacados</h2>
        <p class="projects-subtitle">Algunos de mis mejores trabajos</p>
        
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <div class="project-card" [attr.data-index]="$index">
              <div class="project-image">
                <div class="project-placeholder">
                  <span class="project-number">#{{ $index + 1 }}</span>
                </div>
                @if (project.featured) {
                  <div class="project-badge">Destacado</div>
                }
              </div>
              <div class="project-content">
                <h3 class="project-title-card">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  @for (tag of project.tags.slice(0, 3); track tag) {
                    <span class="tech-tag">{{ tag }}</span>
                  }
                </div>
                <div class="project-links">
                  @if (project.demoUrl) {
                    <a [href]="project.demoUrl" target="_blank" class="project-link-btn">
                      Ver Demo →
                    </a>
                  }
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" class="project-link-btn secondary">
                      GitHub →
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        
        <div class="projects-cta">
          <a routerLink="/projects" class="view-all-btn">Ver Todos los Proyectos</a>
        </div>
      </div>
    </section>

    <!-- Tech Stack 3D -->
    <section id="tech-stack" class="tech-section">
      <div class="tech-container">
        <h2 class="tech-title">Stack Tecnológico</h2>
        <div class="tech-grid">
          @for (tech of techStack; track tech.name) {
            <div class="tech-item" [attr.data-index]="$index">
              <div class="tech-card">
                <div class="tech-icon">{{ tech.icon }}</div>
                <h3 class="tech-name">{{ tech.name }}</h3>
                <div class="tech-bar">
                  <div class="tech-progress" [style.width.%]="tech.level"></div>
                </div>
                <span class="tech-level">{{ tech.level }}%</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Parallax Section -->
    <section id="parallax-section" class="parallax-container">
      <div class="parallax-layer layer-1"></div>
      <div class="parallax-layer layer-2"></div>
      <div class="parallax-layer layer-3"></div>
      
      <div class="parallax-content">
        <h2 class="parallax-title">{{ personalInfo()?.location }}</h2>
        <p class="parallax-subtitle">Disponible para proyectos remotos</p>
      </div>
    </section>

    <!-- Ford Shelby Cinematográfico (MÁS GRANDE) -->
    <app-ford-cinematic />

    <!-- CTA Final -->
    <section id="cta-section" class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">¿Listo para trabajar juntos?</h2>
        <p class="cta-text">Construyamos algo increíble</p>
        <div class="cta-buttons">
          <a routerLink="/projects" class="cta-btn cta-primary">
            Ver Proyectos
          </a>
          <a routerLink="/contact" class="cta-btn cta-secondary">
            Contactar
          </a>
        </div>
        
        <!-- Social links -->
        <div class="cta-social">
          @if (personalInfo()?.social?.github) {
            <a [href]="personalInfo()!.social.github!" target="_blank" class="social-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          }
          @if (personalInfo()?.social?.linkedin) {
            <a [href]="personalInfo()!.social.linkedin!" target="_blank" class="social-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          }
          @if (personalInfo()?.social?.twitter) {
            <a [href]="personalInfo()!.social.twitter!" target="_blank" class="social-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          }
          @if (personalInfo()?.social?.dribbble) {
            <a [href]="personalInfo()!.social.dribbble!" target="_blank" class="social-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      overflow-x: hidden;
    }

    /* ============================================
       HERO SECTION - Estilo Apple/ASUS ROG
       ============================================ */
    .hero-section {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: radial-gradient(ellipse at bottom, #0a0e27 0%, #000000 100%);
    }

    .hero-content {
      text-align: center;
      z-index: 2;
      padding: 0 20px;
    }

    .hero-content-front {
      position: relative;
      z-index: 10;
    }

    .hero-badge {
      display: inline-block;
      padding: 8px 20px;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 50px;
      color: #8b5cf6;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 30px;
      animation: fadeSlideDown 1s ease-out;
    }

    .hero-title {
      font-size: clamp(48px, 8vw, 96px);
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      animation: fadeSlideUp 1s ease-out 0.2s both, gradientShift 8s ease infinite;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: clamp(18px, 3vw, 32px);
      color: rgba(226, 232, 240, 0.8);
      font-weight: 300;
      margin-bottom: 40px;
      animation: fadeIn 1.5s ease-out 0.4s both;
    }

    .hero-scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: rgba(226, 232, 240, 0.6);
      font-size: 14px;
      margin-top: 60px;
      animation: fadeIn 2s ease-out 0.6s both;
    }

    .scroll-arrow {
      width: 24px;
      height: 24px;
      animation: bounceArrow 2s ease-in-out infinite;
    }

    .hero-orb {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
      filter: blur(80px);
      animation: orbPulse 8s ease-in-out infinite;
      pointer-events: none;
    }

    /* ============================================
       STORY SECTION
       ============================================ */
    .story-section {
      min-height: 150vh;
      display: flex;
      align-items: center;
      padding: 200px 0;
      background: linear-gradient(to bottom, #000000 0%, #0a0e27 100%);
    }

    .story-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .story-container-front {
      position: relative;
      z-index: 15;
    }

    .story-content {
      position: relative;
      z-index: 20;
    }

    @media (max-width: 768px) {
      .story-container {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .story-visual {
        height: 400px !important;
      }
    }

    .story-label {
      display: inline-block;
      color: #06b6d4;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
      position: relative;
      z-index: 20;
    }

    .story-title {
      font-size: clamp(32px, 5vw, 56px);
      font-weight: 700;
      position: relative;
      z-index: 20;
      color: #e2e8f0;
      margin-bottom: 30px;
      line-height: 1.2;
    }

    .story-text {
      font-size: 18px;
      line-height: 1.8;
      color: rgba(226, 232, 240, 0.7);
      position: relative;
      z-index: 20;
    }

    .story-visual {
      position: relative;
      height: 500px;
      z-index: 20;
    }

    .floating-card {
      position: absolute;
      width: 180px;
      height: 220px;
      background: rgba(20, 27, 52, 0.8);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(10px);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 20;
    }

    .floating-card:hover {
      transform: translateY(-10px) scale(1.05);
      border-color: rgba(139, 92, 246, 0.6);
      box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
    }

    .card-1 {
      top: 50px;
      left: 20px;
      animation: floatCard 6s ease-in-out infinite;
    }

    .card-2 {
      top: 150px;
      right: 30px;
      animation: floatCard 6s ease-in-out infinite 2s;
    }

    .card-3 {
      bottom: 80px;
      left: 80px;
      animation: floatCard 6s ease-in-out infinite 4s;
    }

    .card-content-inner {
      text-align: center;
    }

    .card-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .card-content-inner h3 {
      font-size: 18px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 8px;
    }

    .card-content-inner p {
      font-size: 12px;
      color: rgba(226, 232, 240, 0.6);
    }

    /* ============================================
       SETUP 3D SECTION
       ============================================ */
    .setup-section {
      position: relative;
      min-height: 150vh;
      background: linear-gradient(to bottom, #0a0e27 0%, #000000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .setup-content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 40px;
      pointer-events: none;
    }

    .setup-content-front {
      z-index: 15 !important;
    }

    .setup-title {
      font-size: 48px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
      position: relative;
      z-index: 20;
    }

    .setup-desc {
      font-size: 20px;
      color: rgba(226, 232, 240, 0.7);
      position: relative;
      z-index: 20;
    }

    /* ============================================
       PROJECTS SECTION
       ============================================ */
    .projects-section {
      min-height: 200vh;
      padding: 250px 0;
      background: linear-gradient(to bottom, #000000 0%, #0a0e27 100%);
    }

    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .projects-title {
      font-size: 56px;
      font-weight: 700;
      text-align: center;
      color: #e2e8f0;
      margin-bottom: 16px;
    }

    .projects-subtitle {
      font-size: 20px;
      text-align: center;
      color: rgba(226, 232, 240, 0.6);
      margin-bottom: 80px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 40px;
      margin-bottom: 60px;
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      background: rgba(20, 27, 52, 0.6);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 20px;
      overflow: hidden;
      backdrop-filter: blur(10px);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
      transform: translateY(50px);
    }

    .project-card:hover {
      transform: translateY(-15px) rotateY(5deg) rotateX(5deg);
      border-color: rgba(139, 92, 246, 0.8);
      box-shadow: 0 30px 80px rgba(139, 92, 246, 0.4);
    }

    .project-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.5s;
    }

    .project-card:hover .project-placeholder {
      transform: scale(1.1);
    }

    .project-number {
      font-size: 96px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.15);
    }

    .project-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 8px 16px;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      color: #000;
      box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
    }

    .project-content {
      padding: 32px;
    }

    .project-title-card {
      font-size: 28px;
      font-weight: 700;
      color: #e2e8f0;
      margin-bottom: 16px;
    }

    .project-description {
      font-size: 16px;
      color: rgba(226, 232, 240, 0.7);
      margin-bottom: 20px;
      line-height: 1.7;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 24px;
    }

    .tech-tag {
      padding: 6px 16px;
      background: rgba(139, 92, 246, 0.15);
      border: 1px solid rgba(139, 92, 246, 0.4);
      border-radius: 20px;
      font-size: 13px;
      color: #8b5cf6;
      font-weight: 600;
    }

    .project-links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .project-link-btn {
      padding: 10px 24px;
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
    }

    .project-link-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
    }

    .project-link-btn.secondary {
      background: transparent;
      border: 2px solid #06b6d4;
      color: #06b6d4;
    }

    .project-link-btn.secondary:hover {
      background: #06b6d4;
      color: #000;
    }

    .projects-cta {
      text-align: center;
      margin-top: 60px;
    }

    .view-all-btn {
      display: inline-block;
      padding: 18px 48px;
      background: transparent;
      border: 2px solid rgba(139, 92, 246, 0.5);
      color: #8b5cf6;
      text-decoration: none;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 600;
      transition: all 0.4s;
    }

    .view-all-btn:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(139, 92, 246, 0.5);
    }

    /* ============================================
       TECH STACK SECTION
       ============================================ */
    .tech-section {
      min-height: 180vh;
      padding: 250px 0;
      background: linear-gradient(to bottom, #0a0e27 0%, #141B34 100%);
    }

    .tech-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .tech-title {
      font-size: 56px;
      font-weight: 700;
      text-align: center;
      color: #e2e8f0;
      margin-bottom: 80px;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .tech-item {
      opacity: 0;
      transform: translateY(50px);
    }

    .tech-card {
      background: rgba(20, 27, 52, 0.6);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 16px;
      padding: 32px;
      text-align: center;
      transition: all 0.4s;
      backdrop-filter: blur(10px);
    }

    .tech-card:hover {
      transform: translateY(-10px) rotateY(5deg);
      border-color: rgba(139, 92, 246, 0.6);
      box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4);
    }

    .tech-icon {
      font-size: 64px;
      margin-bottom: 20px;
      filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
    }

    .tech-name {
      font-size: 20px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 16px;
    }

    .tech-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 12px;
    }

    .tech-progress {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #06b6d4 100%);
      border-radius: 10px;
      transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .tech-level {
      font-size: 14px;
      color: #06b6d4;
      font-weight: 700;
    }

    /* ============================================
       PARALLAX SECTION
       ============================================ */
    .parallax-container {
      position: relative;
      height: 150vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .parallax-layer {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .layer-1 {
      background: radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
    }

    .layer-2 {
      background: radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%);
    }

    .layer-3 {
      background: radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    }

    .parallax-content {
      text-align: center;
      z-index: 10;
      padding: 0 20px;
    }

    .parallax-title {
      font-size: 72px;
      font-weight: 700;
      color: #e2e8f0;
      margin-bottom: 20px;
      text-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
    }

    .parallax-subtitle {
      font-size: 24px;
      color: rgba(226, 232, 240, 0.7);
    }

    /* ============================================
       CTA SECTION
       ============================================ */
    .cta-section {
      min-height: 120vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(ellipse at top, #0a0e27 0%, #000000 100%);
      position: relative;
      overflow: hidden;
      padding: 150px 0;
    }

    .cta-container {
      text-align: center;
      z-index: 2;
      padding: 0 20px;
    }

    .cta-title {
      font-size: clamp(40px, 6vw, 72px);
      font-weight: 800;
      color: #e2e8f0;
      margin-bottom: 20px;
    }

    .cta-text {
      font-size: 24px;
      color: rgba(226, 232, 240, 0.7);
      margin-bottom: 50px;
    }

    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 60px;
    }

    .cta-btn {
      padding: 18px 48px;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-block;
    }

    .cta-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
    }

    .cta-primary:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 20px 60px rgba(139, 92, 246, 0.6);
    }

    .cta-secondary {
      background: transparent;
      color: #06b6d4;
      border: 2px solid #06b6d4;
    }

    .cta-secondary:hover {
      background: #06b6d4;
      color: #000;
      transform: translateY(-5px);
    }

    .cta-social {
      display: flex;
      gap: 20px;
      justify-content: center;
    }

    .social-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      color: #e2e8f0;
    }

    .social-icon svg {
      width: 24px;
      height: 24px;
    }

    .social-icon:hover {
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      border-color: transparent;
      transform: translateY(-5px) rotate(5deg);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
    }

    /* ============================================
       ANIMATIONS
       ============================================ */
    @keyframes fadeSlideDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes bounceArrow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(10px); }
    }

    @keyframes orbPulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.2); opacity: 0.5; }
    }

    @keyframes floatCard {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  public personalInfo = signal<PersonalInfo | null>(null);
  public displayedTitle = '';
  public projects = signal<any[]>([]);
  
  public techStack = [
    { name: 'Angular', icon: '🅰️', level: 80 },
    { name: 'TypeScript', icon: '📘', level: 70 },
    { name: 'HTML/CSS', icon: '🌐', level: 100 },
    { name: 'Node.js', icon: '🟢', level: 70 },
    { name: 'MySQL', icon: '🐬', level: 80 },
    { name: 'Git', icon: '📌', level: 100 }
  ];

  constructor(
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.dataService.getPersonalInfo().subscribe(info => {
      this.personalInfo.set(info);
      this.fullTitle = info.title;
      setTimeout(() => this.typeTitle(), 1000);
    });

    this.dataService.getProjects().subscribe(projects => {
      this.projects.set(projects.filter(p => p.featured));
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.initScrollAnimations();
    }, 500);
  }

  private fullTitle = '';
  private typeTitle(): void {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.fullTitle.length) {
        this.displayedTitle += this.fullTitle.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  private initScrollAnimations(): void {
    // Parallax en capas
    this.gsapService.parallax('.layer-1', 0.3);
    this.gsapService.parallax('.layer-2', 0.6);
    this.gsapService.parallax('.layer-3', 0.9);

    // Floating cards con parallax
    this.gsapService.parallax('.card-1', 0.4);
    this.gsapService.parallax('.card-2', 0.6);
    this.gsapService.parallax('.card-3', 0.8);

    // Fade in de project cards
    this.gsapService.fadeInOnScroll('.project-card', { stagger: 0.2 });

    // Fade in de tech items
    this.gsapService.fadeInOnScroll('.tech-item', { stagger: 0.1 });

    // Zoom en tech section
    this.gsapService.zoomOnScroll('.tech-title', 0.8, 1);
    
    // Zoom en projects title
    this.gsapService.zoomOnScroll('.projects-title', 0.9, 1);
  }
}

