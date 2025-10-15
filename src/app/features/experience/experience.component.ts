import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { DataService, Experience } from '@core/services/data.service';

/**
 * Componente de la página de Experiencia
 * Timeline vertical con experiencia laboral y educación
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="min-h-screen section-padding">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-16 animate-fade-in">
          <h1 class="heading-1 text-gradient mb-6">Experiencia & Educación</h1>
          <p class="text-xl text-text-secondary dark:text-dark-text max-w-3xl mx-auto">
            Mi trayectoria profesional y formación académica
          </p>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center gap-4 mb-12">
          <button
            (click)="selectedTab.set('all')"
            [class.bg-gradient-to-r]="selectedTab() === 'all'"
            [class.from-accent-violet]="selectedTab() === 'all'"
            [class.to-accent-cyan]="selectedTab() === 'all'"
            [class.text-white]="selectedTab() === 'all'"
            [class.bg-dark-surface]="selectedTab() !== 'all'"
            class="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Todo
          </button>
          
          <button
            (click)="selectedTab.set('work')"
            [class.bg-gradient-to-r]="selectedTab() === 'work'"
            [class.from-accent-violet]="selectedTab() === 'work'"
            [class.to-accent-cyan]="selectedTab() === 'work'"
            [class.text-white]="selectedTab() === 'work'"
            [class.bg-dark-surface]="selectedTab() !== 'work'"
            class="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Experiencia
          </button>
          
          <button
            (click)="selectedTab.set('education')"
            [class.bg-gradient-to-r]="selectedTab() === 'education'"
            [class.from-accent-violet]="selectedTab() === 'education'"
            [class.to-accent-cyan]="selectedTab() === 'education'"
            [class.text-white]="selectedTab() === 'education'"
            [class.bg-dark-surface]="selectedTab() !== 'education'"
            class="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Educación
          </button>
        </div>

        <!-- Timeline -->
        <div class="max-w-4xl mx-auto relative">
          <!-- Línea vertical -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-electric"></div>

          <!-- Items del timeline -->
          <div class="space-y-12">
            @for (item of getFilteredExperience(); track item.id; let isOdd = $odd) {
              <div 
                class="relative animate-fade-in"
                [style.animation-delay]="($index * 0.15) + 's'"
                [class.md:ml-auto]="isOdd"
                [class.md:pl-12]="isOdd"
                [class.md:pr-12]="!isOdd"
                [class.md:text-right]="!isOdd"
                class="md:w-1/2 pl-20 md:pl-0"
              >
                <!-- Punto en la línea -->
                <div 
                  class="absolute top-0 w-4 h-4 rounded-full bg-accent-cyan border-4 border-dark-bg shadow-lg"
                  [class.left-6]="!isOdd || true"
                  [class.md:left-auto]="isOdd"
                  [class.md:-right-2]="isOdd"
                  [class.md:-left-2]="!isOdd"
                ></div>

                <!-- Tarjeta de experiencia -->
                <app-card variant="glass" padding="lg" [hover3d]="true">
                  <div class="space-y-4">
                    <!-- Icono -->
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan">
                      @if (item.icon === 'briefcase') {
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      } @else if (item.icon === 'academic-cap') {
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                        </svg>
                      } @else {
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                      }
                    </div>

                    <!-- Periodo -->
                    <div class="text-accent-cyan font-semibold">{{ item.period }}</div>

                    <!-- Cargo y empresa -->
                    <div>
                      <h3 class="text-xl font-bold mb-1">{{ item.position }}</h3>
                      <p class="text-text-secondary dark:text-dark-text font-medium">{{ item.company }}</p>
                    </div>

                    <!-- Descripción -->
                    <p class="text-text-secondary dark:text-dark-text leading-relaxed">
                      {{ item.description }}
                    </p>

                    <!-- Tecnologías -->
                    @if (item.technologies.length > 0) {
                      <div class="flex flex-wrap gap-2">
                        @for (tech of item.technologies; track tech) {
                          <span class="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    }
                  </div>
                </app-card>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ExperienceComponent implements OnInit {
  public experience = signal<Experience[]>([]);
  public selectedTab = signal<'all' | 'work' | 'education'>('all');

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getExperience().subscribe(exp => {
      this.experience.set(exp);
    });
  }

  getFilteredExperience(): Experience[] {
    const tab = this.selectedTab();
    if (tab === 'all') {
      return this.experience();
    }
    return this.experience().filter(e => e.type === tab);
  }
}

