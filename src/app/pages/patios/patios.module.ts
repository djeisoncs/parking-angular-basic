import { NgModule } from '@angular/core';

import { PatiosRoutingModule } from './patios-routing.module';
import { PatioFormComponent } from './patio-form/patio-form.component';
import { PatioListComponent } from './patio-list/patio-list.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  declarations: [PatioFormComponent, PatioListComponent],
  imports: [
    CompartilhadoModule,
    PatiosRoutingModule
  ]
})
export class PatiosModule { }
