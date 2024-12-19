import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supportcour } from '../Modeles/supportcour';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportCoursService {
  private baseUrl = 'http://localhost:8080/support-cours'; 

  constructor(private http: HttpClient) {}

  // access_token = localStorage.getItem('access_token')!;
  // headersoption = new HttpHeaders({
  //   Authorization: 'Bearer ' + this.access_token
  // });    

  createSupportCours( supportcours: any): Observable<Supportcour> {
    return this.http.post<Supportcour>(`${this.baseUrl}/creat`, supportcours/*, { headers: this.headersoption }*/);
  }     
 
  updateSupportCours(id: number, formData: Supportcour): Observable<Supportcour> {
    return this.http.put<Supportcour>(`${this.baseUrl}/update/${id}`, formData);
  }
         
  deleteSupportCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getTypeQuiz(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/TypeQuiz`/*, { headers: this.headersoption }*/);
  }

  getQuizByCoursId(coursId: number): Observable<Supportcour[]> {
    return this.http.get<Supportcour[]>(`${this.baseUrl}/quiz/cours/${coursId}`);
  }
}     
    