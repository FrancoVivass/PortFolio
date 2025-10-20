import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'ai';
  color: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  skills: Skill[] = [
    // Frontend
    { name: 'Angular', icon: 'angular', level: 95, category: 'frontend', color: '#dd0031' },
    { name: 'TypeScript', icon: 'typescript', level: 90, category: 'frontend', color: '#3178c6' },
    { name: 'TailwindCSS', icon: 'tailwind', level: 88, category: 'frontend', color: '#06b6d4' },
    { name: 'GSAP', icon: 'gsap', level: 85, category: 'frontend', color: '#88ce02' },
    { name: 'Three.js', icon: 'threejs', level: 75, category: 'frontend', color: '#000000' },
    { name: 'RxJS', icon: 'rxjs', level: 80, category: 'frontend', color: '#b7178c' },
    
    // Backend
    { name: 'Node.js', icon: 'nodejs', level: 85, category: 'backend', color: '#339933' },
    { name: '.NET', icon: 'dotnet', level: 80, category: 'backend', color: '#512bd4' },
    { name: 'Express', icon: 'express', level: 82, category: 'backend', color: '#000000' },
    { name: 'MySQL', icon: 'mysql', level: 78, category: 'backend', color: '#4479a1' },
    { name: 'MongoDB', icon: 'mongodb', level: 70, category: 'backend', color: '#47a248' },
    
    // Design
    { name: 'Figma', icon: 'figma', level: 85, category: 'design', color: '#f24e1e' },
    { name: 'Adobe XD', icon: 'adobe-xd', level: 80, category: 'design', color: '#ff61f6' },
    { name: 'Photoshop', icon: 'photoshop', level: 75, category: 'design', color: '#31a8ff' },
    { name: 'Illustrator', icon: 'illustrator', level: 70, category: 'design', color: '#ff9a00' },
    
    // Tools
    { name: 'Git', icon: 'git', level: 90, category: 'tools', color: '#f05032' },
    { name: 'Docker', icon: 'docker', level: 75, category: 'tools', color: '#2496ed' },
    { name: 'VS Code', icon: 'vscode', level: 95, category: 'tools', color: '#007acc' },
    { name: 'Postman', icon: 'postman', level: 85, category: 'tools', color: '#ff6c37' },
    
    // AI
    { name: 'ChatGPT API', icon: 'openai', level: 80, category: 'ai', color: '#412991' },
    { name: 'Midjourney', icon: 'midjourney', level: 75, category: 'ai', color: '#ff6b6b' }
  ];

  filteredSkills: Skill[] = [];
  selectedCategory: string = 'all';

  ngOnInit() {
    this.filteredSkills = this.skills;
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  filterSkills(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredSkills = this.skills;
    } else {
      this.filteredSkills = this.skills.filter(skill => skill.category === category);
    }
  }

  private initAnimations() {
    // Hero animations
    gsap.fromTo('.hero-content', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Skill cards animation
    gsap.fromTo('.skill-card', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Progress bars animation
    gsap.fromTo('.progress-bar', 
      { width: '0%' },
      { 
        width: '100%', duration: 1.5, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skill-card',
          start: 'top 80%',
          onEnter: (self) => {
            if (self.trigger) {
              const targetWidth = self.trigger.querySelector('.progress-fill')?.getAttribute('data-width') || '0%';
              const progressFill = self.trigger.querySelector('.progress-fill');
              if (progressFill) {
                gsap.to(progressFill, {
                  width: targetWidth,
                  duration: 1.5,
                  ease: 'power2.out'
                });
              }
            }
          }
        }
      }
    );

    // Timeline animation
    gsap.fromTo('.timeline-item', 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}