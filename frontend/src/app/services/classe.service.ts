import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../Modeles/classe';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8080';     

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/classe/all`);
  }

  getClasse(id: number): Observable<Classe> {
    const url = `${this. baseUrl}/${id}`;
    return this.http.get<Classe>(`${this.baseUrl}/getClasse/${id}`);
  }

  addClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(`${this.baseUrl}/add-classe`, classe); 
  }

   updateClasse(id:number,classe: Classe): Observable<Classe> {
   return this.http.put<Classe>(`${this.baseUrl}/update-classe/${id}`, classe);
   }

  deleteClasse(id: number): Observable<Classe> {
     const url = `${this. baseUrl}/${id}`;
     return this.http.delete<Classe>(`${this.baseUrl}/deleteClassse/${id}`, { responseType: 'text' as 'json' });
  }
}
