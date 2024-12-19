import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion } from '../Modeles/quiz-question';
import { QuizProposition } from '../Modeles/quiz-proposition';


@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {
  private baseUrl = 'http://localhost:8080/quiz-question';

  constructor(private http: HttpClient) {}
  

  createQuizQuestion(QuizQuestion:QuizQuestion): Observable<QuizQuestion> {
  return this.http.post<QuizQuestion>(`${this.baseUrl}/create`,QuizQuestion);
  }


  updateQuizQuestion(QuizQuestion:QuizQuestion, id: number): Observable<QuizQuestion> {
    return this.http.put<QuizQuestion>(`${this.baseUrl}/update/${id}`,QuizQuestion);
  }

  deleteQuizQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getAllQuizQuestions(quizFormId: number): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.baseUrl}/all/${quizFormId}`);
  }

  correctProposition(idQuestion: number, idProposition: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/correct-proposition/${idQuestion}/${idProposition}`, {});
  }
  createQuizProposition(request: Partial<QuizProposition>): Observable<QuizProposition> {
    return this.http.post<QuizProposition>(`${this.baseUrl}/create`, request);
  }
}


