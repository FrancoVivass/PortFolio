import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

/**
 * Servicio para cargar modelos GLTF/GLB realistas
 * Con iluminación premium y efectos avanzados
 */
@Injectable({
  providedIn: 'root'
})
export class GltfLoaderService {
  private platformId = inject(PLATFORM_ID);
  private loader?: GLTFLoader;
  private dracoLoader?: DRACOLoader;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initLoaders();
    }
  }

  private initLoaders(): void {
    // Configurar DRACO loader para compresión
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    // Configurar GLTF loader
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(this.dracoLoader);
  }

  /**
   * Carga un modelo GLB/GLTF
   */
  async loadModel(path: string): Promise<THREE.Group> {
    if (!this.loader) {
      throw new Error('Loader not initialized');
    }

    return new Promise((resolve, reject) => {
      this.loader!.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          
          // Habilitar sombras en todo el modelo
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Mejorar materiales para realismo
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => this.enhanceMaterial(mat));
                } else {
                  this.enhanceMaterial(child.material);
                }
              }
            }
          });

          resolve(model);
        },
        (progress) => {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`Cargando modelo: ${percent.toFixed(2)}%`);
        },
        (error) => {
          console.error('Error cargando modelo:', error);
          reject(error);
        }
      );
    });
  }

  /**
   * Mejora los materiales para verse más realistas
   */
  private enhanceMaterial(material: THREE.Material): void {
    if (material instanceof THREE.MeshStandardMaterial || 
        material instanceof THREE.MeshPhysicalMaterial) {
      
      // Aumentar calidad visual
      material.envMapIntensity = 1.5;
      material.needsUpdate = true;
    }
  }

  /**
   * Crea una escena optimizada para modelos GLB
   */
  createSceneForModel(container: HTMLElement): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  } | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const scene = new THREE.Scene();
    scene.background = null; // Transparente

    // Cámara con FOV cinematográfico
    const camera = new THREE.PerspectiveCamera(
      35, // FOV más estrecho = más cinematográfico
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);

    // Renderer de alta calidad
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Máximo 2x para performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    container.appendChild(renderer.domElement);

    // Sistema de iluminación premium (estilo Apple)
    this.setupPremiumLighting(scene);

    return { scene, camera, renderer };
  }

  /**
   * Configuración de iluminación premium tipo Apple/ASUS ROG
   */
  private setupPremiumLighting(scene: THREE.Scene): void {
    // 1. Luz ambiental suave
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 2. Luz principal (key light) - desde arriba y adelante
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // 3. Fill light (luz de relleno) - suave desde el lado
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // 4. Rim light (luz de contorno) - desde atrás
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 0.6);
    rimLight.position.set(-3, 5, -8);
    scene.add(rimLight);

    // 5. Point Light RGB - Morado (estilo gaming)
    const rgbLight1 = new THREE.PointLight(0x8b5cf6, 1.5, 20);
    rgbLight1.position.set(-4, 2, 3);
    scene.add(rgbLight1);

    // 6. Point Light RGB - Cyan (estilo gaming)
    const rgbLight2 = new THREE.PointLight(0x06b6d4, 1.5, 20);
    rgbLight2.position.set(4, 2, 3);
    scene.add(rgbLight2);

    // 7. Spotlight desde arriba (dramático)
    const spotlight = new THREE.SpotLight(0xffffff, 0.8);
    spotlight.position.set(0, 10, 0);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.3;
    spotlight.decay = 2;
    spotlight.distance = 30;
    spotlight.castShadow = true;
    scene.add(spotlight);

    // 8. Plano invisible para recibir sombras
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    // 9. Environment Map básico para reflejos
    // (RoomEnvironment requiere import adicional, lo simplificamos)
  }

  /**
   * Centra y escala un modelo automáticamente
   */
  centerAndScaleModel(model: THREE.Group, targetSize: number = 2): void {
    // Calcular bounding box
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Centrar
    model.position.sub(center);

    // Escalar para que quepa en el tamaño objetivo
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetSize / maxDim;
    model.scale.setScalar(scale);
  }

  /**
   * Limpia recursos
   */
  dispose(renderer: THREE.WebGLRenderer, scene: THREE.Scene): void {
    renderer.dispose();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });
  }
}

