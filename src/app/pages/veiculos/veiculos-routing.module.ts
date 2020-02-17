import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';


const routes: Routes = [
  {
    path:'',
    component: VeiculoListComponent
  },
  {
    path:'new',
    component: VeiculoFormComponent
  },
  {
    path:':id/edit',
    component: VeiculoFormComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
