import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

type Project = { name: string; eyebrow: string; description: string; result: string; tech: string[]; status: string; repo?: string; live?: string };

@Component({ selector: 'app-home', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './home.component.html', styleUrl: './home.component.scss' })
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly host = inject(ElementRef<HTMLElement>);
  private bootTimer?: ReturnType<typeof setTimeout>;
  menuOpen = false; scrolled = false; sending = false; sent = false; submitError = ''; estimate = 250000;
  booting = true; terminalOpen = false; audience: 'client' | 'recruiter' = 'client'; progress = 0;
  readonly projects: Project[] = [
    { name: 'AS Academic System', eyebrow: 'Proyecto final · 2025—2026', description: 'Una plataforma académica integral para reemplazar planillas, registros manuales y procesos duplicados.', result: 'Centraliza alumnos, docentes, cursos, notas, asistencia, correlatividades, eventos, reportes y permisos por rol.', tech: ['Angular', 'Supabase', 'PostgreSQL', 'Cloudflare'], status: 'Versión funcional terminada', repo: 'https://github.com/FrancoVivass/AS-Academic-System' },
    { name: 'Vestia', eyebrow: 'Producto propio · 2026', description: 'Gestión comercial pensada para locales de indumentaria, desde una única operación hasta múltiples comercios.', result: 'Organiza stock, ventas, propietarios, códigos de barras, impresión, cobros y administración desde un solo lugar.', tech: ['Angular', 'Supabase', 'Tailwind', 'PostgreSQL'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/Vestia' },
    { name: 'Retake', eyebrow: 'Plataforma personal · 2026', description: 'Una experiencia digital que reúne noticias, mercado e información relevante del ecosistema Counter-Strike 2.', result: 'Explora integración de datos públicos, arquitectura frontend y una interfaz construida para una comunidad específica.', tech: ['Angular', 'TypeScript', 'APIs públicas'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/retake' },
    { name: 'Centro Universitario de Dolores', eyebrow: 'Web institucional', description: 'Sitio institucional moderno para comunicar carreras, docentes, reservas, novedades y vías de contacto.', result: 'Navegación responsive, filtros, páginas de detalle, formularios e integración con servicios externos.', tech: ['Angular', 'TypeScript', 'CSS'], status: 'Proyecto avanzado', repo: 'https://github.com/FrancoVivass/PaginaDeCentro' },
    { name: 'Manijeada', eyebrow: 'Juego social', description: 'Experiencia multijugador para reuniones que conecta celulares mediante salas y códigos QR.', result: 'Incluye anfitrión, jugadores, impostor, ruleta, retos, logros y diferentes modos de juego.', tech: ['Angular', 'Supabase', 'Realtime'], status: 'En desarrollo', repo: 'https://github.com/FrancoVivass/manijeada-arg', live: 'https://manijeadarg.vercel.app' },
    { name: 'Simulaciones Monte Carlo', eyebrow: 'Proyecto académico', description: 'Herramienta de simulación probabilística para experimentar, visualizar escenarios y analizar resultados.', result: 'Convierte conceptos estadísticos en una experiencia web interactiva y fácil de explorar.', tech: ['JavaScript', 'Simulación', 'Visualización'], status: 'Terminado', repo: 'https://github.com/FrancoVivass/Simulaciones-MonteCarlo' }
  ];
  readonly services = [
    { value: 'landing', title: 'Landing page', price: 250000, time: '5—10 días', copy: 'Una página enfocada en presentar una propuesta y convertir visitas en consultas.', includes: 'Diseño a medida, responsive, formulario, SEO base y publicación.' },
    { value: 'institutional', title: 'Sitio institucional', price: 450000, time: '1—3 semanas', copy: 'Una presencia profesional para empresas, instituciones y servicios.', includes: 'Hasta 6 secciones, analítica, SEO base y contacto.' },
    { value: 'catalog', title: 'Catálogo digital', price: 700000, time: '2—4 semanas', copy: 'Productos o servicios organizados con búsqueda, filtros y consultas.', includes: 'Catálogo autogestionable, panel base e integración con WhatsApp.' },
    { value: 'system', title: 'Sistema a medida', price: 1500000, time: 'Según alcance', copy: 'Procesos, datos y equipos conectados en una herramienta propia.', includes: 'Análisis, UX/UI, roles, base de datos, desarrollo y despliegue.' }
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
  readonly contactForm = this.fb.group({ name: ['', [Validators.required, Validators.minLength(2)]], company: [''], email: ['', [Validators.required, Validators.email]], phone: [''], service: ['landing', Validators.required], budget: ['$250.000—$500.000 ARS'], deadline: [''], message: ['', [Validators.required, Validators.minLength(20)]], website: [''] });
  constructor(title: Title, meta: Meta) { title.setTitle('Franco Vivas — Analista de Sistemas y Desarrollador Full-Stack'); meta.updateTag({ name: 'description', content: 'Desarrollo páginas web, sistemas de gestión y aplicaciones a medida para transformar procesos reales en soluciones simples.' }); }
  ngAfterViewInit(): void { this.bootTimer = setTimeout(() => this.booting = false, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1900); }
  ngOnDestroy(): void { if (this.bootTimer) clearTimeout(this.bootTimer); }
  @HostListener('window:scroll') onScroll(): void { this.scrolled = window.scrollY > 24; const max = document.documentElement.scrollHeight - innerHeight; this.progress = max > 0 ? Math.min(100, (scrollY / max) * 100) : 0; }
  @HostListener('document:mousemove', ['$event']) onPointerMove(event: MouseEvent): void { this.host.nativeElement.style.setProperty('--pointer-x', `${event.clientX}px`); this.host.nativeElement.style.setProperty('--pointer-y', `${event.clientY}px`); }
  @HostListener('document:keydown.escape') closeTerminal(): void { this.terminalOpen = false; }
  updateEstimate(): void { this.estimate = this.services.find(item => item.value === this.contactForm.value.service)?.price ?? 250000; }
  scrollTo(id: string): void { this.menuOpen = false; document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
  selectAudience(value: 'client' | 'recruiter'): void { this.audience = value; if (value === 'recruiter') this.scrollTo('perfil'); }
  tilt(event: MouseEvent): void { const card = event.currentTarget as HTMLElement; const rect = card.getBoundingClientRect(); const x = ((event.clientX - rect.left) / rect.width - .5) * 5; const y = ((event.clientY - rect.top) / rect.height - .5) * -5; card.style.setProperty('--rx', `${y}deg`); card.style.setProperty('--ry', `${x}deg`); }
  resetTilt(event: MouseEvent): void { const card = event.currentTarget as HTMLElement; card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
  whatsappLink(): string { const value = this.contactForm.getRawValue(); const service = this.services.find(item => item.value === value.service)?.title ?? 'un proyecto'; const message = `Hola Franco, soy ${value.name || '...'}${value.company ? ` de ${value.company}` : ''}. Quiero consultar por ${service}. Presupuesto estimado: ${value.budget || 'a definir'}. ${value.message || ''}`; return `https://wa.me/542245421367?text=${encodeURIComponent(message)}`; }
  async submit(): Promise<void> { this.contactForm.markAllAsTouched(); if (this.contactForm.invalid || this.contactForm.value.website) return; this.sending = true; this.submitError = ''; try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.contactForm.getRawValue()) }); if (!response.ok) throw new Error(); this.sent = true; this.contactForm.reset({ service: 'landing', budget: '$250.000—$500.000 ARS' }); } catch { this.submitError = 'El envío por email todavía no está disponible. Podés continuar por WhatsApp.'; } finally { this.sending = false; } }
}
