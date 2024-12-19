import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, RouterLink } from '@angular/router';

import { QuizResponseService } from '../../services/quiz-response.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizResponseRequest } from '../../Modeles/quiz-response-request';



@Component({
  selector: 'app-quiz-submit',
  standalone: true,
  imports: [CommonModule,RouterLink],
  //templateUrl: './submit/{quizFormId}',
  templateUrl: './quiz-response.component.html',
  styleUrls: ['./quiz-response.component.css']
})
export class QuizSubmitComponent implements OnInit {    

  quizFormId!: number;
  responses: QuizResponseRequest[] = [];
  quizreponseForm: FormGroup;
  resultMessage: string = '';

  constructor(
    private quizResponseService: QuizResponseService,private Fb:FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // On récupère l'ID du quiz à partir de l'URL
    this.quizFormId = +this.route.snapshot.paramMap.get('quizFormId')!;
  }   

  onSubmit(): void {
    this.quizResponseService.submitQuiz(this.quizFormId, this.responses).subscribe(
      (response) => {
        this.resultMessage = response.phrase;
      },
      (error) => {
        console.error('Erreur lors de la soumission du quiz', error);
      }
    );
  }

  // Ajoute les méthodes pour capturer les réponses aux questions ici
  addResponse(questionId: number, propositionId: number): void {
    const response: QuizResponseRequest = {
      question: questionId,
      propositionResponse: propositionId
    };
    this.responses.push(response);
  }
}
