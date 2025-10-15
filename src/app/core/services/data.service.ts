import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Interfaces para los datos del portafolio
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: 'angular' | 'node' | 'fullstack' | 'ui-ux' | 'api';
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  technologies: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  icon: string;
  type: 'work' | 'education';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'design';
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  author: string;
  tags: string[];
  coverImage: string;
  readTime: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

/**
 * Servicio para gestionar los datos del portafolio
 * En producción, estos datos vendrían de una API
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * Obtiene la información personal
   */
  getPersonalInfo(): Observable<PersonalInfo> {
    const info: PersonalInfo = {
      name: 'Franco Argelio Vivas',
      title: 'Desarrollador Full Stack | Analista de Sistemas',
      bio: 'Estudiante avanzado de Analista de Sistemas en el Instituto Paula Robles con sólida experiencia en desarrollo web. Especializado en Angular y creación de soluciones completas desde el frontend hasta la base de datos. Apasionado por aprender nuevas tecnologías y crear experiencias de usuario excepcionales.',
      email: 'francovivasa@gmail.com',
      phone: '+54 2245 123456',
      location: 'Dolores, Buenos Aires, Argentina',
      avatar: 'assets/images/avatar.jpg',
      social: {
        github: 'https://github.com/FrancoVivass',
        linkedin: 'https://www.linkedin.com/in/franco-vivas-ab915628a/',
        twitter: 'https://x.com/francovivass',
        dribbble: 'https://www.instagram.com/fran.vivas_ok/'
      }
    };

    return of(info).pipe(delay(300));
  }

  /**
   * Obtiene la lista de proyectos
   */
  getProjects(): Observable<Project[]> {
    const projects: Project[] = [
      {
        id: '1',
        title: 'Sistema de Gestión Educativa',
        description: 'Aplicación de escritorio para gestión de instituciones educativas',
        longDescription: 'Sistema completo para gestión de escuelas, instituciones y universidades con aplicación de escritorio desarrollada en C# y página web administrativa. Incluye control de asistencia, gestión de alumnos, profesores y materias.',
        image: 'assets/images/projects/gestion-educativa.jpg',
        tags: ['Angular', 'C#', 'MySQL', '.NET'],
        category: 'fullstack',
        githubUrl: 'https://github.com/FrancoVivass/asistenciaalumnos',
        technologies: ['Angular', 'C# .NET', 'MySQL Workbench', 'Bootstrap'],
        featured: true
      },
      {
        id: '2',
        title: 'Sistema Contable FastBook',
        description: 'Aplicación web para sistema de contabilidad empresarial',
        longDescription: 'Aplicación web completa para gestión contable con diseño moderno y funcional. Incluye módulos de facturación, reportes financieros y gestión de clientes. Desarrollada con Angular en el frontend y Python en el backend.',
        image: 'assets/images/projects/fastbook.jpg',
        tags: ['Angular', 'Python', 'MySQL', 'Contabilidad'],
        category: 'fullstack',
        githubUrl: 'https://github.com/FrancoVivass/Fastbook',
        technologies: ['Angular', 'Python', 'MySQL Workbench', 'Bootstrap'],
        featured: true
      },
      {
        id: '3',
        title: 'Portal Universitario',
        description: 'Página web para centro universitario con sistema de reservas',
        longDescription: 'Portal web institucional para una universidad de Dolores, Buenos Aires. Incluye sistema de reserva de aulas, información institucional, calendario académico y sección de noticias. Diseño responsive y moderno.',
        image: 'assets/images/projects/universidad.jpg',
        tags: ['Angular', 'Web Design', 'UI/UX'],
        category: 'angular',
        demoUrl: 'https://francovivass.github.io/PaginaDeCentro/',
        githubUrl: 'https://github.com/FrancoVivass/PaginaDeCentro',
        technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3'],
        featured: true
      },
      {
        id: '4',
        title: 'Sistema Solar VR 3D',
        description: 'Experiencia de realidad aumentada educativa del sistema solar',
        longDescription: 'Aplicación de realidad aumentada desarrollada con A-Frame y AR.js que permite explorar el sistema solar de forma interactiva. Incluye información educativa de cada planeta, controles de velocidad y animaciones 3D. Proyecto educativo innovador con tecnología WebVR.',
        image: 'assets/images/projects/vr-solar.jpg',
        tags: ['VR', 'A-Frame', 'WebVR', 'AR.js'],
        category: 'ui-ux',
        demoUrl: 'https://vr-trabajo.vercel.app/',
        githubUrl: 'https://github.com/FrancoVivass/VR-TRABAJO',
        technologies: ['A-Frame', 'AR.js', 'HTML5', 'JavaScript', 'WebVR'],
        featured: true
      }
    ];

    return of(projects).pipe(delay(500));
  }

  /**
   * Obtiene un proyecto por ID
   */
  getProjectById(id: string): Observable<Project | undefined> {
    return new Observable(observer => {
      this.getProjects().subscribe(projects => {
        observer.next(projects.find(p => p.id === id));
        observer.complete();
      });
    });
  }

  /**
   * Obtiene la experiencia laboral y educación
   */
  getExperience(): Observable<Experience[]> {
    const experience: Experience[] = [
      {
        id: '1',
        company: 'Proyectos Freelance',
        position: 'Desarrollador Web Full Stack',
        period: '2023 - Presente',
        description: 'Desarrollo de páginas web y sistemas para universidades y tiendas de ropa. Implementación de soluciones completas desde el diseño hasta el despliegue, incluyendo bases de datos y aplicaciones de escritorio.',
        technologies: ['Angular', 'C#', 'MySQL', 'Python', 'Bootstrap'],
        icon: 'code',
        type: 'work'
      },
      {
        id: '2',
        company: 'Instituto Paula Robles',
        position: 'Analista de Sistemas',
        period: '2020 - Presente (Último Año)',
        description: 'Formación técnica superior en análisis de sistemas, con énfasis en desarrollo web, bases de datos y arquitectura de software. Desarrollo de proyectos académicos y prácticos aplicando metodologías ágiles.',
        technologies: ['Angular', 'C#', 'SQL Server', 'MySQL', 'Git'],
        icon: 'academic-cap',
        type: 'education'
      },
      {
        id: '3',
        company: 'Escuela Normal N°1',
        position: 'Educación Secundaria',
        period: '2016 - 2022',
        description: 'Formación secundaria completa con orientación en ciencias exactas. Base sólida en matemáticas, lógica y pensamiento analítico.',
        technologies: [],
        icon: 'academic-cap',
        type: 'education'
      }
    ];

    return of(experience).pipe(delay(400));
  }

  /**
   * Obtiene las habilidades técnicas
   */
  getSkills(): Observable<Skill[]> {
    const skills: Skill[] = [
      // Frontend
      { name: 'HTML5/CSS3', level: 100, category: 'frontend', icon: '🌐' },
      { name: 'Angular', level: 80, category: 'frontend', icon: '🅰️' },
      { name: 'TypeScript', level: 70, category: 'frontend', icon: '📘' },
      { name: 'JavaScript', level: 70, category: 'frontend', icon: '💛' },
      { name: 'Bootstrap', level: 100, category: 'frontend', icon: '🎨' },
      
      // Backend
      { name: 'Node.js', level: 70, category: 'backend', icon: '🟢' },
      { name: 'C# .NET', level: 30, category: 'backend', icon: '💜' },
      { name: 'Python', level: 60, category: 'backend', icon: '🐍' },
      
      // Bases de Datos
      { name: 'MySQL', level: 80, category: 'tools', icon: '🐬' },
      { name: 'SQL Server', level: 85, category: 'tools', icon: '🗄️' },
      
      // Herramientas
      { name: 'Git', level: 100, category: 'tools', icon: '📌' },
      { name: 'VS Code', level: 80, category: 'tools', icon: '💻' },
      { name: 'MySQL Workbench', level: 85, category: 'tools', icon: '🛠️' },
      
      // Design
      { name: 'UI/UX Design', level: 75, category: 'design', icon: '✨' },
      { name: 'Responsive Design', level: 90, category: 'design', icon: '📱' },
      { name: 'WebVR/AR', level: 65, category: 'design', icon: '🥽' },
    ];

    return of(skills).pipe(delay(350));
  }

  /**
   * Obtiene los posts del blog
   */
  getBlogPosts(): Observable<BlogPost[]> {
    const posts: BlogPost[] = [
      {
        id: '1',
        title: 'Introducción a Angular Signals',
        excerpt: 'Descubre cómo los signals revolucionan la reactividad en Angular 18',
        content: '# Introducción a Angular Signals\n\nLos signals son una nueva forma de gestionar el estado...',
        date: new Date('2024-01-15'),
        author: 'Tu Nombre',
        tags: ['Angular', 'Signals', 'Frontend'],
        coverImage: 'assets/images/blog/angular-signals.jpg',
        readTime: 5
      },
      {
        id: '2',
        title: 'Arquitectura Limpia en Angular',
        excerpt: 'Cómo estructurar aplicaciones Angular escalables y mantenibles',
        content: '# Arquitectura Limpia en Angular\n\nLa arquitectura limpia es fundamental...',
        date: new Date('2024-01-10'),
        author: 'Tu Nombre',
        tags: ['Angular', 'Arquitectura', 'Best Practices'],
        coverImage: 'assets/images/blog/clean-architecture.jpg',
        readTime: 8
      }
    ];

    return of(posts).pipe(delay(450));
  }

  /**
   * Obtiene un post del blog por ID
   */
  getBlogPostById(id: string): Observable<BlogPost | undefined> {
    return new Observable(observer => {
      this.getBlogPosts().subscribe(posts => {
        observer.next(posts.find(p => p.id === id));
        observer.complete();
      });
    });
  }
}

