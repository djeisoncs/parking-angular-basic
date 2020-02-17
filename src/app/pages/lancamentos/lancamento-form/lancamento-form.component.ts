import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponenteFormComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-form.component';
import { Lancamento } from 'src/app/compartilhado/model/lancamento.model';
import { LancamentosService } from 'src/app/compartilhado/services/lancamentos.service';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Veiculo } from 'src/app/compartilhado/model/veiculo.model';
import { Patio } from 'src/app/compartilhado/model/patio.model';

/**
 * Componente de formulario da entidade lancamento
 * @author Djeison 14 de fev de 2020 
 */
@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.scss']
})
export class LancamentoFormComponent extends BaseComponenteFormComponent<Lancamento> implements OnInit {

  veiculos: Veiculo[] = [];
  veiculo: Veiculo = new Veiculo();
  patio: Patio = new Patio();

  country: any;
  filteredCountriesSingle: any[];

  constructor(protected injector: Injector, protected service: LancamentosService, public datePipe: DatePipe) {
    super(injector, new Lancamento(), service, Lancamento.fromJson);
  }

  /**
   * Método responsável por fazer as operações necessária para o momento que o componente é acionado
   * @author Djeison 13 de fev de 2020 
   */    
  ngOnInit() {
    super.ngOnInit();
    if ((sessionStorage['idPatio'] == null) || (sessionStorage['idPatio'] == ''))
      this.router.navigate(['/home']);
    else
      this.patio.id = sessionStorage['idPatio'];
  }


  protected gerarForm() {
    this.form = this.fb.group({
      id: [null],
      horaInicio: [{value: this.datePipe.transform(moment(new Date()).format(), 'HH:mm'), disabled: true},[Validators.required]],
      placaInput: [null,[Validators.required]],
      cliente: [{value: null, disabled: true}]
    });
  }

  protected createPageTitle(): string {
    return 'Novo Lancamento';
  }

  protected edtiPageTitle(): string {
    const nomeEntidade = this.entidade.veiculo.placa || '';
    return 'Editando Lancamento: '+nomeEntidade;
  } 

  
  prencherCliente(event) {
    if (this.veiculos.length == 1)
      this.form.get('cliente').setValue(this.veiculos[0].cliente.nome);
  }
  filterVeiculo(event) {
    this.form.get('cliente').setValue("");
    if (event.query.length >= 3) {
      if (this.veiculos.length > 0) {
        this.filterVeiculos(event.query, this.veiculos);
      }
      if (this.veiculos.length <= 0) {
        this.service.getVeiculosForPalca(event.query).subscribe(
          entidades => this.filterVeiculos(event.query, entidades),
          error => alert('Erro ao carregar a lista')
        );       
      } 
    }
  }

  filterVeiculos(query: string, veiculos: Veiculo[]) {
    let veiculosFiltrados: Veiculo[] = [];
    veiculos.forEach(elemento => {
      if (elemento.placa.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        veiculosFiltrados.push(elemento);
      }
    });
    this.veiculos = veiculosFiltrados;
  }

  
  submitForm() {
    this.submittingForm = true;
    if(this.currentAction == "new"){
      this.salvar(this.service.montarDados(moment(this.form.get('horaInicio').value, "HH:mm").toDate(), this.veiculo, this.patio));
    }
  }
}
