// src/app/services/reclamation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../modeles/reclamation';


@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8080/reclamation';

  constructor(private http: HttpClient) {}

  createReclamation(reclamation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, reclamation);
  }
  

  updateReclamation(id: number, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, reclamation);
  }
  
 

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
   

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/all`);
  }
   

  getMyReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}`);
  }
  
}


