import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CompartilhadoModule } from '../compartilhado/compartilhado.module';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';


/**
 * Modulo principal do sistema
 * @author Djeison 13 de fev de 2020 
 */
@NgModule({
  declarations: [NavbarComponent, RodapeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    CompartilhadoModule
  ], 
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
