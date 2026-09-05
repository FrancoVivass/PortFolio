import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

type Project = { name: string; eyebrow: string; description: string; result: string; tech: string[]; status: string; repo?: string; live?: string };

@Component({ selector: 'app-home', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], templateUrl: './home.component.html', styleUrl: './home.component.scss' })
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly host = inject(ElementRef<HTMLElement>);
  private bootTimer?: ReturnType<typeof setTimeout>;
  private revealObserver?: IntersectionObserver;
  menuOpen = false; scrolled = false; sending = false; sent = false; submitError = '';
  booting = true; terminalOpen = false; audience: 'client' | 'recruiter' = 'client'; progress = 0;
  selectedProject: Project | null = null; terminalCommand = ''; terminalOutput = ['Escribí “help” para ver los comandos disponibles.'];
  tourActive = false; tourStep = 0;
  readonly tour = [{ id: 'inicio', title: 'Una presentación en movimiento' }, { id: 'proyectos', title: 'Sistemas construidos desde problemas reales' }, { id: 'arquitectura', title: 'Decisiones técnicas visibles' }, { id: 'proceso', title: 'Un proceso claro de principio a fin' }, { id: 'perfil', title: 'Experiencia y herramientas comprobables' }, { id: 'contacto', title: 'Una idea puede empezar acá' }];
  github = { repos: 21, languages: 6, latest: 'Vestia', loaded: false };
  architectureIndex = 0;
  readonly architectures = [
    { name: 'Academic System', type: 'Gestión académica', summary: 'Una arquitectura modular con autenticación y permisos por rol para administrar todo el ciclo académico.', nodes: [{ label: 'Angular', detail: 'Interfaz y módulos' }, { label: 'Supabase Auth', detail: 'Sesiones y roles' }, { label: 'PostgreSQL', detail: 'Datos académicos' }, { label: 'Cloudflare', detail: 'Entrega y seguridad' }], flow: ['Usuario', 'Permisos', 'Módulo', 'Base de datos'] },
    { name: 'Vestia', type: 'SaaS comercial', summary: 'Diseñada para separar datos por comercio y propietario sin perder una experiencia operativa rápida.', nodes: [{ label: 'Angular', detail: 'Punto de venta' }, { label: 'Supabase', detail: 'API y realtime' }, { label: 'PostgreSQL', detail: 'Stock y ventas' }, { label: 'Barcode', detail: 'Lectura e impresión' }], flow: ['Venta', 'Stock', 'Pago', 'Reporte'] },
    { name: 'Retake', type: 'Plataforma de contenido', summary: 'Una capa frontend preparada para integrar distintas fuentes públicas del ecosistema de Counter-Strike 2.', nodes: [{ label: 'Angular', detail: 'Experiencia web' }, { label: 'REST APIs', detail: 'Fuentes externas' }, { label: 'Cache', detail: 'Respuesta rápida' }, { label: 'Market data', detail: 'Noticias y mercado' }], flow: ['Consulta', 'API', 'Normalización', 'Interfaz'] }
  ];
  readonly projects: Project[] = [
    { name: 'AS Academic System', eyebrow: 'Proyecto final · 2025—2026', description: 'Una plataforma académica integral para reemplazar planillas, registros manuales y procesos duplicados.', result: 'Centraliza alumnos, docentes, cursos, notas, asistencia, correlatividades, eventos, reportes y permisos por rol.', tech: ['Angular', 'Supabase', 'PostgreSQL', 'Cloudflare'], status: 'Versión funcional terminada', repo: 'https://github.com/FrancoVivass/AS-Academic-System' },
    { name: 'Vestia', eyebrow: 'Producto propio · 2026', description: 'Gestión comercial pensada para locales de indumentaria, desde una única operación hasta múltiples comercios.', result: 'Organiza stock, ventas, propietarios, códigos de barras, impresión, cobros y administración desde un solo lugar.', tech: ['Angular', 'Supabase', 'Tailwind', 'PostgreSQL'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/Vestia' },
    { name: 'Retake', eyebrow: 'Plataforma personal · 2026', description: 'Una experiencia digital que reúne noticias, mercado e información relevante del ecosistema Counter-Strike 2.', result: 'Explora integración de datos públicos, arquitectura frontend y una interfaz construida para una comunidad específica.', tech: ['Angular', 'TypeScript', 'APIs públicas'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/retake' },
    { name: 'Centro Universitario de Dolores', eyebrow: 'Web institucional', description: 'Sitio institucional moderno para comunicar carreras, docentes, reservas, novedades y vías de contacto.', result: 'Navegación responsive, filtros, páginas de detalle, formularios e integración con servicios externos.', tech: ['Angular', 'TypeScript', 'CSS'], status: 'Proyecto avanzado', repo: 'https://github.com/FrancoVivass/PaginaDeCentro' },
    { name: 'Manijeada', eyebrow: 'Juego social', description: 'Experiencia multijugador para reuniones que conecta celulares mediante salas y códigos QR.', result: 'Incluye anfitrión, jugadores, impostor, ruleta, retos, logros y diferentes modos de juego.', tech: ['Angular', 'Supabase', 'Realtime'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/manijeada-arg', live: 'https://manijeadarg.vercel.app' },
    { name: 'Simulaciones Monte Carlo', eyebrow: 'Proyecto académico', description: 'Herramienta de simulación probabilística para experimentar, visualizar escenarios y analizar resultados.', result: 'Convierte conceptos estadísticos en una experiencia web interactiva y fácil de explorar.', tech: ['JavaScript', 'Simulación', 'Visualización'], status: 'Terminado', repo: 'https://github.com/FrancoVivass/Simulaciones-MonteCarlo' }
  ];
  readonly services = [
    { value: 'landing', title: 'Landing page', time: '5—10 días', copy: 'Una página enfocada en presentar una propuesta y convertir visitas en consultas.', includes: 'Diseño a medida, responsive, formulario, SEO base y publicación.' },
    { value: 'institutional', title: 'Sitio institucional', time: '1—3 semanas', copy: 'Una presencia profesional para empresas, instituciones y servicios.', includes: 'Hasta 6 secciones, analítica, SEO base y contacto.' },
    { value: 'catalog', title: 'Catálogo digital', time: '2—4 semanas', copy: 'Productos o servicios organizados con búsqueda, filtros y consultas.', includes: 'Catálogo autogestionable, panel base e integración con WhatsApp.' },
    { value: 'system', title: 'Sistema a medida', time: 'Según alcance', copy: 'Procesos, datos y equipos conectados en una herramienta propia.', includes: 'Análisis, UX/UI, roles, base de datos, desarrollo y despliegue.' }
  ];
  readonly faqs = [
    { question: '¿Cómo se calcula el presupuesto?', answer: 'Primero definimos el objetivo, las pantallas, integraciones y el contenido. Con ese alcance preparo una propuesta cerrada, con etapas, tiempos y condiciones. Los valores publicados sirven como punto de partida.' },
    { question: '¿Necesito tener dominio y hosting?', answer: 'No. Puedo asesorarte, configurar ambos y dejar la aplicación publicada. El dominio, el hosting y las licencias externas se detallan por separado para que siempre sepas qué estás pagando.' },
    { question: '¿Trabajás con clientes de otras ciudades?', answer: 'Sí. Trabajo de forma remota con clientes de toda Argentina y también puedo coordinar proyectos internacionales.' },
    { question: '¿Qué necesito para empezar?', answer: 'Una explicación del problema, referencias si existen y una idea del plazo. No hace falta llegar con todo definido: la primera conversación sirve para ordenar el alcance.' },
    { question: '¿Se puede modificar el sistema después?', answer: 'Sí. Diseño los proyectos para que puedan evolucionar. Las nuevas funciones se analizan y presupuestan como etapas adicionales.' },
    { question: '¿Ofrecés mantenimiento?', answer: 'Sí. Puede incluir actualizaciones, correcciones, monitoreo, soporte y cambios menores. El plan depende de la tecnología y la frecuencia que necesite el proyecto.' },
    { question: '¿Cómo se realizan los pagos?', answer: 'Como esquema inicial, 50% al comenzar y 50% antes de la publicación. En proyectos grandes se puede dividir el trabajo y los pagos por hitos.' },
    { question: '¿Podés trabajar sobre un sistema existente?', answer: 'Sí. Primero realizo una revisión técnica para entender su estado, dependencias y riesgos. Luego propongo una mejora gradual o una reconstrucción, según convenga.' }
  ];
  readonly contactForm = this.fb.group({ name: ['', [Validators.required, Validators.minLength(2)]], company: [''], email: ['', [Validators.required, Validators.email]], phone: [''], service: ['landing', Validators.required], deadline: [''], message: ['', [Validators.required, Validators.minLength(20)]], admin: [false], database: [false], payments: [false], website: [''] });
  constructor(title: Title, meta: Meta) { title.setTitle('Franco Vivas — Analista de Sistemas y Desarrollador Full-Stack'); meta.updateTag({ name: 'description', content: 'Desarrollo páginas web, sistemas de gestión y aplicaciones a medida para transformar procesos reales en soluciones simples.' }); }
  ngAfterViewInit(): void {
    this.bootTimer = setTimeout(() => this.booting = false, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1900);
    this.revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); this.revealObserver?.unobserve(entry.target); } }), { threshold: .12 });
    const root = this.host.nativeElement as HTMLElement;
    root.querySelectorAll('.section-heading, .project, .service-card, .experience article, .process-line article').forEach((element: Element) => { element.classList.add('reveal'); this.revealObserver?.observe(element); });
    this.loadGithub();
  }
  ngOnDestroy(): void { if (this.bootTimer) clearTimeout(this.bootTimer); this.revealObserver?.disconnect(); }
  @HostListener('window:scroll') onScroll(): void { this.scrolled = window.scrollY > 24; const max = document.documentElement.scrollHeight - innerHeight; this.progress = max > 0 ? Math.min(100, (scrollY / max) * 100) : 0; }
  @HostListener('document:mousemove', ['$event']) onPointerMove(event: MouseEvent): void { this.host.nativeElement.style.setProperty('--pointer-x', `${event.clientX}px`); this.host.nativeElement.style.setProperty('--pointer-y', `${event.clientY}px`); }
  @HostListener('document:keydown.escape') closeOverlays(): void { this.terminalOpen = false; this.selectedProject = null; }
  updateEstimate(): void {}
  scrollTo(id: string): void { this.menuOpen = false; document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
  selectAudience(value: 'client' | 'recruiter'): void { this.audience = value; if (value === 'recruiter') this.scrollTo('perfil'); }
  startTour(): void { this.tourActive = true; this.tourStep = 0; this.scrollTo(this.tour[0].id); }
  nextTour(): void { if (this.tourStep >= this.tour.length - 1) { this.tourActive = false; return; } this.tourStep++; this.scrollTo(this.tour[this.tourStep].id); }
  tilt(event: MouseEvent): void { const card = event.currentTarget as HTMLElement; const rect = card.getBoundingClientRect(); const x = ((event.clientX - rect.left) / rect.width - .5) * 5; const y = ((event.clientY - rect.top) / rect.height - .5) * -5; card.style.setProperty('--rx', `${y}deg`); card.style.setProperty('--ry', `${x}deg`); }
  resetTilt(event: MouseEvent): void { const card = event.currentTarget as HTMLElement; card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
  runCommand(): void { const command = this.terminalCommand.trim().toLowerCase(); if (!command) return; const responses: Record<string, string> = { help: 'Comandos: about · projects · skills · contact · github · clear', about: 'Franco Vivas — Analista de Sistemas y desarrollador Full-Stack.', projects: 'Academic System · Vestia · Retake · Centro Universitario · Manijeada', skills: 'Angular · TypeScript · Supabase · PostgreSQL · REST · Cloudflare', contact: 'francovivasa@gmail.com — bajando a la sección de contacto…', github: 'github.com/FrancoVivass' }; if (command === 'clear') this.terminalOutput = []; else this.terminalOutput = [...this.terminalOutput, `$ ${command}`, responses[command] ?? `Comando no encontrado: ${command}. Probá “help”.`]; if (command === 'contact') { this.terminalOpen = false; this.scrollTo('contacto'); } if (command === 'projects') { this.terminalOpen = false; this.scrollTo('proyectos'); } if (command === 'about') { this.terminalOpen = false; this.scrollTo('perfil'); } if (command === 'github') window.open('https://github.com/FrancoVivass', '_blank', 'noopener'); this.terminalCommand = ''; }
  private async loadGithub(): Promise<void> { try { const response = await fetch('https://api.github.com/users/FrancoVivass/repos?per_page=100&sort=updated'); if (!response.ok) return; const repos: Array<{ name: string; language: string | null; fork: boolean }> = await response.json(); const original = repos.filter(repo => !repo.fork); this.github = { repos: original.length, languages: new Set(original.map(repo => repo.language).filter(Boolean)).size, latest: original[0]?.name ?? 'Vestia', loaded: true }; } catch { /* Static verified fallback remains visible. */ } }
  whatsappLink(): string { const value = this.contactForm.getRawValue(); const service = this.services.find(item => item.value === value.service)?.title ?? 'un proyecto'; const features = [value.admin && 'panel administrativo', value.database && 'base de datos y usuarios', value.payments && 'pagos online'].filter(Boolean).join(', '); const message = `Hola Franco, soy ${value.name || '...'}${value.company ? ` de ${value.company}` : ''}. Quiero consultar presupuesto por ${service}${features ? ` con ${features}` : ''}. ${value.message || ''}`; return `https://wa.me/542245421367?text=${encodeURIComponent(message)}`; }
  async submit(): Promise<void> { this.contactForm.markAllAsTouched(); if (this.contactForm.invalid || this.contactForm.value.website) return; this.sending = true; this.submitError = ''; try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.contactForm.getRawValue()) }); if (!response.ok) throw new Error(); this.sent = true; this.contactForm.reset({ service: 'landing', admin: false, database: false, payments: false }); } catch { this.submitError = 'El envío por email todavía no está disponible. Podés continuar por WhatsApp.'; } finally { this.sending = false; } }
}
