import { Component, OnInit, Input } from '@angular/core';

/**
 * Interface responsável por conter atributos da migalha de pão
 * @author Djeison 13 de fev de 2020 
 */
interface MigalhaDePao {
  text: string;
  link?: string;
    
}

/**
 * Componente de migalha de pão
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() itens: Array<MigalhaDePao> = [];

  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Método responsável por validar se o item passado por parametro é o ultimo da lista
   * @author Djeison 13 de fev de 2020 
   * @param item
   * @returns boolean
   */
  isTheLastItem(item: MigalhaDePao): boolean {
    return this.itens.indexOf(item)+1 == this.itens.length;
  }

}
