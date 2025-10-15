import { Component, AfterViewInit, OnDestroy, HostListener, ElementRef, ViewChild, Input, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GltfLoaderService } from '@core/services/gltf-loader.service';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Componente de fondo 3D con scroll
 * El modelo está EN EL FONDO y muestra diferentes ángulos al scrollear
 * Estilo Apple MacBook Pro / ASUS ROG Flow
 */
@Component({
  selector: 'app-scroll-3d-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-3d-bg">
      <div #canvasContainer class="bg-canvas"></div>
    </div>
  `,
  styles: [`
    .scroll-3d-bg {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
    }

    .bg-canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class Scroll3dBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef<HTMLDivElement>;
  @Input() modelPath: string = '';
  @Input() sectionId: string = '';
  @Input() initialRotation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  @Input() scaleSize: number = 3;
  
  private platformId = inject(PLATFORM_ID);
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private model?: THREE.Group;
  private animationId?: number;
  private rgbLights: THREE.PointLight[] = [];

  constructor(private gltfLoader: GltfLoaderService) {}

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

    try {
      // Cargar modelo
      this.model = await this.gltfLoader.loadModel(this.modelPath);
      this.gltfLoader.centerAndScaleModel(this.model, this.scaleSize);
      
      // Rotación inicial
      this.model.rotation.set(
        this.initialRotation.x,
        this.initialRotation.y,
        this.initialRotation.z
      );
      
      this.scene.add(this.model);

      // Luces RGB
      this.addRGBLights();

      // Entrada dramática
      this.animateEntry();

      // Loop
      this.animate();

    } catch (error) {
      console.error('Error cargando modelo 3D:', error);
    }

    window.addEventListener('resize', this.onResize.bind(this));
  }

  private addRGBLights(): void {
    if (!this.scene) return;

    const rgb1 = new THREE.PointLight(0x8b5cf6, 2, 20);
    rgb1.position.set(-5, 3, 5);
    this.scene.add(rgb1);
    this.rgbLights.push(rgb1);

    const rgb2 = new THREE.PointLight(0x06b6d4, 2, 20);
    rgb2.position.set(5, 3, 5);
    this.scene.add(rgb2);
    this.rgbLights.push(rgb2);
  }

  private animateEntry(): void {
    if (!this.model) return;

    this.model.scale.setScalar(0);

    gsap.to(this.model.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: 'elastic.out(1, 0.5)'
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.updateModelWithScroll();
  }

  private updateModelWithScroll(): void {
    if (!this.model || !this.camera) return;

    const section = document.getElementById(this.sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height));

    // Solo animar cuando está en pantalla (sticky)
    if (rect.top <= 0 && rect.bottom > 0) {
      
      // Rotación cinematográfica: muestra diferentes ángulos
      const targetRotY = this.initialRotation.y + (progress * Math.PI * 2);
      const targetRotX = this.initialRotation.x + (Math.sin(progress * Math.PI) * 0.5);
      
      this.model.rotation.y = targetRotY;
      this.model.rotation.x = targetRotX;

      // Zoom: se acerca
      const targetZ = 5 - (progress * 3);
      this.camera.position.z = targetZ;

      // Para proyectos: mantener visible al final
      if (this.sectionId === 'projects-page') {
        // Mantener visible al final del scroll
        const opacity = progress > 0.8 ? Math.max(0.3, 1 - (progress - 0.8) * 2) : 1;
        if (this.renderer) {
          this.renderer.domElement.style.opacity = opacity.toString();
        }
      } else {
        // Fade out normal para otras páginas
        const opacity = Math.max(0, 1 - (progress * 1.5));
        if (this.renderer) {
          this.renderer.domElement.style.opacity = opacity.toString();
        }
      }
    }
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.model || !this.renderer || !this.scene || !this.camera) return;

    const time = Date.now() * 0.001;

    // RGB rainbow
    this.rgbLights.forEach((light, index) => {
      light.intensity = 2 + Math.sin(time * 1.5 + index * Math.PI) * 0.5;
      const hue = (time * 0.08 + index * 0.5) % 1;
      light.color.setHSL(hue, 1, 0.6);
    });

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

