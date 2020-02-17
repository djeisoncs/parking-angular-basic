import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatioListComponent } from './patio-list/patio-list.component';
import { PatioFormComponent } from './patio-form/patio-form.component';


const routes: Routes = [
  {
    path:'',
    component: PatioListComponent
  },
  {
    path:'new',
    component: PatioFormComponent
  },
  {
    path:':id/edit',
    component: PatioFormComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatiosRoutingModule { }
