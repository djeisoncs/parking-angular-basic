import { Component } from '@angular/core';
import { BaseComponenteListComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-list.component';
import { Veiculo } from 'src/app/compartilhado/model/veiculo.model';
import { VeiculosService } from 'src/app/compartilhado/services/veiculos.service';

/**
 * Componente de listagem da entidade veiculo
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss']
})
export class VeiculoListComponent extends BaseComponenteListComponent<Veiculo> {

  cols: any[];

  constructor(protected service: VeiculosService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.cols = [
      { field: 'placa', header: 'Placa' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'cor', header: 'Cor' }
    ];
  }
}
