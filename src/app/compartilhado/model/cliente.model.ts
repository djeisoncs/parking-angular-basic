import { BaseResourceModel } from './base-resource.model';

/**
 * Classe responsável por atributos da entidade cliente
 * @author Djeison 13 de fev de 2020 
 */
export class Cliente extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade cliente
     * @author Djeison 13 de fev de 2020 
     */    
    constructor(
        public nome?: string,
        public cpf?: string,
        public telefone?: string
    ){
        super();
    }

    /**
     * Método responsável por converter o objeto json na entidade cliente
     * @author Djeison 13 de fev de 2020 
     */        
    static fromJson(jsonData: any): Cliente {
        return Object.assign(new Cliente(), jsonData);
    }    
}