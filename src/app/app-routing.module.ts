import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: './pages/clientes/clientes.module#ClientesModule'
  },
  {
    path: 'patios',
    loadChildren: './pages/patios/patios.module#PatiosModule'
  },
  {
    path: 'lancamentos',
    loadChildren: './pages/lancamentos/lancamentos.module#LancamentosModule'
  },
  {
    path: 'veiculos',
    loadChildren: './pages/veiculos/veiculos.module#VeiculosModule'
  },    
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },    
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
