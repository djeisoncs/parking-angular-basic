import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/compartilhado/services/dashboard.service';
import { Dashboard } from 'src/app/compartilhado/model/dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard = new Dashboard();
  constructor(
    private service: DashboardService,
    private router: Router) { }

  /**
   * Método responsável por fazer as operações necessária para o momento que o componente é acionado
   * @author Djeison 13 de fev de 2020 
   */
  ngOnInit() {
    if ((sessionStorage['idPatio'] == null) || (sessionStorage['idPatio'] == '')){
      this.router.navigate(['/home']);
    } else
      this.service.getDashboardByPatio(sessionStorage['idPatio']).subscribe(
          entidade => this.carregarDados(entidade),
          error => alert('Erro ao carregar a lista')
      );
  }

  carregarDados(entidade: Dashboard) {
    this.dashboard = entidade;    
  }

}
