import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Classe } from '../modeles/classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private baseUrl = 'http://localhost:8080';     

  constructor(private http: HttpClient) { }            

  getAllClasse(): Observable<Classe[]> {       
    return this.http.get<Classe[]>(`${environment.baseurl}/classe/all`);
  }

  addClasse(Classe:Classe): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/classe/create`, Classe); 

  }

  updateClasse( id: number, Classe:Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.baseUrl}/classe/update/${id}`, Classe);
  }

  deleteClasse(id: number): Observable<Classe> {
    return this.http.delete<Classe>(`${this.baseUrl}/classe/delete/${id}`, { responseType: 'text' as 'json' });
  }

 
}

