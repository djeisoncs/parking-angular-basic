import { Component, Injector, OnInit } from '@angular/core';
import { Patio } from 'src/app/compartilhado/model/patio.model';
import { PatiosService } from 'src/app/compartilhado/services/patios.service';
import { FormBaseComponent } from 'src/app/compartilhado/componentes/base-component/form-base-componente.component';
import { PageHeaderService } from 'src/app/compartilhado/services/page-header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends FormBaseComponent<Patio> implements OnInit {

  patios: Patio[] = [];
  patio: Patio = new Patio();

  constructor(protected injector: Injector, protected service: PatiosService, private pageHeaderService: PageHeaderService) {
    super(injector, new Patio(), service, Patio.fromJson);
  }

  /**
   * Método responsável por fazer as operações necessária para o momento que o componente é acionado
   * @author Djeison 13 de fev de 2020 
   */    
  ngOnInit() {
    super.ngOnInit();      
    if (sessionStorage['idPatio'] != null) {
      this.service.getById(sessionStorage['idPatio']).subscribe(
        entidade => this.carregarPatio(entidade),
        error => alert('Erro ao carregar a lista')
      );       
    }
  }

  carregarPatio(patio: Patio) {
    this.patio = patio;
  }

  protected gerarForm() {
    this.form = this.fb.group({
      id: [null],
      patioInput: [null]
    });
  }

  selecionar() {
    sessionStorage['idPatio'] = this.patio.id;
    this.pageHeaderService.emitirTitulo.emit(this.patio.descricao);
    this.router.navigate(['/home/dashboard']);
  }

  novo() {
    this.router.navigate(['/patios/new']);
  }

  filterPatio(event) {
    if (event.query.length >= 3) {
      if (this.patios.length > 0) {
        this.filterPatios(event.query, this.patios);
      }
      if (this.patios.length <= 0) {
        this.service.getByDescricao(event.query).subscribe(
          entidades => this.filterPatios(event.query, entidades),
          error => alert('Erro ao carregar a lista')
        );       
      } 
    }
  }

  filterPatios(query: string, patios: Patio[]) {
    let patiosFiltrados: Patio[] = [];
    patios.forEach(elemento => {
      if (elemento.descricao.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        patiosFiltrados.push(elemento);
      }
    });
    this.patios = patiosFiltrados;
  }


}
