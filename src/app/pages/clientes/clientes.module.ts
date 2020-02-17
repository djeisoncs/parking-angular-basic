import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';



@NgModule({
  declarations: [ClienteListComponent, ClienteFormComponent],
  imports: [
    CompartilhadoModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
