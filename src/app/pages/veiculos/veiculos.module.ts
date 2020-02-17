import { NgModule } from '@angular/core';

import { VeiculosRoutingModule } from './veiculos-routing.module';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  declarations: [VeiculoFormComponent, VeiculoListComponent],
  imports: [
    CompartilhadoModule,
    VeiculosRoutingModule
  ]
})
export class VeiculosModule { }
