import { Component, OnInit, AfterViewInit, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService, Project } from '@core/services/data.service';
import { GsapService } from '@core/services/gsap.service';
import { Scroll3dBackgroundComponent } from '@shared/components/scroll-3d-background/scroll-3d-background.component';

/**
 * Componente Proyectos con diseño cinematográfico
 * Estilo Apple/ASUS ROG con efectos avanzados
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, Scroll3dBackgroundComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  public projects = signal<Project[]>([]);
  public selectedFilter = signal<string>('all');
  public selectedProject = signal<Project | null>(null);

  public categories = [
    { value: 'angular', label: 'Angular' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'ui-ux', label: 'UI/UX' }
  ];

  public filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === filter);
  });

  constructor(
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.gsapService.fadeInOnScroll('.showcase-item', { stagger: 0.15 });
    }, 500);
  }

  setFilter(filter: string): void {
    this.selectedFilter.set(filter);
    
    // Re-animar cuando cambia el filtro
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.gsapService.fadeInOnScroll('.showcase-item', { stagger: 0.15 });
      }
    }, 100);
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
  }

  getCategoryLabel(category: string): string {
    const cat = this.categories.find(c => c.value === category);
    return cat ? cat.label : category;
  }
}
