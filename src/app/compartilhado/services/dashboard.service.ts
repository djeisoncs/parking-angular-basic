import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../model/dashboard.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * Método responsável por fazer a requisição para o web service para consultar a entidade por id
   * @author Djeison 13 de fev de 2020 
   * @param id
   * @returns Observable<T>
  */
 getDashboardByPatio(id: number): Observable<Dashboard> {
    const url = `${env.baseApiUrl+'dashboard'}/${id}`;
    return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntidade)
    );
  }

  jsonDataToEntidades(jsonData: any[]): Dashboard[] {     
    return jsonData['Dashboard'] as Dashboard[];
  }
  
  jsonDataToEntidade(jsonData: any): Dashboard {
    return jsonData['Dashboard'] as Dashboard;
  }

  /**
   * Método responsável por tratar os erros provinientes das requisições ao web service
   * @author Djeison 13 de fev de 2020 
   * @param error
   * @returns Observable<any>
  */
  protected handleError(error: any): Observable<any> {
    console.log('error: '+JSON.stringify(error));
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }
}
