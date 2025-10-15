import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

/**
 * Servicio para gestionar escenas Three.js
 * Crea objetos 3D realistas con texturas y luces
 */
@Injectable({
  providedIn: 'root'
})
export class ThreeJsService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Crea una escena 3D básica con luces
   */
  createScene(container: HTMLElement): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer } | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const scene = new THREE.Scene();
    
    // Cámara
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1, 100);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

    return { scene, camera, renderer };
  }

  /**
   * Crea un mouse gaming 3D realista
   */
  createMouse(scene: THREE.Scene): THREE.Group {
    const mouse = new THREE.Group();

    // Cuerpo principal del mouse
    const bodyGeometry = new THREE.CapsuleGeometry(0.8, 1.2, 4, 8);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1f2937,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    mouse.add(body);

    // Scroll wheel
    const wheelGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x667eea,
      emissive: 0x667eea,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.y = 0.5;
    wheel.position.z = 0.4;
    wheel.rotation.x = Math.PI / 2;
    mouse.add(wheel);

    // Línea RGB en la base
    const rgbGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.1);
    const rgbMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1
    });
    const rgbLight = new THREE.Mesh(rgbGeometry, rgbMaterial);
    rgbLight.position.y = -0.8;
    mouse.add(rgbLight);

    // Botones (geometría sutil)
    const createButton = (x: number) => {
      const btnGeometry = new THREE.BoxGeometry(0.6, 0.05, 1);
      const btnMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x374151,
        metalness: 0.5,
        roughness: 0.3
      });
      const btn = new THREE.Mesh(btnGeometry, btnMaterial);
      btn.position.set(x, 0.65, 0.2);
      return btn;
    };

    mouse.add(createButton(-0.35));
    mouse.add(createButton(0.35));

    return mouse;
  }

  /**
   * Crea un iPhone realista
   */
  createPhone(scene: THREE.Scene): THREE.Group {
    const phone = new THREE.Group();

    // Cuerpo del teléfono
    const bodyGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1f2937,
      metalness: 0.9,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.05
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    phone.add(body);

    // Pantalla
    const screenGeometry = new THREE.PlaneGeometry(1.4, 2.8);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.8
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.11;
    phone.add(screen);

    // Notch (muesca)
    const notchGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.05);
    const notchMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const notch = new THREE.Mesh(notchGeometry, notchMaterial);
    notch.position.set(0, 1.35, 0.13);
    phone.add(notch);

    // Cámara
    const cameraGeometry = new THREE.CircleGeometry(0.05, 16);
    const cameraMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 1
    });
    const camera = new THREE.Mesh(cameraGeometry, cameraMaterial);
    camera.position.set(-0.15, 1.35, 0.14);
    phone.add(camera);

    return phone;
  }

  /**
   * Crea auriculares gaming realistas
   */
  createHeadphones(scene: THREE.Scene): THREE.Group {
    const headphones = new THREE.Group();

    // Banda superior
    const bandGeometry = new THREE.TorusGeometry(1, 0.08, 16, 100, Math.PI);
    const bandMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.5
    });
    const band = new THREE.Mesh(bandGeometry, bandMaterial);
    band.rotation.z = Math.PI;
    band.position.y = 0.5;
    band.castShadow = true;
    headphones.add(band);

    // Crear un ear cup
    const createEarCup = (x: number) => {
      const cupGroup = new THREE.Group();
      
      // Cup exterior
      const cupGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
      const cupMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1f2937,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1
      });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.rotation.z = Math.PI / 2;
      cup.castShadow = true;
      cupGroup.add(cup);

      // Cushion (almohadilla)
      const cushionGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.15, 32);
      const cushionMaterial = new THREE.MeshStandardMaterial({
        color: 0x374151,
        roughness: 0.9,
        metalness: 0.1
      });
      const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
      cushion.rotation.z = Math.PI / 2;
      cupGroup.add(cushion);

      // RGB ring
      const ringGeometry = new THREE.TorusGeometry(0.45, 0.03, 16, 32);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x667eea,
        emissive: 0x667eea,
        emissiveIntensity: 1
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.y = Math.PI / 2;
      cupGroup.add(ring);

      cupGroup.position.set(x, 0, 0);
      return cupGroup;
    };

    headphones.add(createEarCup(-1));
    headphones.add(createEarCup(1));

    return headphones;
  }

  /**
   * Crea un laptop realista
   */
  createLaptop(scene: THREE.Scene): THREE.Group {
    const laptop = new THREE.Group();

    // Pantalla
    const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1f2937,
      metalness: 0.9,
      roughness: 0.05,
      clearcoat: 1
    });
    const screenFrame = new THREE.Mesh(screenGeometry, screenMaterial);
    screenFrame.castShadow = true;
    laptop.add(screenFrame);

    // Display (pantalla encendida)
    const displayGeometry = new THREE.PlaneGeometry(2.8, 1.8);
    const displayMaterial = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.5
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.06;
    laptop.add(display);

    // Base/teclado
    const baseGeometry = new THREE.BoxGeometry(3, 0.15, 2);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x374151,
      metalness: 0.7,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -1.2, 0.5);
    base.rotation.x = Math.PI * 0.1;
    base.castShadow = true;
    laptop.add(base);

    // Ajustar rotación de la pantalla
    screenFrame.rotation.x = -Math.PI * 0.1;

    return laptop;
  }

  /**
   * Anima un objeto 3D con rotación suave
   */
  animate(object: THREE.Group, renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): void {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      
      // Rotación suave
      object.rotation.y += 0.005;
      object.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animateLoop();
  }

  /**
   * Limpia recursos de Three.js
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

