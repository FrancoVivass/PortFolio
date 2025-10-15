import { Component, AfterViewInit, OnDestroy, HostListener, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GltfLoaderService } from '@core/services/gltf-loader.service';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Ford Shelby cinematográfico MÁS GRANDE
 * Scroll horizontal + rotación + zoom + información
 */
@Component({
  selector: 'app-ford-cinematic',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="ford-section" class="ford-cinematic-section">
      <div class="ford-canvas-container">
        <div #canvasContainer class="ford-canvas"></div>
      </div>
      
      <!-- Información que aparece después del zoom -->
      <div class="ford-info" [style.opacity]="infoOpacity()">
        <div class="info-card">
          <h2 class="info-title">Potencia y Rendimiento</h2>
          <p class="info-desc">
            Como este Ford Shelby Super Snake, mi código combina velocidad, elegancia y precisión.
            Cada línea está optimizada para máximo rendimiento.
          </p>
          <div class="info-stats">
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Dedicación</span>
            </div>
            <div class="stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">Proyectos</span>
            </div>
            <div class="stat">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Disponible</span>
            </div>
          </div>
          <a routerLink="/projects" class="info-cta">
            Ver Mis Proyectos
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ford-cinematic-section {
      position: relative;
      min-height: 400vh;
      background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #000000 100%);
      overflow: hidden;
    }

    .ford-canvas-container {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      z-index: 1;
      will-change: transform;
    }

    .ford-canvas {
      width: 100%;
      height: 100%;
    }

    .ford-info {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      padding: 20px;
      pointer-events: none;
      transition: opacity 0.8s;
      max-width: 800px;
      width: 90%;
    }

    .info-card {
      background: rgba(10, 14, 39, 0.95);
      backdrop-filter: blur(30px);
      border: 2px solid rgba(139, 92, 246, 0.4);
      border-radius: 32px;
      padding: 60px 48px;
      box-shadow: 
        0 30px 80px rgba(0, 0, 0, 0.7),
        0 0 60px rgba(139, 92, 246, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      pointer-events: auto;
    }

    .info-title {
      font-size: 56px;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 24px;
      text-align: center;
      line-height: 1.2;
    }

    .info-desc {
      font-size: 22px;
      color: rgba(226, 232, 240, 0.9);
      line-height: 1.7;
      margin-bottom: 48px;
      text-align: center;
      font-weight: 300;
    }

    .info-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 48px;
    }

    .stat {
      text-align: center;
      padding: 32px 20px;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
      border-radius: 20px;
      border: 1px solid rgba(139, 92, 246, 0.3);
      transition: all 0.3s;
    }

    .stat:hover {
      transform: translateY(-5px);
      border-color: rgba(139, 92, 246, 0.6);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    }

    .stat-number {
      display: block;
      font-size: 48px;
      font-weight: 900;
      background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }

    .stat-label {
      display: block;
      font-size: 16px;
      color: rgba(226, 232, 240, 0.7);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }

    .info-cta {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 20px 40px;
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      color: white;
      font-size: 18px;
      font-weight: 700;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
      margin: 0 auto;
      display: flex;
      width: fit-content;
    }

    .info-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }

    .cta-arrow {
      width: 20px;
      height: 20px;
      transition: transform 0.3s;
    }

    .info-cta:hover .cta-arrow {
      transform: translateX(5px);
    }

    @media (max-width: 768px) {
      .ford-cinematic-section {
        min-height: 200vh;
      }

      .info-card {
        padding: 40px 24px;
      }

      .info-title {
        font-size: 36px;
      }

      .info-desc {
        font-size: 16px;
      }

      .info-stats {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .stat {
        padding: 24px 16px;
      }

      .stat-number {
        font-size: 36px;
      }

      .stat-label {
        font-size: 13px;
      }

      .info-cta {
        padding: 16px 32px;
        font-size: 16px;
      }
    }
  `]
})
export class FordCinematicComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef<HTMLDivElement>;
  
  private platformId = inject(PLATFORM_ID);
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private ford?: THREE.Group;
  private animationId?: number;
  private lights: THREE.Light[] = [];

  public infoOpacity: any;

  constructor(private gltfLoader: GltfLoaderService) {
    this.infoOpacity = () => {
      if (typeof window === 'undefined') return 0;
      const section = document.getElementById('ford-section');
      if (!section) return 0;

      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));

      // Aparece al 55% del scroll y se mantiene - MUCHO MÁS TEMPRANO
      return progress > 0.55 ? Math.min(1, (progress - 0.55) / 0.3) : 0;
    };
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.initScene();
    }, 200);
  }

  private async initScene(): Promise<void> {
    const container = this.canvasContainer.nativeElement;
    const sceneData = this.gltfLoader.createSceneForModel(container);
    
    if (!sceneData) return;

    this.scene = sceneData.scene;
    this.camera = sceneData.camera;
    this.renderer = sceneData.renderer;

    // Cámara a distancia óptima
    this.camera.position.set(0, 1.5, 7);

    try {
      this.ford = await this.gltfLoader.loadModel('assets/models/2024_ford_shelby_super_snake_s650.glb');
      
      // Escala balanceada - se ve bien
      this.gltfLoader.centerAndScaleModel(this.ford, 5);
      
      // Posición inicial: izquierda fuera de pantalla
      this.ford.position.x = -15;
      this.ford.position.y = -0.5;
      this.ford.rotation.y = Math.PI / 4;
      
      this.scene.add(this.ford);

      this.addLights();
      this.animate();

    } catch (error) {
      console.error('Error cargando Ford:', error);
    }

    window.addEventListener('resize', this.onResize.bind(this));
  }

  private addLights(): void {
    if (!this.scene) return;

    // Luz direccional MUCHO más intensa
    const dirLight = new THREE.DirectionalLight(0xffffff, 4);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    this.lights.push(dirLight);

    // Luz ambiente más fuerte
    const ambLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambLight);
    this.lights.push(ambLight);

    // Luces RGB SUPER intensas
    const rgb1 = new THREE.PointLight(0xff0000, 6, 25);
    rgb1.position.set(-5, 2, 5);
    this.scene.add(rgb1);
    this.lights.push(rgb1);

    const rgb2 = new THREE.PointLight(0x00ffff, 6, 25);
    rgb2.position.set(5, 2, 5);
    this.scene.add(rgb2);
    this.lights.push(rgb2);

    const rgb3 = new THREE.PointLight(0xffffff, 5, 20);
    rgb3.position.set(0, 4, 3);
    this.scene.add(rgb3);
    this.lights.push(rgb3);

    // Luz frontal para iluminar el auto de frente
    const frontLight = new THREE.PointLight(0xffffff, 4, 15);
    frontLight.position.set(0, 2, 8);
    this.scene.add(frontLight);
    this.lights.push(frontLight);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateFordWithScroll();
  }

  private updateFordWithScroll(): void {
    if (!this.ford || !this.camera) return;

    const section = document.getElementById('ford-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height));

    // Solo animar el auto cuando está en pantalla (sticky)
    if (rect.top <= 0 && rect.bottom > 0) {
      
      // Fase 1 (0-0.1): El auto entra de izquierda a derecha - MUY RÁPIDO
      if (progress <= 0.1) {
        const p = progress / 0.1;
        this.ford.position.x = -15 + (p * 15);
        this.ford.rotation.y = Math.PI / 4;
      }

      // Fase 2 (0.1-0.4): El auto gira 360° mostrando TODOS los ángulos - MÁS TIEMPO
      else if (progress <= 0.4) {
        const p = (progress - 0.1) / 0.3;
        this.ford.position.x = 0;
        this.ford.rotation.y = Math.PI / 4 + (p * Math.PI * 2);
      }

      // Fase 3 (0.4-0.6): Zoom al parabrisas - MÁS TEMPRANO
      else if (progress <= 0.6) {
        const p = (progress - 0.4) / 0.2;
        
        this.camera.position.z = 7 - (p * 4);
        this.camera.position.y = 1.5 - (p * 0.5);
        this.ford.rotation.y = Math.PI / 2;
        this.ford.rotation.x = -0.1;
      }

      // Fase 4 (0.6-1.0): Mantiene el zoom y muestra la info - MÁS TIEMPO
      else {
        // El auto se queda en zoom para que se vea la información
        this.camera.position.z = 3;
        this.camera.position.y = 1;
      }
    }
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.ford || !this.renderer || !this.scene || !this.camera) return;

    // Efecto de luces RGB pulsantes
    const time = Date.now() * 0.001;
    if (this.lights[2]) {
      (this.lights[2] as THREE.PointLight).intensity = 4 + Math.sin(time * 2) * 1;
    }
    if (this.lights[3]) {
      (this.lights[3] as THREE.PointLight).intensity = 4 + Math.sin(time * 2 + Math.PI) * 1;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    if (!this.camera || !this.renderer || !this.canvasContainer) return;

    const container = this.canvasContainer.nativeElement;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer && this.scene) {
      this.gltfLoader.dispose(this.renderer, this.scene);
    }
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}

