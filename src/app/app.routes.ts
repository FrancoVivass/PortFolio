import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: 'projects', 
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  { 
    path: 'skills', 
    loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent)
  },
  { 
    path: 'services', 
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  { 
    path: 'blog', 
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  { 
    path: 'downloads', 
    loadComponent: () => import('./pages/downloads/downloads.component').then(m => m.DownloadsComponent)
  },
  { path: '**', redirectTo: '' },
];