import { Component, OnInit } from '@angular/core';
import { BaseComponenteListComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-list.component';
import { Lancamento } from 'src/app/compartilhado/model/lancamento.model';
import { LancamentosService } from 'src/app/compartilhado/services/lancamentos.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Router } from '@angular/router';

/**
 * Componente de listagem da entidade lancamento
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-lancamento-list',
  templateUrl: './lancamento-list.component.html',
  styleUrls: ['./lancamento-list.component.scss']
})
export class LancamentoListComponent extends BaseComponenteListComponent<Lancamento> implements OnInit {

  constructor(
      protected service: LancamentosService, 
      public datePipe: DatePipe,
      public router: Router) {
    super(service);
  }

  /**
   * Método responsável por fazer as operações necessária para o momento que o componente é acionado
   * @author Djeison 13 de fev de 2020 
   */
  ngOnInit() {
    if ((sessionStorage['idPatio'] == null) || (sessionStorage['idPatio'] == ''))
      this.router.navigate(['/home']);
    else
      this.carregarLancamentosPendentes();
  }

  carregarLancamentosPendentes() {
    this.service.getLancamentosPendentesPorPatio(sessionStorage['idPatio']).subscribe(
      entidades => this.entidades = entidades,
      error => alert('Erro ao carregar a lista')
    );
  }

  getHoraFormatada(dataHora: number): string {
     return this.datePipe.transform(moment(new Date(dataHora)).format(), 'HH:mm');
  }

  getValorTotal(lancamento: Lancamento): string {
    return this.service.formatarValor(this.calcularValorTotal(lancamento));
  }

  calcularValorTotal(lancamento: Lancamento): number {
    let dataInicial = moment(new Date(lancamento.dataCadastro), "DD/MM/YYYY HH:mm");
    let dataAtual = moment(new Date(), "DD/MM/YYYY HH:mm");
    let diferenca: number;
    diferenca = dataAtual.diff(dataInicial, 'hours');
    if (diferenca <= 0)
      return lancamento.patio.valorHora;
    return diferenca*lancamento.patio.valorHora;
  }

  finalizar(lancamento: Lancamento){
    lancamento.status = 'F';
    lancamento.valorTotal = this.calcularValorTotal(lancamento);
    lancamento.dataEdicao = moment(new Date(), "DD/MM/YYYY HH:mm").toDate().getTime();
    this.editar(lancamento);
    this.carregarLancamentosPendentes();
  }

  cancelar(lancamento: Lancamento){
    lancamento.status = 'C';
    lancamento.dataEdicao = moment(new Date(), "DD/MM/YYYY HH:mm").toDate().getTime();
    this.service.editar(lancamento);
  }

  /**
   * Método responsável por acionar o serviço para editar a entidade e tratar o seu retorno
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   */    
  protected editar(entidade: Lancamento) {    
    this.service.editar(entidade).subscribe(
      elemento => this.mensagemSucesso(elemento),
      error => this.mensagemErro(error)
    );
  }

  mensagemSucesso(elemento: any) {
    console.log('Finalizado');
  }

  mensagemErro(elemento: any) {
    console.log('Erro');
  }
}
