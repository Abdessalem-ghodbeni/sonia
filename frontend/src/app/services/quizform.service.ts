import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizForm } from '../Modeles/quiz-form';

@Injectable({
  providedIn: 'root'
})
export class QuizformService {
  private apiUrl = 'http://localhost:8080/api/quizForms';

  constructor(private http: HttpClient) {}

  createQuizForm(quizForm: QuizForm): Observable<QuizForm> {
    return this.http.post<QuizForm>(`${this.apiUrl}/create`, quizForm);
  }




  
  getQuizForms(): Observable<QuizForm[]> {
    return this.http.get<QuizForm[]>(`${this.apiUrl}/create`);
  }

  // Récupérer un QuizForm spécifique par ID  
  getQuizFormById(id: number): Observable<QuizForm> {
    return this.http.get<QuizForm>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un QuizForm
  updateQuizForm(id: number, quizForm: QuizForm): Observable<QuizForm> {
    return this.http.put<QuizForm>(`${this.apiUrl}//${id}`, quizForm);
  }

  // Supprimer un QuizForm
  deleteQuizForm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}//${id}`);
  }
}

