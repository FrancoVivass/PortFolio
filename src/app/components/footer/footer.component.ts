import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateBackToTopVisibility();
  }

  private updateBackToTopVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showBackToTop = scrollTop > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}