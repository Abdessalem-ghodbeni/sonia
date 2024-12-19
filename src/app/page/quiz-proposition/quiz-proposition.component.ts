import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizPropositionService } from '../../services/quiz-proposition.service';
import { QuizProposition } from '../../Modeles/quiz-proposition';


@Component({
  selector: 'app-quiz-proposition',
  templateUrl: './quiz-proposition.component.html',
  styleUrls: ['./quiz-proposition.component.css']
})
export class QuizPropositionComponent implements OnInit {

  quizPropositions: QuizProposition[] = [];
  quizPropositionForm: FormGroup;
  UpdatequizPropositionForm:FormGroup;
  selectedProposition: QuizProposition | null = null;

  constructor(
    private quizPropositionService: QuizPropositionService,
    private fb: FormBuilder){}


  ngOnInit(): void {
    // Initialisez votre composant si nécessaire
  }

  // Créer une nouvelle proposition

  createQuizPropositionForm(): void {
    this.quizPropositionForm= this.fb.group({
      description: ['', Validators.required],
      created_at: ['', Validators.required], 
      questionId: ['', Validators.required]
    });
  }

  // Mettre à jour une proposition existante
  updateQuizProposition(id: number): void {
    this.quizPropositionForm= this.fb.group({
      description: ['', Validators.required],
      created_at: ['', Validators.required], 
      questionId: ['', Validators.required]
    });
  }

  // Supprimer une proposition
  deleteQuizProposition(id: number): void {
    this.quizPropositionService.deleteQuizProposition(id).subscribe(() => {
      this.quizPropositions = this.quizPropositions.filter(prop => prop.id !== id);
    });
  }

  // Charger toutes les propositions pour une question donnée
  loadPropositionsForQuestion(questionId: number): void {
    this.quizPropositionService.getAllPropositionsForQuestion(questionId)
      .subscribe((data: any) => {
        this.quizPropositions = data.quiz;
      });
  }

  // Sélectionner une proposition pour la modification
  selectPropositionForEdit(proposition: QuizProposition): void {
    this.selectedProposition = proposition;
    this.quizPropositionForm.patchValue(proposition);
  }
}

