import { BaseResourceModel } from './base-resource.model';
import { Cliente } from './cliente.model';
import { Veiculo } from './veiculo.model';
import { Patio } from './patio.model';

/**
 * Classe responsável por atributos da entidade lancamento
 * @author Djeison 13 de fev de 2020 
 */
export class Lancamento extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade lancamento
     * @author Djeison 13 de fev de 2020 
     */        
    constructor(
        public status?: string,
        public valorTotal?: number,
        public patio?: Patio,
        public veiculo?: Veiculo,
        public cliente?: Cliente        
    ){
        super();
    }

    /**
     * Método responsável por converter o objeto json na entidade lancamento
     * @author Djeison 13 de fev de 2020 
     */            
    static fromJson(jsonData: any): Lancamento {
        return Object.assign(new Lancamento(), jsonData);
    }    
}