import { Component, OnInit } from '@angular/core';
import { Note } from '../../Modeles/note';
import { NoteService } from '../../services/note.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  notesByQuizForm: Note[] = [];
  notesByEtudiant: Note[] = [];
  quizFormId: number = 1;  
  etudiantId: number = 1;  

  constructor(private noteService:NoteService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getNotesByQuizForm();
    this.getNotesByEtudiant();
  }

  getNotesByQuizForm(): void {
    this.noteService.getNotesByQuizForm(this.quizFormId).subscribe(
      (notes) => this.notesByQuizForm = notes,
      (error) => console.error('Erreur lors de la récupération des notes par QuizForm', error)
    );
  }

  getNotesByEtudiant(): void {
    this.noteService.getNotesByEtudiant().subscribe(
      (notes) => this.notesByEtudiant = notes,
      (error) => console.error('Erreur lors de la récupération des notes par étudiant', error)
    );
  } 

}
