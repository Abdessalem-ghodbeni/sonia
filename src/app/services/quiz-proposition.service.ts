import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'; 
import { QuizProposition } from '../Modeles/quiz-proposition';

@Injectable({
  providedIn: 'root'
})
export class QuizPropositionService {

  private baseUrl = `http://localhost:8080/quiz-proposition`; 

  constructor(private http: HttpClient) {}

  // Créer une nouvelle proposition de quiz
 /*  createQuizProposition(request: Partial<QuizProposition>): Observable<QuizProposition> {
    return this.http.post<QuizProposition>(`${this.baseUrl}/create`, request);
  } */
  createQuizProposition(request:QuizProposition): Observable<QuizProposition> {
    return this.http.post<QuizProposition>(`${this.baseUrl}/create`, request);
  }
  // Mettre à jour une proposition existante
  updateQuizProposition(id: number, request: Partial<QuizProposition>): Observable<QuizProposition> {
    return this.http.put<QuizProposition>(`${this.baseUrl}/update/${id}`, request);
  }

  // Supprimer une proposition
  deleteQuizProposition(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Récupérer toutes les propositions d'une question
  getAllPropositionsForQuestion(questionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${questionId}`);
  }
}


