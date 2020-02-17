import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../model/base-resource.model';
import { BaseService } from '../../services/base.service';
import { FormBaseComponent } from './form-base-componente.component';

/**
 * Classe responsável por conter os metodos a atributos comuns aos componentes de formulario
 * @author Djeison 13 de fev de 2020 
 */
export abstract class BaseComponenteFormComponent<T extends BaseResourceModel> extends FormBaseComponent<T> implements OnInit, AfterContentChecked {

    currentAction: string;
    form: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected fb: FormBuilder;

    /**
     * Método responsável por injetar os atributos que seram utilizados na classe
     * @author Djeison 13 de fev de 2020 
     * @param injector
     * @param entidade
     * @param service
     * @param jsonDataFromEntidade
     */
    constructor(
        protected injector: Injector,
        public entidade: T, 
        protected service: BaseService<T>,
        protected jsonDataFromEntidade: (jsonData) => T  
      ) { 
        super(injector, entidade, service, jsonDataFromEntidade);
      }

    /**
     * Método responsável por fazer as operações necessária para o momento que o componente é acionado
     * @author Djeison 13 de fev de 2020 
     */    
    ngOnInit() {
        this.setCurrentAction();
        this.carregarEntidade();    
        super.ngOnInit();
    }

    /**
     * Método responsável por fazer ações necessárias logo após o carregamento do componente
     * @author Djeison 13 de fev de 2020 
     */    
    ngAfterContentChecked() {
        this.setPageTitle();
    }

    /**
     * Método de sbmit do formulário que será acionado para salvar ou editar a entidade que está em manipulação
     * @author Djeison 13 de fev de 2020 
     */
    submitForm() {
        this.submittingForm = true;
        if(this.currentAction == "new")
            this.salvar(this.jsonDataFromEntidade(this.form.value));
        else 
            this.editar(this.jsonDataFromEntidade(this.form.value));
    }

    /**
     * Método responsável por setar a ação corrente com base na url 
     * @author Djeison 13 de fev de 2020 
     */
    protected setCurrentAction() {
        if(this.route.snapshot.url[0].path == 'new')
            this.currentAction = 'new';
        else
            this.currentAction = 'edit';
    } 

    /**
     * Método responsável por requisitar a entidade de edição a camada de serviço
     * @author Djeison 13 de fev de 2020
     */
    protected carregarEntidade() {    
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.service.getById(+params.get("id")))
            ).subscribe(
                (entidade) => {
                    this.carregarDados(entidade);
                },
                (error) => alert('Ocorreu um erro'),
            );
        }    
    }

    /**
     * Método responsável por carregar a entidade de edição
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */
    protected carregarDados(entidade: T) {
        this.entidade = entidade;           
        this.form.patchValue(this.entidade);
        this.setPageTitle();
    }

    /**
     * Método responsável por setar o titulo da pagina com base na ação de momento
     * @author Djeison 13 de fev de 2020
     */
    protected setPageTitle() {    
        if(this.currentAction == "new")
            this.pageTitle = this.createPageTitle();
        else{
            this.pageTitle = this.edtiPageTitle();
        }
    }

    /**
     * Método responsável por setar o titulo da pagina
     * @author Djeison 13 de fev de 2020  
     * @returns titulo
     */
    protected createPageTitle(): string {
        return 'Novo';
    }

    /**
     * Método responsável por setar o titulo da pagina
     * @author Djeison 13 de fev de 2020 
     * @returns titulo
     */
    protected edtiPageTitle(): string {
     return 'Edição'
    }

}
