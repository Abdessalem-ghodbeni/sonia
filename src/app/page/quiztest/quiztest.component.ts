import { Component, OnInit } from '@angular/core';
import { QuizformService } from '../../services/quizform.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizResponseService } from '../../services/quiz-response.service';

@Component({
  selector: 'app-quiztest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiztest.component.html',
  styleUrl: './quiztest.component.css',
})
export class QuiztestComponent implements OnInit {
  isAnswerDisabled: boolean = false; // Gestion de l'état des réponses
  timeLimit: number = 20; // Temps initial pour répondre à une question (en secondes)
  timeRemaining: number = this.timeLimit; // Temps restant dynamique
  timerInterval: any; // Variable pour stocker l'intervalle

  currentQuestionIndex: number = 0;
  selectedAnswers: any[] = [];
  resultat!: any;
  id!: number;
  Quiz_A_Passe!: any;
  nomUserFromLocaleStorage!: any;
  resultatquiz: any;
  showResults: boolean = false; // Pour gérer l'affichage des résultats

  constructor(
    private quizformservice: QuizformService,
    private quizreponse: QuizResponseService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUserData = JSON.parse(userData); // Convertir les données en objet JS
      this.nomUserFromLocaleStorage = parsedUserData.nom; // Affecter le rôle récupéré
    } else {
      console.log("Aucune donnée trouvée dans le localStorage pour 'user'.");
    }

    this.getformbyid(this.id);
  }

  toggleQuizResults() {
    this.showResults = !this.showResults;
  }

  // getformbyid(id: any): void {
  //   this.quizformservice.getQuizFormById(id).subscribe({
  //     next: (res: any) => {
  //       this.resultat = res;
  //       console.log('sonia', this.resultat);
  //       if (this.resultat && Array.isArray(this.resultat.quizQuestions)) {
  //         this.startTimer();
  //       }
  //     },
  //     error: (err) => console.error('Erreur', err),
  //   });
  // }

  getformbyid(id: any): void {
    this.quizformservice.getQuizFormById(id).subscribe({
      next: async (res: any) => {
        if (res && Array.isArray(res)) {
          this.resultat = res.sort(
            (a, b) =>
              new Date(b.lastUpdated_at).getTime() -
              new Date(a.lastUpdated_at).getTime()
          );
          await console.log('solo', this.resultat.length);
        } else {
          this.resultat = [];
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
        if (
          this.currentQuestionIndex ===
          this.Quiz_A_Passe?.quizQuestions.length - 1
        ) {
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
    if (
      this.currentQuestionIndex <
      this.Quiz_A_Passe?.quizQuestions.length - 1
    ) {
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

  // Fonction pour soumettre le quiz
  submitQuiz() {
    this.clearTimer(); // Arrêter la minuterie
    console.log('Quiz submitted');

    // Appeler le service pour soumettre les réponses du quiz
    const quizResponses = this.selectedAnswers.map((answer) => ({
      question: answer.questionId,
      propositionResponse: answer.proposition,
    }));

    this.quizreponse.submitQuiz(this.Quiz_A_Passe.id, quizResponses).subscribe({
      next: (res: any) => {
        this.resultatquiz = res;
        this.showResults = true;
        console.log('Résultats du quiz:', res);
        this.closeOffcanvas();
        this.showResults = true;
      },
      error: (err) => {
        console.error('Erreur lors de la soumission du quiz:', err);
      },
    });
  }

  lancerQuiz(id: number) {
    this.quizformservice.getFormulaireQuizSingle(id).subscribe(
      (response) => {
        this.Quiz_A_Passe = response as any;
        this.openOffcanvas();
      },
      (error) => {
        alert('somthing was warrning');
      }
    );
  }
  isOpen = false;

  openOffcanvas() {
    this.isOpen = true;
  }

  closeOffcanvas() {
    this.isOpen = false;
  }
}
