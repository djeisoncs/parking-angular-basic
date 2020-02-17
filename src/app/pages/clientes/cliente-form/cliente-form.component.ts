import { Component, Injector } from '@angular/core';
import { BaseComponenteFormComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-form.component';
import { Cliente } from 'src/app/compartilhado/model/cliente.model';
import { ClientesService } from 'src/app/compartilhado/services/clientes.service';
import { Validators } from '@angular/forms';
import { ClienteDto } from 'src/app/compartilhado/model/cliente-dto.model';
import { Veiculo } from 'src/app/compartilhado/model/veiculo.model';


/**
 * Componente de formulario da entidade cliente
 * @author Djeison 14 de fev de 2020 
 */
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent extends BaseComponenteFormComponent<Cliente> {

  veiculos: Veiculo[] = [];
  veiculosDeletar: Veiculo[] = [];
  veiculo: Veiculo = new Veiculo();

  constructor(protected injector: Injector, protected service: ClientesService) {
    super(injector, new Cliente(), service, Cliente.fromJson);
  }

  protected gerarForm() {
    this.form = this.fb.group({
      id: [null],
      nome: [null,[Validators.required, Validators.minLength(2)]],
      cpf: [null,[Validators.required, Validators.minLength(9)]],      
      telefone: [null],
      placa: [null],
      modelo: [null],
      cor: [null],
      placa_grid: [null],
      modelo_grid: [null],
      cor_grid: [null]
    });
  }

  /**
   * Método responsável por carregar a entidade de edição
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   */
  protected carregarDados(entidade: Cliente) {
    super.carregarDados(entidade);
    this.service.getVeiculosByCliente(this.entidade.id).subscribe(
      entidades => this.veiculos = entidades,
      error => alert('Erro ao carregar a lista')
    );
  }

  /**
   * Método responsável por carregar a lista de veiculos do cliente
   * @author Djeison 13 de fev de 2020 
   * @param veiculos
   */
  carregarVeiculos(veiculos: Veiculo[]) {
    this.veiculos = veiculos;
  }


  /**
   * Método de sbmit do formulário que será acionado para salvar ou editar a entidade que está em manipulação
   * @author Djeison 13 de fev de 2020 
   */
  submitForm() {
    this.submittingForm = true;
    if(this.currentAction == "new")
        this.salvar(this.service.montarClienteDto(
            this.service.montarCliente(this.form.get('nome').value, this.form.get('cpf').value, this.form.get('telefone').value), this.veiculos));
    else 
        this.editar(this.service.montarClienteDtoEdicao(this.service.montarClienteEdicao(this.entidade.id, this.form.get('nome').value, 
              this.form.get('cpf').value, this.form.get('telefone').value), this.veiculos, this.veiculosDeletar));
  }

  /**
   * Método responsável por acionar o serviço para salvar a entidade e tratar o seu retorno
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   */    
  protected salvar(entidade: ClienteDto): ClienteDto {        
    this.service.salvar(entidade).subscribe(
      elemento => {
        this.actionForSuccess(elemento);        
      },
      error => this.actionForError(error)
    );
    return this.fromJson(entidade);
  }

  /**
   * Método responsável por acionar o serviço para editar a entidade e tratar o seu retorno
   * @author Djeison 13 de fev de 2020 
   * @param entidade
   */    
  protected editar(entidade: ClienteDto) {        
    this.service.editar(entidade).subscribe(
      elemento => {
        this.actionForSuccess(elemento);        
      },
      error => this.actionForError(error)
    );
  }

  fromJson(jsonData: any): ClienteDto {
    return Object.assign(new ClienteDto(), jsonData);
  }    

  protected createPageTitle(): string {
    return 'Novo Cliente';
  }

  protected edtiPageTitle(): string {
    const nomeEntidade = this.entidade.nome || '';
    return 'Editando Cliente: '+nomeEntidade;
  }

  /**
   * Método responsável por adcionar veiculo ao grid
   * @author Djeison 16 de fev de 2020 
   */    
  adcionarVeiculo() {
    this.veiculos.push(this.service.montarDadosVeiculo(
        this.form.get('placa').value, this.form.get('modelo').value, this.form.get('cor').value));
  }

  /**
   * Método responsável por validar se o veiculo está selecionado para edição
   * @author Djeison 16 de fev de 2020 
   * @parm veiculo
   * @return boolean
   */    
  isSelected(veiculo: Veiculo): boolean {
    if ((this.veiculo == null) || (veiculo == null))
      return false;
    else
      return this.veiculo.placa == veiculo.placa;
  }

  /**
   * Método responsável por selecionar veiculo
   * @author Djeison 16 de fev de 2020 
   * @parm veiculo
   */    
  selecionar(veiculo: Veiculo) {
    this.veiculo = veiculo;
    this.form.get('placa_grid').setValue(veiculo.placa);
    this.form.get('modelo_grid').setValue(veiculo.modelo);
    this.form.get('cor_grid').setValue(veiculo.cor);
  }

  /**
   * Método responsável por cancelar a edição do veiculo
   * @author Djeison 16 de fev de 2020 
   */    
  cancelar() {
    this.limparCamposEdicaoVeiculos();
    this.veiculo = new Veiculo();
  }
  /**
   * Método responsável por limpar campos do grid
   * @author Djeison 16 de fev de 2020 
   */    
  limparCamposEdicaoVeiculos() {
    this.form.get('placa_grid').setValue('');
    this.form.get('modelo_grid').setValue('');
    this.form.get('cor_grid').setValue('');
  }

  /**
   * Método responsável por editar veiculo do grid
   * @author Djeison 16 de fev de 2020 
   */    
  editarVeiculo() {
    this.veiculos = this.service.editarVeiculoLista(this.veiculos, this.veiculo, this.form.get('placa_grid').value,
          this.form.get('modelo_grid').value, this.form.get('cor_grid').value);
    this.cancelar();
  }
  /**
   * Método responsável por excluir veiculo do grid e cadastro
   * @author Djeison 16 de fev de 2020 
   * @param veiculo
   */    
  excluir(veiculo: Veiculo){
    this.veiculos = this.service.removerVeiculoLista(this.veiculos, veiculo);
    this.veiculosDeletar.push(veiculo);
  }
}
