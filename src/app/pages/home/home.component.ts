import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  typewriterTexts = [
    'Me gusta crear experiencias digitales que combinan diseño, innovación y tecnología.',
    'Me gusta crear experiencias digitales que impulsen el crecimiento de tu negocio.',
    'Me gusta crear experiencias digitales que conecten con las personas de manera auténtica.',
    'Me apasiona desarrollar experiencias digitales que resuelvan necesidades reales y generen impacto positivo.',
    'Disfruto diseñar soluciones digitales que aporten valor tangible y superen las expectativas del usuario.',
    'Me motiva construir productos digitales que combinen creatividad y resultados medibles.',
    'Creo experiencias digitales centradas en el usuario que entreguen valor significativo y memorable.',
    'Busco crear experiencias digitales que transformen ideas en soluciones concretas y útiles.',
    'Me apasiona desarrollar experiencias digitales que fusionen innovación, estética y funcionalidad.',
    'Diseño experiencias digitales que generan impacto positivo y fidelizan al cliente.',
    'Me gusta crear soluciones digitales que hagan la vida del usuario más fácil e intuitiva.',
    'Desarrollo experiencias digitales que conectan estrategia, tecnología y necesidades reales.',
    'Mi objetivo es crear productos digitales que no solo sean atractivos, sino también efectivos.',
    'Me encanta transformar desafíos en experiencias digitales innovadoras y valiosas para el usuario.'
  ];
  currentTextIndex = 0;
  currentText = '';
  isTyping = false;
  isDeleting = false;
  typewriterIndex = 0;
  typewriterSpeed = 50;
  deleteSpeed = 30;
  pauseAfterComplete = 2000;
  pauseAfterDelete = 500;

  // Code typewriter properties
  codeLines = [
    "class AnalistaSistemas {",
    "  name = 'Vivas Franco Argelio';",
    "  skills = ['Angular', 'React', 'C#', 'MySQL'];",
    "  passion = 'Diseño e innovación digital';",
    "  experience = 3 + ' años';",
    "}"
  ];
  currentCodeLine = 0;
  currentCodeText = '';
  isCodeTyping = false;
  codeTypewriterIndex = 0;
  codeTypewriterSpeed = 30;
  codeLinePause = 1000;

  private typewriterInterval?: number;
  private codeTypewriterInterval?: number;

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.setSEO();
    // Inicializar estados
    this.isTyping = true;
    this.isDeleting = false;
    this.isCodeTyping = true;
    // Iniciar efectos inmediatamente
    this.startTypewriter();
    this.startCodeTypewriter();
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
    if (this.codeTypewriterInterval) {
      clearInterval(this.codeTypewriterInterval);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  private setSEO() {
    this.title.setTitle('Franco Vivas - Desarrollador Full-Stack | Portfolio');
    
    this.meta.updateTag({ name: 'description', content: 'Desarrollador Full-Stack especializado en Angular, React, Node.js y tecnologías modernas. Creo experiencias digitales excepcionales para impulsar tu negocio.' });
    this.meta.updateTag({ name: 'keywords', content: 'desarrollador full-stack, angular, react, node.js, typescript, portfolio, desarrollo web, aplicaciones móviles' });
    this.meta.updateTag({ name: 'author', content: 'Franco Vivas' });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Franco Vivas - Desarrollador Full-Stack' });
    this.meta.updateTag({ property: 'og:description', content: 'Desarrollador Full-Stack especializado en Angular, React, Node.js y tecnologías modernas.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Franco Vivas - Desarrollador Full-Stack' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Desarrollador Full-Stack especializado en Angular, React, Node.js y tecnologías modernas.' });
  }

  private startTypewriter() {
    this.typewriterInterval = window.setInterval(() => {
      const currentTextToWrite = this.typewriterTexts[this.currentTextIndex];
      
      if (!this.isDeleting) {
        // Typing phase
        if (this.typewriterIndex < currentTextToWrite.length) {
          this.currentText += currentTextToWrite[this.typewriterIndex];
          this.typewriterIndex++;
        } else {
          // Text completed, start deleting after pause
          clearInterval(this.typewriterInterval!);
          setTimeout(() => {
            this.isDeleting = true;
            this.startTypewriter();
          }, this.pauseAfterComplete);
        }
      } else {
        // Deleting phase
        if (this.currentText.length > 0) {
          this.currentText = this.currentText.slice(0, -1);
        } else {
          // Deletion completed, move to next text
          this.isDeleting = false;
          this.typewriterIndex = 0;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
          clearInterval(this.typewriterInterval!);
          setTimeout(() => {
            this.startTypewriter();
          }, this.pauseAfterDelete);
        }
      }
    }, this.isDeleting ? this.deleteSpeed : this.typewriterSpeed);
  }

  private resetTypewriter() {
    // This method is no longer needed with the new logic
  }


  private startCodeTypewriter() {
    this.codeTypewriterInterval = window.setInterval(() => {
      if (this.currentCodeLine < this.codeLines.length) {
        const currentLine = this.codeLines[this.currentCodeLine];
        if (this.codeTypewriterIndex < currentLine.length) {
          this.currentCodeText += currentLine[this.codeTypewriterIndex];
          this.codeTypewriterIndex++;
        } else {
          // Line completed, move to next line
          this.currentCodeText += '\n';
          this.currentCodeLine++;
          this.codeTypewriterIndex = 0;
          // Pause between lines
          clearInterval(this.codeTypewriterInterval!);
          setTimeout(() => {
            this.startCodeTypewriter();
          }, this.codeLinePause);
        }
      } else {
        // All lines completed, stop here (no reset)
        clearInterval(this.codeTypewriterInterval!);
      }
    }, this.codeTypewriterSpeed);
  }

  private initAnimations() {
    // Hero animations
    gsap.fromTo('.hero-badge', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    gsap.fromTo('.hero-title .title-line', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );

    gsap.fromTo('.hero-stats .stat-item', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.7 }
    );

    gsap.fromTo('.hero-actions .btn', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.9 }
    );

    gsap.fromTo('.hero-visual', 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    );

    // Scroll indicator animation
    gsap.fromTo('.scroll-indicator', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.5 }
    );

    // Section animations
    gsap.fromTo('.section-header', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // About section
    gsap.fromTo('.about-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.stat-card', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stat-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.1
      }
    );

    // Services section
    gsap.fromTo('.service-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.service-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.2
      }
    );

    // Projects section
    gsap.fromTo('.project-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
      duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.2
      }
    );

    // Skills section
    gsap.fromTo('.skill-category', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skill-category',
        start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.2
      }
    );

    // Testimonials section
    gsap.fromTo('.testimonial-card', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.2
      }
    );

    // CTA section
    gsap.fromTo('.cta-content', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  scrollToNext() {
    const nextSection = document.querySelector('.about-preview') || document.querySelector('section:not(.hero-section)');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}