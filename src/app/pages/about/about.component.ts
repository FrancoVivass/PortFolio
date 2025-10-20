import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Sobre mí — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'Desarrollador web de Dolores, Buenos Aires. Interfaces modernas con Angular, animaciones y UX.' });
  }
}
