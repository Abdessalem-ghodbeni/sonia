import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class QuizResponseService {

  private baseUrl = 'http://localhost:8080'; // Ton URL de backend

  constructor(private http: HttpClient) { }




  // Méthode pour soumettre les réponses du quiz
submitQuiz(quizFormId: number, responses: any[]): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/quiz-response/submit/${quizFormId}`, responses);
}
  saveresponse(responses:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz-response/create`, responses);
  }
  deleteresponse(id:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quiz-response/delete/${id}`);
  }
  
}
