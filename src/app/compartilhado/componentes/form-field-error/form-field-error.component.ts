import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Componente de erros de formulario
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./fom-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;
  constructor() { }

  ngOnInit() {
  }

  /**
   * Método responsável por retornar a mensagem de erro do formulario
   * @author Djeison 13 de fev de 2020
   * @returns mensagem | null
   */
  public get errorMessage(): string | null {
    if (this.mustShowMessageError()) 
      return this.getMessagemDeErro();    
    return null;
  }

  /**
   * Método responsável por validar se o formulario está valido
   * @author Djeison 13 de fev de 2020 
   * @returns boolean
   */
  private mustShowMessageError(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  /**
   * Método responsável por validar as mensagens de erro de formulario
   * @author Djeison 13 de fev de 2020 
   * @returns mensagem | null
   */
  private getMessagemDeErro(): string | null {
    if (this.formControl.errors.required)
      return 'Dado obrigatório';
    else if (this.formControl.errors.minlength)      
      return `Deve conter no minimo ${this.formControl.errors.minlength.requiredLength} caracteres`;  
    else if (this.formControl.errors.email)
      return 'E-mail inválido';
    return null;
  }

}