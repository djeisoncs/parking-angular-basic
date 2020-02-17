import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './componentes/bread-crumb/bread-crumb.component';
import { FormFieldErrorComponent } from './componentes/form-field-error/form-field-error.component';
import { PageHeaderComponent } from './componentes/page-header/page-header.component';
import { ServerErrorMessagesComponent } from './componentes/server-error-messages/server-error-messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';
import { IMaskModule } from 'angular-imask';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {AutoCompleteModule} from 'primeng/autocomplete';



/**
 * Classe responsável por importar e exportar todos os modulos e componentes para que possam ser usados por outros modulos
 * @author Djeison 13 de fev de 2020 
 */
@NgModule({
  declarations: [BreadCrumbComponent, FormFieldErrorComponent, PageHeaderComponent, ServerErrorMessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    RouterModule,
    TableModule,
    InputTextModule,
    InputMaskModule,
    AutoCompleteModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    TableModule,
    InputTextModule,
    InputMaskModule,
    AutoCompleteModule
  ]
})
export class CompartilhadoModule { }
