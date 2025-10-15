# 🚀 Portafolio Franco Vivas

Portafolio profesional desarrollado con **Angular 18** y **Three.js** que presenta un diseño cinematográfico inspirado en Apple y ASUS ROG con efectos de scroll avanzados.

## ✨ Características Principales

### 🎨 Diseño Cinematográfico
- **ScrollTelling** estilo Apple/ASUS ROG
- **Modelos 3D realistas** con Three.js
- **Animaciones GSAP** avanzadas con ScrollTrigger
- **Tema dual**: Negro con Morado / Blanco con Morado

### 🖥️ Tecnologías Utilizadas
- **Angular 18** con Standalone Components
- **Tailwind CSS** para estilos
- **Three.js** para modelos 3D
- **GSAP** para animaciones
- **TypeScript** para tipado fuerte

### 🎯 Modelos 3D Incluidos
- **Ford Shelby** - Animación cinematográfica con rotación 360°
- **iPhone 14 Pro** - Modelo gigante en página de contacto
- **Auriculares de Piloto** - Modelo gigante en página About
- **Laptop Alienware** - Modelo persistente en proyectos
- **Gamepads** - Animación flotante en Hero
- **Teclado** - Modelo de fondo en sección setup

### 🌟 Efectos Especiales
- **ScrollTrigger** para animaciones basadas en scroll
- **Parallax** en múltiples capas
- **Glass morphism** y efectos de blur
- **Gradientes animados** y partículas
- **Transiciones suaves** entre secciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- Angular CLI 18+
- Git

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/FrancoVivass/PortFolio.git
cd PortFolio

# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Abrir en navegador
# http://localhost:4200
```

### Scripts Disponibles

```bash
# Desarrollo
ng serve

# Construcción para producción
ng build

# Tests unitarios
ng test

# Linting
ng lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   └── services/          # Servicios principales
│   ├── features/              # Páginas principales
│   │   ├── home/             # Página principal
│   │   ├── about/            # Sobre mí
│   │   ├── projects/         # Proyectos
│   │   └── contact/          # Contacto
│   └── shared/
│       └── components/       # Componentes reutilizables
├── assets/
│   ├── models/              # Modelos 3D (.glb)
│   └── images/              # Imágenes
└── styles.scss              # Estilos globales
```

## 🎨 Personalización

### Colores del Tema
- **Modo Oscuro**: Negro (#000000) con acentos morados (#8b5cf6)
- **Modo Claro**: Blanco (#ffffff) con acentos morados (#8b5cf6)

### Modelos 3D
Los modelos están en `src/assets/models/` en formato GLB:
- `ford_shelby.glb` - Automóvil Ford Shelby
- `iphone_14_pro.glb` - iPhone 14 Pro
- `auriculares_para_pilotos_a30_de_b_ose.glb` - Auriculares
- `laptop_alienpredator.glb` - Laptop Alienware
- `gamepads.glb` - Controles de videojuegos
- `teclado.glb` - Teclado mecánico

## 🔧 Configuración Avanzada

### GSAP ScrollTrigger
```typescript
// Ejemplo de animación personalizada
this.gsapService.fadeInOnScroll('.element', { stagger: 0.2 });
this.gsapService.parallax('.layer', 0.5);
```

### Three.js
```typescript
// Configuración de modelo 3D
this.threejsService.createScene(container);
this.gltfLoaderService.loadModel('path/to/model.glb');
```

## 📱 Responsive Design

El portafolio está optimizado para:
- **Desktop**: 1920px+
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Netlify
```bash
# Build del proyecto
ng build --configuration production

# Subir carpeta dist/ a Netlify
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Franco Argelio Vivas**
- 🌐 [Portfolio](https://francovivass.github.io/PortFolio/)
- 💼 [LinkedIn](https://www.linkedin.com/in/franco-vivas-ab915628a/)
- 🐙 [GitHub](https://github.com/FrancoVivass)
- 📧 Email: francovivasa@gmail.com

## 🙏 Agradecimientos

- **Three.js** por la librería 3D
- **GSAP** por las animaciones avanzadas
- **Tailwind CSS** por el sistema de diseño
- **Angular Team** por el framework

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐