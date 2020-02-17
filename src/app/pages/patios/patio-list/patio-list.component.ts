import { Component } from '@angular/core';
import { BaseComponenteListComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-list.component';
import { Patio } from 'src/app/compartilhado/model/patio.model';
import { PatiosService } from 'src/app/compartilhado/services/patios.service';

/**
 * Componente de listagem da entidade patio
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-patio-list',
  templateUrl: './patio-list.component.html',
  styleUrls: ['./patio-list.component.scss']
})
export class PatioListComponent extends BaseComponenteListComponent<Patio> {

  constructor(protected service: PatiosService) {
    super(service);
  }
  
}
