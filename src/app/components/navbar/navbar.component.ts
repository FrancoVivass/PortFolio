import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu', { static: false }) menu!: ElementRef;
  
  isScrolled = false;
  isHidden = false;
  isMenuOpen = false;
  lastScrollY = 0;
  imgError = false;

  ngOnInit() {
    this.updateScrollState();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollState();
  }

  private updateScrollState() {
    const scrollY = window.pageYOffset;
    const scrollDelta = scrollY - this.lastScrollY;
    
    if (scrollY > 50) {
      this.isScrolled = true;
      if (scrollDelta > 0 && scrollY > 100) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
    } else {
      this.isScrolled = false;
      this.isHidden = false;
    }
    
    this.lastScrollY = scrollY;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  private openMenu() {
    document.body.style.overflow = 'hidden';
    
    if (this.menu) {
      gsap.fromTo(this.menu.nativeElement,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    
    if (this.menu) {
      gsap.to(this.menu.nativeElement,
        { x: '100%', opacity: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }

  navigateTo(route: string) {
    this.closeMenu();
    // Use Angular Router for navigation
    setTimeout(() => {
      window.location.href = route;
    }, 300); // Wait for menu close animation
  }
}