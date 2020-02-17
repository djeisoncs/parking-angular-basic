import { NgModule } from '@angular/core';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [LancamentoListComponent, LancamentoFormComponent],
  imports: [
    CompartilhadoModule,
    LancamentosRoutingModule
  ],
  providers: [
    DatePipe
  ],  
})
export class LancamentosModule { }
