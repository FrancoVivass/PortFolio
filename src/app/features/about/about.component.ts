import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/components/card/card.component';
import { CardFlip3dComponent } from '@shared/components/card-flip-3d/card-flip-3d.component';
import { ScrollRevealComponent } from '@shared/components/scroll-reveal/scroll-reveal.component';
import { Scroll3dBackgroundComponent } from '@shared/components/scroll-3d-background/scroll-3d-background.component';
import { DataService, Skill, PersonalInfo } from '@core/services/data.service';

/**
 * Componente de la página Sobre Mí
 * Muestra información personal, skills y formación
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardComponent, CardFlip3dComponent, ScrollRevealComponent, Scroll3dBackgroundComponent],
  template: `
    <!-- Auriculares 3D GIGANTES en el FONDO -->
    <app-scroll-3d-background 
      modelPath="assets/models/auriculares_para_pilotos_a30_de_b_ose.glb"
      sectionId="about-page"
      [initialRotation]="{ x: 0.3, y: 0.5, z: 0 }"
      [scaleSize]="20"
    />
    
    <div id="about-page" class="min-h-screen content-wrapper">
      <!-- Header Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="text-center mb-16 animate-fade-in">
            <h1 class="heading-1 text-gradient mb-6">Sobre Mí</h1>
            <p class="text-xl text-text-secondary dark:text-dark-text max-w-3xl mx-auto">
              Desarrollador fullstack apasionado por la tecnología y el diseño
            </p>
          </div>

          <!-- Bio Section -->
          <div class="max-w-4xl mx-auto mb-20">
            <app-card variant="glass" padding="lg" [hover3d]="true">
              <div class="grid md:grid-cols-3 gap-8 items-center">
                <div class="md:col-span-1 flex justify-center">
                  <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-accent-cyan/30 shadow-xl">
                    <div class="w-full h-full bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 flex items-center justify-center">
                      <svg class="w-24 h-24 text-accent-cyan/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="md:col-span-2 space-y-4">
                  <h2 class="text-3xl font-bold">{{ personalInfo()?.name || 'Tu Nombre' }}</h2>
                  <p class="text-accent-cyan text-lg font-semibold">{{ personalInfo()?.title }}</p>
                  <p class="text-text-secondary dark:text-dark-text leading-relaxed">
                    {{ personalInfo()?.bio }}
                  </p>
                  
                  <div class="flex flex-wrap gap-4 pt-4">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span class="text-sm">{{ personalInfo()?.location }}</span>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-sm">{{ personalInfo()?.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </app-card>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="section-padding bg-light-surface dark:bg-dark-surface">
        <div class="container-custom">
          <app-scroll-reveal animation="slide-up">
            <div class="text-center mb-12">
              <h2 class="heading-2 mb-4">Habilidades Técnicas</h2>
              <p class="text-text-secondary dark:text-dark-text">Tecnologías y herramientas que domino</p>
            </div>
          </app-scroll-reveal>

          <!-- Skills por categoría -->
          @for (category of ['frontend', 'backend', 'tools', 'design']; track category) {
            <div class="mb-12">
              <h3 class="text-2xl font-bold mb-6 capitalize">
                {{ getCategoryName(category) }}
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (skill of getSkillsByCategory(category); track skill.name; let i = $index) {
                  <app-scroll-reveal 
                    [animation]="i % 2 === 0 ? 'slide-left' : 'slide-right'" 
                    [delay]="i * 100"
                  >
                    <app-card variant="glass" padding="md" [hover3d]="true">
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <span class="text-3xl">{{ skill.icon }}</span>
                            <h4 class="font-semibold text-lg">{{ skill.name }}</h4>
                          </div>
                          <span class="text-accent-cyan font-bold">{{ skill.level }}%</span>
                        </div>
                        
                        <!-- Barra de progreso -->
                        <div class="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2 overflow-hidden">
                          <div 
                            class="h-full bg-gradient-to-r from-accent-violet to-accent-cyan rounded-full transition-all duration-1000"
                            [style.width.%]="skill.level"
                          ></div>
                        </div>
                      </div>
                    </app-card>
                  </app-scroll-reveal>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Stats Section con Cartas 3D -->
      <section class="section-padding">
        <div class="container-custom">
          <app-scroll-reveal animation="slide-up">
            <div class="text-center mb-12">
              <h2 class="heading-2 mb-4">Mis Logros</h2>
              <p class="text-text-secondary dark:text-dark-text">Click en las cartas para más detalles</p>
            </div>
          </app-scroll-reveal>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (stat of stats; track stat.label; let i = $index) {
              <app-scroll-reveal [animation]="'flip'" [delay]="i * 150">
                <app-card-flip-3d
                  [icon]="getStatIcon(i)"
                  [title]="stat.value"
                  [subtitle]="stat.label"
                  [description]="getStatDescription(i)"
                  [stat1Value]="getStatDetail1(i)"
                  [stat1Label]="'Nivel'"
                  [stat2Value]="getStatDetail2(i)"
                  [stat2Label]="'Progreso'"
                />
              </app-scroll-reveal>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .content-wrapper {
      position: relative;
      z-index: 10;
    }
    
    :host {
      display: block;
    }
  `]
})
export class AboutComponent implements OnInit {
  public personalInfo = signal<PersonalInfo | null>(null);
  public skills = signal<Skill[]>([]);

  public stats = [
    { value: '3+', label: 'Años Desarrollando' },
    { value: '10+', label: 'Proyectos Completados' },
    { value: '5+', label: 'Clientes Satisfechos' },
    { value: '12+', label: 'Tecnologías Dominadas' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPersonalInfo().subscribe(info => {
      this.personalInfo.set(info);
    });

    this.dataService.getSkills().subscribe(skills => {
      this.skills.set(skills);
    });
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills().filter(skill => skill.category === category);
  }

  getCategoryName(category: string): string {
    const names: Record<string, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Herramientas',
      design: 'Diseño'
    };
    return names[category] || category;
  }

  getStatIcon(index: number): string {
    const icons = ['📅', '💼', '👥', '🚀'];
    return icons[index] || '⭐';
  }

  getStatDescription(index: number): string {
    const descriptions = [
      'Años de experiencia desarrollando proyectos web con tecnologías modernas y frameworks actuales.',
      'Proyectos completados exitosamente con diferentes tecnologías y requerimientos diversos.',
      'Clientes satisfechos que confían en mi trabajo y siguen contratando mis servicios.',
      'Tecnologías y herramientas que domino para crear soluciones completas y profesionales.'
    ];
    return descriptions[index] || 'Estadística importante del portafolio';
  }

  getStatDetail1(index: number): string {
    const details = ['⭐⭐⭐', '💯%', '😊😊😊', 'Pro'];
    return details[index] || '---';
  }

  getStatDetail2(index: number): string {
    const progress = ['▰▰▰▱', '▰▰▰▰', '▰▰▰▱', '▰▰▰▰'];
    return progress[index] || '---';
  }
}

