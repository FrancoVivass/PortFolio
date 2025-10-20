import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Servicios — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'Desarrollo Angular, animaciones con GSAP/ScrollTrigger, performance y accesibilidad.' });
  }
}
