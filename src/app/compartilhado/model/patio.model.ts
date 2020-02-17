import { BaseResourceModel } from './base-resource.model';

/**
 * Classe responsável por atributos da entidade patio
 * @author Djeison 13 de fev de 2020 
 */
export class Patio extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade patio
     * @author Djeison 13 de fev de 2020 
     */        
    constructor(
        public descricao?: string,
        public numVagas?: number,
        public valorHora?: number
    ){
        super();
    }

    /**
     * Método responsável por converter o objeto json na entidade patio
     * @author Djeison 13 de fev de 2020 
     */            
    static fromJson(jsonData: any): Patio {
        return Object.assign(new Patio(), jsonData);
    }    
}