import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@shared/components/card/card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DataService, BlogPost } from '@core/services/data.service';

/**
 * Componente de la página de Blog
 * Lista de artículos con búsqueda y paginación
 */
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="min-h-screen section-padding">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-12 animate-fade-in">
          <h1 class="heading-1 text-gradient mb-6">Blog</h1>
          <p class="text-xl text-text-secondary dark:text-dark-text max-w-3xl mx-auto">
            Artículos sobre desarrollo web, tecnología y buenas prácticas
          </p>
        </div>

        <!-- Barra de búsqueda -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchChange()"
              placeholder="Buscar artículos..."
              class="w-full px-6 py-4 pl-12 rounded-xl bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border focus:border-accent-cyan focus:outline-none transition-colors"
            />
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <!-- Grid de posts -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (post of filteredPosts(); track post.id) {
            <div class="animate-fade-in" [style.animation-delay]="($index * 0.1) + 's'">
              <app-card variant="glass" padding="none" [hover3d]="true">
                <!-- Imagen de portada -->
                <div class="relative h-48 bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 overflow-hidden">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-16 h-16 text-accent-cyan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  </div>
                </div>

                <!-- Contenido -->
                <div class="p-6 space-y-4">
                  <!-- Fecha y tiempo de lectura -->
                  <div class="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text">
                    <span>{{ formatDate(post.date) }}</span>
                    <span>•</span>
                    <span>{{ post.readTime }} min lectura</span>
                  </div>

                  <!-- Título -->
                  <h3 class="text-xl font-bold line-clamp-2">{{ post.title }}</h3>

                  <!-- Excerpt -->
                  <p class="text-sm text-text-secondary dark:text-dark-text line-clamp-3">
                    {{ post.excerpt }}
                  </p>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2">
                    @for (tag of post.tags.slice(0, 3); track tag) {
                      <span class="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full">
                        {{ tag }}
                      </span>
                    }
                  </div>

                  <!-- Leer más -->
                  <button
                    (click)="openPostModal(post)"
                    class="text-accent-cyan hover:underline font-semibold text-sm flex items-center gap-2"
                  >
                    Leer más
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </app-card>
            </div>
          } @empty {
            <div class="col-span-full text-center py-12">
              <p class="text-text-secondary dark:text-dark-text text-lg">
                No se encontraron artículos
              </p>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Modal de post -->
    @if (selectedPost()) {
      <div 
        class="modal-backdrop animate-fade-in"
        (click)="closePostModal()"
      >
        <div 
          class="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] overflow-y-auto z-50 animate-scale-in"
          (click)="$event.stopPropagation()"
        >
          <app-card variant="glass" padding="lg">
            <!-- Close button -->
            <button
              (click)="closePostModal()"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500 text-white transition-colors flex items-center justify-center z-10"
              aria-label="Cerrar"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Contenido del post -->
            <article class="prose prose-lg dark:prose-invert max-w-none">
              <h1 class="text-3xl font-bold mb-4">{{ selectedPost()!.title }}</h1>
              
              <div class="flex items-center gap-4 text-sm text-text-secondary dark:text-dark-text mb-6">
                <span>Por {{ selectedPost()!.author }}</span>
                <span>•</span>
                <span>{{ formatDate(selectedPost()!.date) }}</span>
                <span>•</span>
                <span>{{ selectedPost()!.readTime }} min lectura</span>
              </div>

              <div class="mb-6">
                @for (tag of selectedPost()!.tags; track tag) {
                  <span class="inline-block mr-2 mb-2 px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full">
                    {{ tag }}
                  </span>
                }
              </div>

              <div [innerHTML]="selectedPost()!.content" class="text-text-secondary dark:text-dark-text"></div>
            </article>
          </app-card>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BlogComponent implements OnInit {
  public posts = signal<BlogPost[]>([]);
  public filteredPosts = signal<BlogPost[]>([]);
  public selectedPost = signal<BlogPost | null>(null);
  public searchQuery = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getBlogPosts().subscribe(posts => {
      this.posts.set(posts);
      this.filteredPosts.set(posts);
    });
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    if (!query) {
      this.filteredPosts.set(this.posts());
      return;
    }

    const filtered = this.posts().filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    this.filteredPosts.set(filtered);
  }

  openPostModal(post: BlogPost): void {
    this.selectedPost.set(post);
  }

  closePostModal(): void {
    this.selectedPost.set(null);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

