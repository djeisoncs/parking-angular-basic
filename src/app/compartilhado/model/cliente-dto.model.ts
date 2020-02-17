import { BaseResourceModel } from './base-resource.model';
import { Veiculo } from './veiculo.model';
import { Cliente } from './cliente.model';

/**
 * Classe responsável por atributos da entidade cliente
 * @author Djeison 13 de fev de 2020 
 */
export class ClienteDto extends BaseResourceModel {

    /**
     * Método responsável por declarar atributos da entidade cliente
     * @author Djeison 13 de fev de 2020 
     */    
    constructor(
        public cliente?: Cliente,
        public veiculos?: Veiculo[],
        public veiculosDeletar?: Veiculo[]
    ){
        super();
    }

    /**
     * Método responsável por converter o objeto json na entidade cliente
     * @author Djeison 13 de fev de 2020 
     */        
    static fromJson(jsonData: any): ClienteDto {
        return Object.assign(new ClienteDto(), jsonData);
    }    
}