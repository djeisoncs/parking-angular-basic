import { BaseResourceModel } from '../../model/base-resource.model';
import { OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';

export abstract class FormBaseComponent<T extends BaseResourceModel> implements OnInit {

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
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.fb = this.injector.get(FormBuilder);
    }
  
    /**
     * Método responsável por fazer as operações necessária para o momento que o componente é acionado
     * @author Djeison 13 de fev de 2020 
     */        
    ngOnInit() {
      this.gerarForm();
    }
  
    /**
     * Método responsável por acionar o serviço para salvar a entidade e tratar o seu retorno
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */    
    protected salvar(entidade: T): T {        
      this.service.salvar(entidade).subscribe(
        elemento => {
          this.actionForSuccess(elemento);
          
        },
        error => this.actionForError(error)
      );
      return this.jsonDataFromEntidade(entidade);
    }
  
    /**
     * Método responsável por acionar o serviço para editar a entidade e tratar o seu retorno
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */    
    protected editar(entidade: T) {    
      this.service.editar(entidade).subscribe(
        elemento => this.actionForSuccess(elemento),
        error => this.actionForError(error)
      );
    }
    
    protected mensagemSucesso(msg: string) {
      //toastr.success(msg);
    }
  
    /**
     * Método acionado em caso de sucesso no submit do formulario
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */    
    protected actionForSuccess(entidade: T) {    
      this.mensagemSucesso("Operação realizada com sucesso!");
      const confirma = confirm("Deseja realizar um novo cadastro?");
      if (confirma) {
        this.router.navigateByUrl(this.route.snapshot.parent.url[0].path,{skipLocationChange: true}).then(
          () => this.router.navigate([this.route.snapshot.parent.url[0].path,"new"])
        );      
      }else
        this.router.navigate([this.route.snapshot.parent.url[0].path]);
    }
  
    /**
     * Método acionado em caso de erro no submit do formulario
     * @author Djeison 13 de fev de 2020 
     * @param entidade
     */    
    protected actionForError(error) {
      //toastr.error("Erro ao processar sua solicitação");
      this.submittingForm = false;
      if(error.status === 422)
        this.serverErrorMessages = JSON.parse(error._body).errors;
      else
        this.serverErrorMessages = ["Falha na comunicação com o servidor"];
    }
  
    /**
     * Método responsável por gerar os campos do formulário
     * @author Djeison 13 de fev de 2020
     */    
    protected abstract gerarForm(): void;

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
  