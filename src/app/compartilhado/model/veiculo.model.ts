import { BaseResourceModel } from './base-resource.model';
import { Cliente } from './cliente.model';

/**
 * Classe responsável por atributos da entidade veiculo
 * @author Djeison 13 de fev de 2020 
 */
export class Veiculo extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade veiculo
     * @author Djeison 13 de fev de 2020 
     */        
    constructor(
        public placa?: string,
        public modelo?: string,
        public cor?: string,
        public cliente?: Cliente
    ){
        super();
    }

    /**
     * Método responsável por converter o objeto json na entidade veiculo
     * @author Djeison 13 de fev de 2020 
     */            
    static fromJson(jsonData: any): Veiculo {
        return Object.assign(new Veiculo(), jsonData);
    }        
}