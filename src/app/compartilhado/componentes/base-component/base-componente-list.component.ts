import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../model/base-resource.model';
import { BaseService } from '../../services/base.service';

/**
 * Classe responsável por conter os metodos a atributos comuns aos componentes de listagem
 * @author Djeison 13 de fev de 2020 
 */
export abstract class BaseComponenteListComponent<T extends BaseResourceModel> implements OnInit {

    entidades: T[] = [];

    /**
     * Método responsável por injetar os atributos que seram utilizados na classe
     * @author Djeison 13 de fev de 2020 
     * @param service
     */
    constructor(protected service: BaseService<T>) { }

    /**
     * Método responsável por fazer as operações necessária para o momento que o componente é acionado
     * @author Djeison 13 de fev de 2020 
     */
    ngOnInit() {
        this.service.getAll().subscribe(
            entidades => this.entidades = entidades,
            error => alert('Erro ao carregar a lista')
        );
    }

    /**
     * Método responsável por acionar o metodo de serviço responsável pela exclusão da entidade passada por parametro
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */
    delete(entidade: T) {
        const confirma = confirm("Deseja realmente excluir?");
        if (confirma){
            this.service.delete(entidade.id).subscribe(
            () => this.entidades = this.service.removerElementoLista(this.entidades, entidade),
            () => alert("Erro ao excluir!")
            )
        }
    }

    /**
     * Método responsável por acionar o metodo de serviço responsável pela exclusão da entidade passada por parametro
     * @author Djeison 13 de fev de 2020 
     * @param valor
     * @returns valor
     */    
    formatarValor(valor: number): string {
        return this.service.formatarValor(valor);
    }

}
