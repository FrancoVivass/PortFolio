import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  activeFilter = 'all';

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Blog — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'Artículos sobre Angular, animaciones web, UX y performance.' });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
