import { Component, Injector } from '@angular/core';
import { Veiculo } from 'src/app/compartilhado/model/veiculo.model';
import { BaseComponenteFormComponent } from 'src/app/compartilhado/componentes/base-component/base-componente-form.component';
import { VeiculosService } from 'src/app/compartilhado/services/veiculos.service';
import { Validators } from '@angular/forms';

/**
 * Componente de formulario da entidade veiculo
 * @author Djeison 14 de fev de 2020 
 */
@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent extends BaseComponenteFormComponent<Veiculo> {

  constructor(protected injector: Injector, protected service: VeiculosService) {
    super(injector, new Veiculo(), service, Veiculo.fromJson);
  }

  protected gerarForm() {
    this.form = this.fb.group({
      id: [null],
      placa: [null,[Validators.required, Validators.minLength(8)]],
      modelo: [null],
      cor: [null]
    });
  }

  protected createPageTitle(): string {
    return 'Novo Veiculo';
  }

  protected edtiPageTitle(): string {
    const nomeEntidade = this.entidade.placa || '';
    return 'Editando Veiculo: '+nomeEntidade;
  }
}
