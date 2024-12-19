import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../Modeles/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl ='http://localhost:8080';

  constructor(private http:HttpClient) { }

  getNotesByQuizForm(quizFormId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/quiz-form/${quizFormId}`);
  }

  getNotesByEtudiant(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/etudiant`);
  }
    
  
}
