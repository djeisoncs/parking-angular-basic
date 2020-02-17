import { Component } from '@angular/core';
import { BaseComponenteListComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-list.component';
import { Cliente } from 'src/app/compartilhado/model/cliente.model';
import { ClientesService } from 'src/app/compartilhado/services/clientes.service';

/**
 * Componente de listagem da entidade cliente
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent extends BaseComponenteListComponent<Cliente> {

  constructor(protected service: ClientesService) {
    super(service);
  }

}
