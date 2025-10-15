import { Component, AfterViewInit, OnDestroy, Input, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GltfLoaderService } from '@core/services/gltf-loader.service';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Logo FV 3D animado
 * Carga el modelo f_logo_3d.glb
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/home" class="logo-container" [class.logo-small]="size === 'small'">
      <div #canvasContainer class="logo-canvas"></div>
      
      @if (showText) {
        <span class="logo-text">Franco Vivas</span>
      }
    </a>
  `,
  styles: [`
    .logo-container {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      transition: all 0.3s;
    }

    .logo-canvas {
      width: 60px;
      height: 60px;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .logo-small .logo-canvas {
      width: 40px;
      height: 40px;
    }

    .logo-container:hover .logo-canvas {
      transform: scale(1.15);
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Poppins', sans-serif;
    }
  `]
})
export class LogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasContainer!: ElementRef<HTMLDivElement>;
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() showText: boolean = true;

  private platformId = inject(PLATFORM_ID);
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private logo?: THREE.Group;
  private animationId?: number;

  constructor(private gltfLoader: GltfLoaderService) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.initScene();
    }, 100);
  }

  private async initScene(): Promise<void> {
    const container = this.canvasContainer.nativeElement;
    const sceneData = this.gltfLoader.createSceneForModel(container);
    
    if (!sceneData) return;

    this.scene = sceneData.scene;
    this.camera = sceneData.camera;
    this.renderer = sceneData.renderer;

    this.camera.position.set(0, 0, 3);

    try {
      this.logo = await this.gltfLoader.loadModel('assets/models/f_logo_3d.glb');
      this.gltfLoader.centerAndScaleModel(this.logo, 1.5);
      this.scene.add(this.logo);

      // Luz RGB
      const light1 = new THREE.PointLight(0x667eea, 1.5, 10);
      light1.position.set(-2, 1, 2);
      this.scene.add(light1);

      const light2 = new THREE.PointLight(0x06b6d4, 1.5, 10);
      light2.position.set(2, 1, 2);
      this.scene.add(light2);

      this.animate();

    } catch (error) {
      console.error('Error cargando logo 3D:', error);
    }
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.logo || !this.renderer || !this.scene || !this.camera) return;

    // Rotación suave
    this.logo.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer && this.scene) {
      this.gltfLoader.dispose(this.renderer, this.scene);
    }
  }
}

