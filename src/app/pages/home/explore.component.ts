import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Work = { name: string; description: string; result: string; tech: string[]; status: string; repo?: string };
@Component({selector: 'app-explore', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './explore.component.html', styleUrl: './explore.component.scss'})
export class ExploreComponent {
  @Input() projects: Work[] = [];
  @Output() openProject = new EventEmitter<string>();
  tab = 'Escritorio';
  readonly tabs = ['Escritorio', 'Conexiones', 'Debugging', 'Responsive', 'Decisiones', 'Mapa', 'Evolución'];
  windows = [{name: 'Proyectos', open: true, x: 4, y: 5, z: 1}, {name: 'Perfil', open: true, x: 48, y: 20, z: 2}, {name: 'Contacto', open: false, x: 28, y: 38, z: 3}];
  top = 3;
  private drag?: {index: number; x: number; y: number; startX: number; startY: number; width: number; height: number};
  startMove(event: PointerEvent, index: number): void {
    if ((event.target as HTMLElement).closest('button')) return;
    const header = event.currentTarget as HTMLElement;
    const area = header.closest('.desktop')!.getBoundingClientRect();
    header.setPointerCapture(event.pointerId);
    this.windows[index].z = ++this.top;
    this.drag = { index, x: event.clientX, y: event.clientY, startX: this.windows[index].x, startY: this.windows[index].y, width: area.width, height: area.height };
  }
  move(event: PointerEvent): void {
    if (!this.drag) return;
    const d = this.drag, w = this.windows[d.index];
    w.x = Math.max(0, Math.min(50, d.startX + (event.clientX - d.x) / d.width * 100));
    w.y = Math.max(0, Math.min(45, d.startY + (event.clientY - d.y) / d.height * 100));
  }
  stopMove(): void { this.drag = undefined; }
  arrange(): void { this.windows.forEach((w, i) => { w.x = 4 + i * 22; w.y = 5 + i * 14; }); }
  modules = ['Usuarios', 'Ventas', 'Stock', 'Reportes']; nodes: string[] = []; wiring = false;
  addNode(name: string): void { if (this.modules.includes(name) && !this.nodes.includes(name)) this.nodes = [...this.nodes, name]; this.wiring = false; }
  drop(event: DragEvent): void { event.preventDefault(); this.addNode(event.dataTransfer?.getData('text/plain') || ''); }
  beginNode(event: DragEvent, name: string): void { event.dataTransfer?.setData('text/plain', name); }
  bugs = [false, false, false];
  get fixed(): number { return this.bugs.filter(Boolean).length; }
  deviceWidth = 720;
  problem = ''; priority = ''; decision = 'simple'; mapTech = 'Todos'; historyIndex = 0; slide = 0;
  readonly history = [
    {title: 'Acceso por teclado', hash: '0f101cc', detail: 'El enlace para saltar al contenido aparece al recibir foco.'},
    {title: 'Experiencia interactiva', hash: '6cc96e9', detail: 'Se incorporan terminal, animaciones y selector de audiencia.'},
    {title: 'Arquitectura visible', hash: '398f8eb', detail: 'Explorador de los componentes de cada sistema.'},
    {title: 'Casos de estudio', hash: '7ddef5b', detail: 'Más contexto sobre los problemas y las soluciones.'},
    {title: 'Consulta personalizada', hash: 'e252b2c', detail: 'Los precios públicos dan lugar a una consulta por alcance.'}
  ];
  get mapTechnologies(): string[] { return ['Todos', ...new Set(this.projects.flatMap(p => p.tech))]; }
  get matchingProjects(): Work[] { return this.projects.filter(p => this.mapTech === 'Todos' || p.tech.includes(this.mapTech)); }
  get recommendation(): string { return this.problem === 'Organizar operaciones' ? (this.priority === 'Crecer por etapas' ? 'Empezar con stock y usuarios; sumar reportes cuando el flujo esté validado.' : 'Definir roles, inventario y reportes juntos antes de desarrollar.') : (this.priority === 'Crecer por etapas' ? 'Comenzar con una web enfocada en consultas y ampliarla con datos reales de uso.' : 'Diseñar un sitio con contenido, navegación y contacto alineados desde el inicio.'); }
  get storyLink(): string { return 'https://wa.me/542245421367?text=' + encodeURIComponent(`Hola Franco, quiero consultar presupuesto. Mi objetivo: ${this.problem}. Mi prioridad: ${this.priority}.`); }
  nextSlide(delta: number): void { this.slide = Math.max(0, Math.min(this.projects.length - 1, this.slide + delta)); }
}
