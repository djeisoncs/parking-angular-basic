/**
 * Classe responsável por atributos de dashboard
 * @author Djeison 13 de fev de 2020 
 */
export class Dashboard {

    /**
     * Método responsável por declarar atributos da entidade dashboard
     * @author Djeison 13 de fev de 2020 
     */    
    constructor(
        public vagasTotal?: number,
        public vagasUsadas?: number,
        public vagasLivres?: number
    ){}
}