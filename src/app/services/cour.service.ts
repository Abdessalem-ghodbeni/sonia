import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cour } from '../Modeles/cour';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourService {

 
 private baseUrl = 'http://localhost:8080';     

  constructor(private http: HttpClient) { }            

  getAllCours(): Observable<Cour[]> {       
    return this.http.get<Cour[]>(`${environment.baseurl}/cours/all`);
  }

  addCour(cour: Cour): Observable<Cour> {
    return this.http.post<Cour>(`${this.baseUrl}/add-cour`, cour); 

  }

  updateCour(cour: Cour, id: number): Observable<Cour> {
    return this.http.put<Cour>(`${this.baseUrl}/update-cour/${id}`, cour);
  }

  deleteCour(id: number): Observable<Cour> {
    return this.http.delete<Cour>(`${this.baseUrl}/deleteCour/${id}`, { responseType: 'text' as 'json' });
  }

  getCourById(id: number): Observable<Cour> {
    return this.http.get<Cour>(`${this.baseUrl}/cour/${id}`);
  }
}
