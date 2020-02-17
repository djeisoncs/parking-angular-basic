import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Cliente } from '../model/cliente.model';
import { ClienteDto } from '../model/cliente-dto.model';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Veiculo } from '../model/veiculo.model';
import { VeiculosService } from './veiculos.service';

/**
 * Classe responsável por fazer a comunicação com o recurso da entidade cliente e conter regras negocio relacionadas a esta entidade
 * @author Djeison 13 de fev de 2020 
 */
@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseService<Cliente> {

  constructor(
    protected injector: Injector,
    private veiculoService: VeiculosService
  ) {
    super('clientes', injector);
  }

  /**
   * Método responsável por fazer a requisição para o web service para salvar a entidade passada por parametro
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   * @returns Observable<T>
  */
  salvar(entidade: ClienteDto): Observable<ClienteDto> {
    return this.http.post(env.baseApiUrl + 'clientes', entidade).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidade)
    );
  }

  /**
   * Método responsável por fazer a requisição para o web service para editar a entidade passada por parametro
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   * @returns Observable<T>
  */
 editar(entidade: ClienteDto): Observable<ClienteDto> {
  return this.http.put(env.baseApiUrl + 'clientes', entidade).pipe(
    catchError(this.handleError),
    map(this.jsonDataToEntidade)
);
}

  montarCliente(nome: string, cpf: string, telefone: string): Cliente {
    let cliente: Cliente = new Cliente();    
    cliente.nome = nome;
    cliente.cpf = cpf;
    cliente.telefone = telefone;
    return cliente;
  }

  montarClienteEdicao(id:number, nome: string, cpf: string, telefone: string): Cliente {
    let cliente: Cliente = new Cliente();
    cliente = this.montarCliente(nome, cpf, telefone);
    cliente.id = id;
    return cliente;
  }
  montarClienteDto(cliente: Cliente, veiculos: Veiculo[]): ClienteDto {
    let clienteDto: ClienteDto = new ClienteDto();
    clienteDto.cliente = cliente;
    clienteDto.veiculos = veiculos;
    return clienteDto;
  }

  montarClienteDtoEdicao(cliente: Cliente, veiculos: Veiculo[], veiculosDeletar: Veiculo[]): ClienteDto {
    let clienteDto: ClienteDto = new ClienteDto();
    clienteDto = this.montarClienteDto(cliente, veiculos);
    clienteDto.veiculosDeletar = veiculosDeletar;
    return clienteDto;
  }

  getVeiculosForPalca(placa: string): Observable<Veiculo[]> {
    return this.veiculoService.getVeiculosForPalca(placa);
  }
  getVeiculosByCliente(idCliente: number): Observable<Veiculo[]> {
    return this.veiculoService.getVeiculosByCliente(idCliente);
  }

  montarDadosVeiculo(placa: string, modelo: string, cor: string): Veiculo {    
    return this.veiculoService.montarDadosVeiculo(placa, modelo, cor);
  }

  jsonDataToEntidades(jsonData: any[]): Cliente[] {     
    return jsonData['Cliente'] as Cliente[];
  }
  
  jsonDataToEntidade(jsonData: any): Cliente {
    return jsonData['Cliente'] as Cliente;
  }

  editarVeiculoLista(veiculos: Veiculo[], veiculo: Veiculo, placa: string, modelo: string, cor: string): Veiculo[] {
    return this.veiculoService.editarElementoLista(veiculos, veiculo, placa, modelo, cor);
  }

  removerVeiculoLista(veiculos: Veiculo[], veiculo: Veiculo): Veiculo[] {
    return this.veiculoService.removerElementoLista(veiculos, veiculo);
  }
}
