import { Component, OnInit, Input } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

/**
 * Componente de cabeçalho
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;
  @Input('show-button') showButton: boolean = true;


  constructor(private service: PageHeaderService) {}

  ngOnInit() {
    this.service.emitirTitulo.subscribe(
      titulo => {
        this.pageTitle = titulo;
    });
  }

}
