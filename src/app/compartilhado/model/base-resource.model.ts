/**
 * Classe responsável por disponibilizar atributos comuns a varias classes e ser usada como base para a herança na componentização
 * @author Djeison 13 de fev de 2020 
 */
export abstract class BaseResourceModel {
    id?: number;
    dataCadastro?: number;     
    dataEdicao?: number;
}