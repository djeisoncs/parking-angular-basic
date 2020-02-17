import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Veiculo } from '../model/veiculo.model';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Classe responsável por fazer a comunicação com o recurso da entidade veiculo e conter regras negocio relacionadas a esta entidade
 * @author Djeison 13 de fev de 2020 
 */
@Injectable({
  providedIn: 'root'
})
export class VeiculosService extends BaseService<Veiculo> {

  constructor(
    protected injector: Injector
  ) {
    super('veiculos', injector);
  }

  getVeiculosForPalca(placa: string): Observable<Veiculo[]> {
    const url = `${env.baseApiUrl+'veiculos'+'/placa'}/${placa}`;
    return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidades)
    );
  }

  getVeiculosByCliente(idCliente: number): Observable<Veiculo[]> {
    const url = `${env.baseApiUrl+'veiculos'+'/cliente'}/${idCliente}`;
    return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidades)
    );
  }

  montarDadosVeiculo(placa: string, modelo: string, cor: string): Veiculo {
    let veiculo: Veiculo = new Veiculo();
    veiculo.placa = placa;
    veiculo.modelo = modelo;
    veiculo.cor = cor;
    return veiculo;
  }
  montarDadosVeiculoSalvo(id: number, placa: string, modelo: string, cor: string): Veiculo {
    let veiculo: Veiculo = new Veiculo();
    veiculo = this.montarDadosVeiculo(placa, modelo, cor)
    veiculo.id = id;
    return veiculo;
  }

  jsonDataToEntidades(jsonData: any[]): Veiculo[] {     
    return jsonData['Veiculo'] as Veiculo[];
  }
  
  jsonDataToEntidade(jsonData: any): Veiculo {
    return jsonData['Veiculo'] as Veiculo;
  }

  editarElementoLista(entidades: Veiculo[], entidade: Veiculo, placa: string, modelo: string, cor: string): Veiculo[] {
    let veiculos: Veiculo[] = [];
    entidades.forEach(elemento => {
      if (elemento.id != null){
        if (elemento.id == entidade.id)
          veiculos.push(this.montarDadosVeiculoSalvo(elemento.id, placa, modelo, cor));
        else 
          veiculos.push(elemento);
      } else if (elemento.placa == entidade.placa)        
          veiculos.push(this.montarDadosVeiculo(placa, modelo, cor));
      else 
        veiculos.push(elemento);
    });
    return veiculos;
  }

      /**
     * Método responsável por remover um elemento de uma lista
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     * @param entidades
     * @returns T[]
    */
   removerElementoLista(entidades: Veiculo[], entidade: Veiculo): Veiculo[] {
    const entidadesAux: Veiculo[] = [];
    entidades.forEach(element => {
      if (element.id != null){
        if(element.id != entidade.id)
          entidadesAux.push(element)
      } else
        if(element.placa != entidade.placa)
          entidadesAux.push(element)
    });
    return entidadesAux;
}    
  
}
