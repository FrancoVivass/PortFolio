import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Descargables — Franco Vivas');
    this.meta.updateTag({ name: 'description', content: 'CV, dossier y media kit para descargar.' });
  }
}
