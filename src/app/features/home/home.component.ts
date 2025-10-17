import { Component, OnInit, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, PersonalInfo } from '@core/services/data.service';
import { GsapService } from '@core/services/gsap.service';
import { ScrollRevealComponent } from '@shared/components/scroll-reveal/scroll-reveal.component';
import { Scroll3dBackgroundComponent } from '@shared/components/scroll-3d-background/scroll-3d-background.component';

/**
 * Componente Home con ScrollTelling tipo Apple/ASUS ROG
 * Storytelling cinematográfico con GSAP ScrollTrigger
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealComponent, Scroll3dBackgroundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  public personalInfo = signal<PersonalInfo | null>(null);
  public displayedTitle = '';
  public projects = signal<any[]>([]);
  
  public techStack = [
    { name: 'Angular', icon: '🅰️', level: 80 },
    { name: 'TypeScript', icon: '📘', level: 70 },
    { name: 'HTML/CSS', icon: '🌐', level: 100 },
    { name: 'Node.js', icon: '🟢', level: 70 },
    { name: 'MySQL', icon: '🐬', level: 80 },
    { name: 'Git', icon: '📌', level: 100 }
  ];

  constructor(
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.dataService.getPersonalInfo().subscribe(info => {
      this.personalInfo.set(info);
      this.fullTitle = info.title;
      setTimeout(() => this.typeTitle(), 1000);
    });

    this.dataService.getProjects().subscribe(projects => {
      this.projects.set(projects.filter(p => p.featured));
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.initScrollAnimations();
    }, 500);
  }

  private fullTitle = '';
  private typeTitle(): void {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.fullTitle.length) {
        this.displayedTitle += this.fullTitle.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  private initScrollAnimations(): void {
    // Parallax en capas
    this.gsapService.parallax('.layer-1', 0.3);
    this.gsapService.parallax('.layer-2', 0.6);
    this.gsapService.parallax('.layer-3', 0.9);

    // Floating cards con parallax
    this.gsapService.parallax('.card-1', 0.4);
    this.gsapService.parallax('.card-2', 0.6);
    this.gsapService.parallax('.card-3', 0.8);

    // Fade in de project cards
    this.gsapService.fadeInOnScroll('.project-card', { stagger: 0.2 });

    // Fade in de tech items
    this.gsapService.fadeInOnScroll('.tech-item', { stagger: 0.1 });

    // Zoom en tech section
    this.gsapService.zoomOnScroll('.tech-title', 0.8, 1);
    
    // Zoom en projects title
    this.gsapService.zoomOnScroll('.projects-title', 0.9, 1);
  }
}

