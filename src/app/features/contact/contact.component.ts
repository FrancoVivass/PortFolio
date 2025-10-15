import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '@shared/components/card/card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Scroll3dBackgroundComponent } from '@shared/components/scroll-3d-background/scroll-3d-background.component';

/**
 * Componente de la página de Contacto
 * Formulario de contacto con validaciones y mapa
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, Scroll3dBackgroundComponent],
  template: `
    <!-- iPhone 3D GIGANTE en el FONDO -->
    <app-scroll-3d-background 
      modelPath="assets/models/iphone_14_pro.glb"
      sectionId="contact-page"
      [initialRotation]="{ x: 0.2, y: 0.3, z: 0 }"
      [scaleSize]="20"
    />
    
    <div id="contact-page" class="min-h-screen section-padding content-wrapper">
      <div class="container-custom">
        <!-- Header -->
        <div class="text-center mb-12 animate-fade-in">
          <h1 class="heading-1 text-gradient mb-6">Contacto</h1>
          <p class="text-xl text-text-secondary dark:text-dark-text max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Formulario de contacto -->
          <div class="animate-slide-in">
            <app-card variant="glass" padding="lg">
              <h2 class="text-2xl font-bold mb-6">Envíame un mensaje</h2>

              @if (successMessage()) {
                <div class="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500">
                  {{ successMessage() }}
                </div>
              }

              @if (errorMessage()) {
                <div class="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500">
                  {{ errorMessage() }}
                </div>
              }

              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <!-- Nombre -->
                <div>
                  <label for="name" class="block text-sm font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    class="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border focus:border-accent-cyan focus:outline-none transition-colors"
                    [class.border-red-500]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                  />
                  @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                    <p class="mt-1 text-sm text-red-500">El nombre es requerido</p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border focus:border-accent-cyan focus:outline-none transition-colors"
                    [class.border-red-500]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                  />
                  @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                    <p class="mt-1 text-sm text-red-500">
                      {{ contactForm.get('email')?.hasError('required') ? 'El email es requerido' : 'Email inválido' }}
                    </p>
                  }
                </div>

                <!-- Asunto -->
                <div>
                  <label for="subject" class="block text-sm font-medium mb-2">
                    Asunto *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    formControlName="subject"
                    class="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border focus:border-accent-cyan focus:outline-none transition-colors"
                    [class.border-red-500]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched"
                  />
                  @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
                    <p class="mt-1 text-sm text-red-500">El asunto es requerido</p>
                  }
                </div>

                <!-- Mensaje -->
                <div>
                  <label for="message" class="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="6"
                    class="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border focus:border-accent-cyan focus:outline-none transition-colors resize-none"
                    [class.border-red-500]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                  ></textarea>
                  @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                    <p class="mt-1 text-sm text-red-500">El mensaje es requerido (mínimo 10 caracteres)</p>
                  }
                </div>

                <!-- Botón de envío -->
                <app-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  [disabled]="contactForm.invalid || isSubmitting()"
                  [loading]="isSubmitting()"
                  class="w-full"
                >
                  {{ isSubmitting() ? 'Enviando...' : 'Enviar Mensaje' }}
                </app-button>
              </form>
            </app-card>
          </div>

          <!-- Información de contacto -->
          <div class="space-y-6 animate-fade-in" style="animation-delay: 0.2s;">
            <!-- Info cards -->
            <app-card variant="glass" padding="lg" [hover3d]="true">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Email</h3>
                  <a href="mailto:francovivasa@gmail.com" class="text-accent-cyan hover:underline">
                    francovivasa&#64;gmail.com
                  </a>
                </div>
              </div>
            </app-card>

            <app-card variant="glass" padding="lg" [hover3d]="true">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Ubicación</h3>
                  <p class="text-text-secondary dark:text-dark-text">Dolores, Buenos Aires, Argentina</p>
                </div>
              </div>
            </app-card>

            <app-card variant="glass" padding="lg" [hover3d]="true">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1">Teléfono</h3>
                  <a href="tel:+542245123456" class="text-accent-cyan hover:underline">
                    +54 2245 123456
                  </a>
                </div>
              </div>
            </app-card>

            <!-- Redes sociales -->
            <app-card variant="gradient" padding="lg">
              <h3 class="font-semibold mb-4">Sígueme en redes sociales</h3>
              <div class="flex gap-4">
              @for (social of socialLinks; track social.name) {
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center hover:bg-accent-cyan hover:text-white text-light-text dark:text-dark-text transition-all duration-300 transform hover:scale-110"
                  [attr.aria-label]="social.name"
                  [attr.title]="social.name"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path [attr.d]="social.path" />
                  </svg>
                </a>
              }
              </div>
            </app-card>

            <!-- Mapa placeholder -->
            <app-card variant="glass" padding="none">
              <div class="h-64 bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-16 h-16 text-accent-cyan/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  <p class="text-text-secondary dark:text-dark-text">Mapa interactivo</p>
                </div>
              </div>
            </app-card>
          </div>
        </div>
      </div>
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
export class ContactComponent implements OnInit {
  public contactForm!: FormGroup;
  public isSubmitting = signal<boolean>(false);
  public successMessage = signal<string>('');
  public errorMessage = signal<string>('');

  public socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/FrancoVivass',
      path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/franco-vivas-ab915628a/',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/francovivass',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/fran.vivas_ok/',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    try {
      // Simulación de envío (en producción, conectar con EmailJS o API backend)
      await this.simulateEmailSend();
      
      this.successMessage.set('¡Mensaje enviado con éxito! Te responderé pronto.');
      this.contactForm.reset();
    } catch (error) {
      this.errorMessage.set('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private simulateEmailSend(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm.value);
        resolve();
      }, 2000);
    });
  }
}

