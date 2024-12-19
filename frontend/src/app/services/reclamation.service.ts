import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../Modeles/reclamation';

 // Assurez-vous d'importer correctement votre modèle Reclamation

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}`);
  }

  addReclamation(reclamation: Reclamation): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reclamation);
  }

  updateReclamation(reclamation: Reclamation, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reclamation);
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchReclamations(searchText: string): Observable<Reclamation[]> {
    // Implémentez la logique de recherche ici
    // Par exemple, vous pouvez effectuer une requête HTTP avec le texte de recherche
    return this.http.get<Reclamation[]>(`${this.baseUrl}/search?text=${searchText}`);
  }
}
