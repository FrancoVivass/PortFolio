# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a tener tu portafolio funcionando en menos de 5 minutos.

## 📋 Pasos Iniciales

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Iniciar el Servidor de Desarrollo

```bash
npm start
```

Abre tu navegador en `http://localhost:4200/` 🎉

## ✏️ Personalización Rápida

### 1. Información Personal

Edita `src/app/core/services/data.service.ts`:

```typescript
const info: PersonalInfo = {
  name: 'TU NOMBRE',                    // ← Cambia esto
  title: 'TU TÍTULO PROFESIONAL',       // ← Cambia esto
  bio: 'TU BIOGRAFÍA',                  // ← Cambia esto
  email: 'tu@email.com',                // ← Cambia esto
  phone: '+34 123 456 789',             // ← Cambia esto
  location: 'Tu Ciudad, País',          // ← Cambia esto
  avatar: 'assets/images/avatar.jpg',
  social: {
    github: 'https://github.com/tuusuario',      // ← Cambia esto
    linkedin: 'https://linkedin.com/in/tuusuario', // ← Cambia esto
    twitter: 'https://twitter.com/tuusuario',     // ← Cambia esto
    dribbble: 'https://dribbble.com/tuusuario'    // ← Cambia esto
  }
};
```

### 2. Agregar Tus Proyectos

En el mismo archivo `data.service.ts`, actualiza la función `getProjects()`:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Mi Proyecto Increíble',           // ← Tu proyecto
    description: 'Descripción corta',
    longDescription: 'Descripción detallada',
    image: 'assets/images/projects/proyecto1.jpg',
    tags: ['Angular', 'TypeScript', 'Tailwind'],
    category: 'fullstack',                    // angular | node | fullstack | ui-ux | api
    demoUrl: 'https://demo.ejemplo.com',
    githubUrl: 'https://github.com/tu/proyecto',
    technologies: ['Angular 18', 'NestJS', 'MongoDB'],
    featured: true                            // true para destacar
  },
  // Añade más proyectos aquí...
];
```

### 3. Actualizar Experiencia

En `data.service.ts`, edita `getExperience()`:

```typescript
const experience: Experience[] = [
  {
    id: '1',
    company: 'Tu Empresa',
    position: 'Tu Cargo',
    period: '2020 - Presente',
    description: 'Descripción de tus responsabilidades',
    technologies: ['Angular', 'TypeScript', 'etc'],
    icon: 'briefcase',                        // briefcase | academic-cap | code
    type: 'work'                              // work | education
  },
  // Añade más experiencias...
];
```

### 4. Personalizar Colores (Opcional)

Edita `tailwind.config.js`:

```javascript
colors: {
  accent: {
    cyan: '#06b6d4',      // ← Tu color principal
    violet: '#8b5cf6',    // ← Tu color secundario
    gold: '#fbbf24',      // ← Tu color de acento
  }
}
```

### 5. Añadir Tu Foto

1. Coloca tu foto en `src/assets/images/avatar.jpg`
2. Actualiza la ruta en `data.service.ts` si usas otro nombre

## 🎨 Temas

El portafolio incluye modo oscuro/claro que se guarda automáticamente.

Para cambiar el tema por defecto, edita `src/index.html`:

```html
<!-- Dark por defecto -->
<body class="dark">

<!-- Light por defecto -->
<body class="light">
```

## 📧 Configurar Envío de Emails (Opcional)

### Opción 1: EmailJS

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio y template
3. Actualiza `src/environments/environment.ts`:

```typescript
export const environment = {
  emailJsServiceId: 'tu_service_id',
  emailJsTemplateId: 'tu_template_id',
  emailJsPublicKey: 'tu_public_key'
};
```

4. Instala EmailJS:
```bash
npm install @emailjs/browser
```

5. Actualiza `contact.component.ts` para usar EmailJS

### Opción 2: Backend Propio

Crea tu API con Node.js/Express y actualiza el método `onSubmit()` en `contact.component.ts`

## 🚢 Desplegar

### GitHub Pages

```bash
# 1. Actualiza el archivo .github/workflows/deploy.yml
# 2. Haz push a la rama main
git add .
git commit -m "Initial commit"
git push origin main

# 3. Tu sitio estará en: https://tuusuario.github.io/Portafolio/
```

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

1. Conecta tu repo en netlify.com
2. Build command: `npm run build`
3. Publish directory: `dist/portfolio/browser`

## 📱 Siguiente Nivel

### Añadir Animaciones Lottie

1. Descarga animaciones de [LottieFiles](https://lottiefiles.com/)
2. Colócalas en `src/assets/animations/`
3. Úsalas en tus componentes:

```typescript
import { LottieComponent } from 'ngx-lottie';

@Component({
  imports: [LottieComponent],
  template: `
    <ng-lottie [options]="options"></ng-lottie>
  `
})
export class MiComponente {
  options = {
    path: 'assets/animations/mi-animacion.json'
  };
}
```

### Integrar GitHub API

Actualiza `src/environments/environment.ts`:

```typescript
export const environment = {
  githubUsername: 'tu-usuario-github'
};
```

Los proyectos de GitHub se cargarán automáticamente.

### Añadir Blog Posts

Edita `data.service.ts` en `getBlogPosts()`:

```typescript
const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Mi Primer Post',
    excerpt: 'Resumen del post',
    content: '# Título\n\nContenido en Markdown',
    date: new Date(),
    author: 'Tu Nombre',
    tags: ['Angular', 'TypeScript'],
    coverImage: 'assets/images/blog/post1.jpg',
    readTime: 5
  }
];
```

## 🆘 Problemas Comunes

### Error: Cannot find module

```bash
npm install
```

### Tailwind no funciona

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### Puerto 4200 en uso

```bash
ng serve --port 4201
```

## 📚 Recursos

- [Documentación Angular](https://angular.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [LottieFiles](https://lottiefiles.com/)
- [Iconos Heroicons](https://heroicons.com/)
- [Fuentes Google](https://fonts.google.com/)

## 💡 Tips

1. **Optimiza imágenes**: Usa WebP y comprime las imágenes
2. **SEO**: Actualiza meta tags en cada componente
3. **Performance**: Usa lazy loading para imágenes grandes
4. **Accesibilidad**: Añade alt text a todas las imágenes
5. **Analytics**: Integra Google Analytics en `index.html`

## ✅ Checklist Antes de Publicar

- [ ] Información personal actualizada
- [ ] Proyectos añadidos con imágenes
- [ ] Experiencia laboral completa
- [ ] Links a redes sociales correctos
- [ ] Email configurado (EmailJS o backend)
- [ ] Colores personalizados (opcional)
- [ ] Foto de perfil añadida
- [ ] Tests funcionando (`npm test`)
- [ ] Build de producción exitoso (`npm run build`)
- [ ] README actualizado con tu información

---

¿Necesitas ayuda? Abre un [issue](https://github.com/tuusuario/portafolio/issues) 🙋‍♂️

