import { Component, OnInit } from '@angular/core';
import { PageHeaderService } from './compartilhado/services/page-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'parking';
  pageTitle: string = 'Parking';

  constructor(private service: PageHeaderService) {}

  ngOnInit() {
    this.service.emitirTitulo.subscribe(
      titulo => {
        console.log('Titulo: '+this.pageTitle)
        this.pageTitle = titulo;
    });
  }

}
