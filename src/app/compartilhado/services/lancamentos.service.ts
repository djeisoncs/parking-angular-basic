import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Lancamento } from '../model/lancamento.model';
import { VeiculosService } from './veiculos.service';
import { Observable } from 'rxjs';
import { Veiculo } from '../model/veiculo.model';
import { Patio } from '../model/patio.model';
import { environment as env } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

/**
 * Classe responsável por fazer a comunicação com o recurso da entidade lançamento e conter regras negocio relacionadas a esta entidade
 * @author Djeison 13 de fev de 2020 
 */
@Injectable({
  providedIn: 'root'
})
export class LancamentosService  extends BaseService<Lancamento> {

  constructor(
    protected injector: Injector,
    private veiculoService: VeiculosService
  ) {
    super('lancamentos', injector);
  }

  jsonDataToEntidades(jsonData: any[]): Lancamento[] {     
    return jsonData['Lancamento'] as Lancamento[];
  }
  
  jsonDataToEntidade(jsonData: any): Lancamento {
    return jsonData['Lancamento'] as Lancamento;
  }

  getLancamentosPendentesPorPatio(idPatio: number): Observable<Veiculo[]> {
    const url = `${env.baseApiUrl+'lancamentos'+'/pendentes-patio'}/${idPatio}`;
    return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidades)
    );
  }  

  getVeiculosForPalca(placa: string): Observable<Veiculo[]> {
    return this.veiculoService.getVeiculosForPalca(placa);
  }

  getVeiculos(): Observable<Veiculo[]> {
    return this.veiculoService.getAll();
  }

  montarDados(data: Date, veiculo: Veiculo, patio: Patio): Lancamento {
    let lancamento: Lancamento = new Lancamento();
    lancamento.patio = patio;
    lancamento.veiculo = veiculo;
    lancamento.status = 'A';
    lancamento.dataCadastro = data.getTime();
    return lancamento;
  }

  /*finalizar(entidade: Lancamento): Observable<T> {
    return this.http.put(env.baseApiUrl + this.path, entidade).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidade)
    );
  }*/
  
}
