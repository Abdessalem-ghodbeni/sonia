import { Component, OnInit } from '@angular/core';
import { QuizformService } from '../../services/quizform.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizResponseService } from '../../services/quiz-response.service';

@Component({
  selector: 'app-quiztest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiztest.component.html',
  styleUrl: './quiztest.component.css'
})
export class QuiztestComponent implements OnInit{
  isAnswerDisabled: boolean = false; // Gestion de l'état des réponses
  timeLimit: number = 20; // Temps initial pour répondre à une question (en secondes)
  timeRemaining: number = this.timeLimit; // Temps restant dynamique
  timerInterval: any; // Variable pour stocker l'intervalle

  currentQuestionIndex: number = 0;
  selectedAnswers: any[] = [];
  resultat: any;

  constructor(private quizformservice: QuizformService,private quizreponse:QuizResponseService) {}

  ngOnInit(): void {
    this.getformbyid(13);
  }

  getformbyid(id: any): void {
    this.quizformservice.getQuizFormById(id).subscribe({
      next: (res: any) => {
        this.resultat = res;
        if (this.resultat && Array.isArray(this.resultat.quizQuestions)) {
          this.startTimer();
        }
      },
      error: (err) => console.error('Erreur', err),
    });
  }

  startTimer() {
    this.clearTimer();
    this.timeRemaining = this.timeLimit;

    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        if (this.currentQuestionIndex === this.resultat.quizQuestions.length - 1) {
          this.isAnswerDisabled = true;
          console.log('Temps écoulé pour la dernière question.');
          this.clearTimer();
        } else {
          this.nextQuestion();
        }
      }
    }, 1000);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.resultat.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.isAnswerDisabled = false; // Réactiver les réponses pour la nouvelle question
      this.startTimer();
    } else {
      this.submitQuiz();
    }
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }


  // Fonction pour revenir à la question précédente
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--; // Décrémenter l'index de la question
      this.startTimer(); // Redémarrer la minuterie pour la question précédente
    }
  }


/*   // Fonction pour gérer la sélection de réponse
  onAnswerSelect(questionId: number, proposition: string) {
    console.log(`Question ${questionId}, Selected Answer: ${proposition}`);
    // Passer à la question suivante une fois qu'une réponse est choisie
    this.nextQuestion();
  } */
// Fonction pour gérer la sélection de réponse
onAnswerSelect(questionId: number, proposition: string) {
  console.log(`Question ${questionId}, Selected Answer: ${proposition}`);
  this.selectedAnswers.push({ questionId, proposition });
 // this.nextQuestion();
}


resultatquiz:any
   // Fonction pour soumettre le quiz
   submitQuiz() {
    this.clearTimer(); // Arrêter la minuterie
    console.log('Quiz submitted');

    // Appeler le service pour soumettre les réponses du quiz
    const quizResponses = this.selectedAnswers.map(answer => ({
      question: answer.questionId,
      propositionResponse: answer.proposition,
    }));

    this.quizreponse.submitQuiz(13, quizResponses).subscribe({
      next: (res: any) => {
        this.resultatquiz=res
        console.log('Résultats du quiz:', res);
        // Ici vous pouvez afficher les résultats à l'utilisateur
      },
      error: (err) => {
        console.error('Erreur lors de la soumission du quiz:', err);
      }
    });
  }
}

