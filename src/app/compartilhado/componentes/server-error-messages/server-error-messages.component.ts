import { Component, OnInit, Input } from '@angular/core';

/**
 * Componente de erros de conexão
 * @author Djeison 13 de fev de 2020 
 */
@Component({
  selector: 'app-server-error-messages',
  templateUrl: './server-error-messages.component.html',
  styleUrls: ['./server-error-messages.component.scss']
})
export class ServerErrorMessagesComponent implements OnInit {

  @Input('server-error-messages') serverErrorMessages: string[]=null;
  
  constructor() { }

  ngOnInit() {
  }

}
