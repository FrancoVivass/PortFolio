import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting: boolean = false;
  status: string = '';
  whatsLink: string = '';

  constructor(private fb: FormBuilder, private title: Title, private meta: Meta) {
    this.title.setTitle('Contacto — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'Formulario de contacto para proyectos web, interfaces modernas y animaciones.' });
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      company: [''] // honeypot
    });

    // Build WhatsApp smart link with UTM and page context
    const number = '+542245421367';
    const context = encodeURIComponent(`Hola Franco, vengo desde la página ${location.pathname}. Quiero hablar sobre un proyecto.`);
    const utm = 'utm_source=portfolio&utm_medium=cta&utm_campaign=whatsapp';
    this.whatsLink = `https://wa.me/${number.replace(/\D/g, '')}?text=${context}&${utm}`;
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.contactForm.get('company')?.value) {
      this.status = 'Por favor, revisá los campos.';
      return;
    }
    this.isSubmitting = true;
    this.status = 'Enviando...';
    // Aquí iría el envío real (EmailJS/Resend/etc.)
    setTimeout(() => {
      this.isSubmitting = false;
      this.status = 'Mensaje enviado. ¡Gracias!';
    }, 900);
  }
}
