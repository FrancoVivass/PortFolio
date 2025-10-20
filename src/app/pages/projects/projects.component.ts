import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsComponent implements AfterViewInit {
  activeFilter = 'all';

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Proyectos — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'Proyectos destacados: Centro Universitario de Dolores, Simón dice, VR de planetas, Fastbook.' });
  }

  projects = [
    {
      title: 'Centro Universitario de Dolores',
      desc: 'Sitio institucional para el Centro Universitario en Dolores, Buenos Aires.',
      demo: 'https://www.centrouniversitariodolores.com',
      repo: null
    },
    {
      title: 'Juego web: Simón dice',
      desc: 'Juego web interactivo con lógica de secuencias y efectos visuales.',
      demo: 'https://juego-simon-dice-liart.vercel.app/',
      repo: 'https://github.com/FrancoVivass/JuegoSimonDice'
    },
    {
      title: 'VR de planetas',
      desc: 'Experiencia VR/WebXR para explorar planetas de forma inmersiva.',
      demo: 'https://vr-trabajo.vercel.app/',
      repo: 'https://github.com/FrancoVivass/VR-TRABAJO'
    },
    {
      title: 'Fastbook — Programa de contabilidad (en desarrollo)',
      desc: 'Aplicación web de contabilidad con foco en productividad y claridad.',
      demo: null,
      repo: 'https://github.com/FrancoVivass/Fastbook'
    }
  ];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Pin behavior adapted to viewport
    ScrollTrigger.matchMedia({
      // desktop/tablet
      '(min-width: 861px)': () => {
        ScrollTrigger.create({
          trigger: '.projects .container',
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: true,
        });
      },
      // mobile: shorter pin to reduce glitches
      '(max-width: 860px)': () => {
        ScrollTrigger.create({
          trigger: '.projects .container',
          start: 'top top',
          end: '+=800',
          pin: true,
          scrub: true,
        });
      }
    });

    // Animate cards sequentially as user scrolls during the pinned section
    const cards = gsap.utils.toArray<HTMLElement>('.projects .card');
    gsap.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.98,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects .container',
        start: 'top top',
        end: '+=1600',
        scrub: true,
      },
    });
  }

  onCardMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const inner = card.querySelector('.inner') as HTMLElement;
    if (!inner) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -8; // rotateX range
    const ry = ((x / rect.width) - 0.5) * 8;  // rotateY range
    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

    const glow = card.querySelector('.glow') as HTMLElement;
    if (glow) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glow.style.background = `radial-gradient(80% 60% at ${gx}% ${gy - 20}%, rgba(176,138,255,.28), transparent 60%)`;
    }
  }

  onCardLeave(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const inner = card.querySelector('.inner') as HTMLElement;
    if (inner) inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
