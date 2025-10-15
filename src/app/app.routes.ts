import { Routes } from '@angular/router';

/**
 * Configuración de rutas de la aplicación
 * Todas las rutas utilizan lazy loading para optimizar el rendimiento
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio | Portafolio Profesional'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre Mí | Portafolio Profesional'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Proyectos | Portafolio Profesional'
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experiencia | Portafolio Profesional'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
    title: 'Blog | Portafolio Profesional'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto | Portafolio Profesional'
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 - Página no encontrada'
  }
];

