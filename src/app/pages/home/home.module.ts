import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    CompartilhadoModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
