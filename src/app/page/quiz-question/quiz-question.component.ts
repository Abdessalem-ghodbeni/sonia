import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { QuizQuestionService } from '../../services/quiz-question.service';
import { QuizQuestion } from '../../Modeles/quiz-question';
import { QuizProposition } from '../../Modeles/quiz-proposition';
import { QuizPropositionService } from '../../services/quiz-proposition.service';
import Swal from 'sweetalert2';
import { log } from 'console';
import { QuizResponseService } from '../../services/quiz-response.service';
import { QuizformService } from '../../services/quizform.service';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  quizForm: FormGroup;
  questionGroup:FormGroup
  showFormFlags: boolean[] = []; // Indique si le formulaire d'une question est visible
  showPropositionButton: boolean = false;
  createdQuestionId: number | null = null;
  createdQuestionTitle: string = ''; // Titre de la question créée
  showButtons: boolean = true; // Contrôle l'affichage des boutons "Enregistrer" et "Supprimer"
  propositions: QuizProposition[] = []; // Stocke les propositions associées à la question créée
  showForm: boolean = true; 
  currentQuestionIndex: number = 0; // Index de la question actuelle
  id = this.activatedRoute.snapshot.params['id']
  constructor(private fb: FormBuilder,
     private quizQuestionService:QuizQuestionService, 
     private quizPropositionService: QuizPropositionService, 

     private myService:QuizResponseService,
     private activatedRoute: ActivatedRoute) {
 
  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      questions: this.fb.array([]) // Tableau pour les questions
    });
  }

  // Getter pour accéder aux questions
  get questions(): FormArray {
    return this.quizForm?.get('questions') as FormArray;
  }

  // Ajouter une question
  addQuestion(): void {
    const questionGroup = this.fb.group({
      id: [null],
      quizFormId: [this.id, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(1)]],
      propositions: this.fb.array([])  // FormArray pour les propositions de cette question
    });
  
    this.questions.push(questionGroup);
    this.currentQuestionIndex = this.questions.length - 1; // Définit la dernière question comme active
    this.showForm = true;
    this.showButtons = true;
    this.showPropositionButton = false;
    this.showFormFlags.push(true); // Affiche le formulaire pour la nouvelle question
  }
  

  // Supprimer une question
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
    this.showFormFlags.splice(index, 1); // Supprime l'état associé
  }

  // Getter pour accéder aux propositions d'une question
  getPropositions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('propositions') as FormArray;
  }

  // Ajouter une proposition à une question
  addProposition(questionIndex: number): void {
    const propositionGroup = this.fb.group({
      id: [null],
      description: ['', Validators.required],
       saved: [false]  // Ajouter le champ isChecked
    });
  
    this.getPropositions(questionIndex).push(propositionGroup);
  }
  

  

  // Supprimer une proposition
  removeProposition(questionIndex: number, propositionIndex: number): void {
    this.getPropositions(questionIndex).removeAt(propositionIndex);
  }


    onSubmit(index: number): void {
      const questionForm = this.questions.at(this.currentQuestionIndex); // Utiliser l'index de la question actuelle
      
      questionForm.patchValue({
        quizFormId: this.id,
      });const quizData = questionForm.value;
    
      this.quizQuestionService.createQuizQuestion(quizData).subscribe({
        next: (response) => {
          console.log('Quiz créé avec succès', response);
          this.showFormFlags[index] = false; // Masque le formulaire de cette question
          // Mettez à jour l'ID ou d'autres informations si nécessaire
          this.loadPropositions(response.id);
          this.showForm = false;
          console.log('showForm:', this.showForm);
          this.showButtons = false;
        //  this.reset(); // Réinitialiser pour la prochaine question
        this.createdQuestionId = response.id; // Si l'ID est renvoyé depuis l'API
        console.log('id de quizquedt  est 44566', response.id);
        this.showPropositionButton = true; // Affiche le bouton pour ajouter des propositions
        this.questionGroup.get('id')?.setValue(this.createdQuestionId); // Met à jour l'ID dans le formulaire
        this.createdQuestionTitle = response.title; 
       
       
        this.loadPropositions(response.id);
        this.loadPropositions(this.createdQuestionId); // Charge les propositions
       
      },
      error: (err) => {
        console.error('Erreur lors de la création du quiz', err);
      }
    });
  }
  
  
  reset() {
    this.questions.reset();  // Réinitialiser le formulaire de questions
    this.showForm = true;    // Si vous souhaitez réafficher le formulaire

  }
  
  // Méthode pour soumettre les propositions
 // Méthode pour soumettre les propositions
 submitPropositions(questionIndex: number): void {
  const propositions = this.getPropositions(questionIndex).controls;

  propositions.forEach((propositionControl) => {
    const propositionData: QuizProposition = propositionControl.value;

    // Ajoutez l'ID de la question à la proposition avant de l'envoyer
    propositionData.questionId = this.createdQuestionId;

    // Créer la proposition via le service
    this.quizPropositionService.createQuizProposition(propositionData).subscribe({
      next: (response) => {
        // Réinitialiser le formulaire après la soumission réussie
        this.resetPropositionsForm(questionIndex);
        Swal.fire("Proposition créée avec succès")
        console.log('Proposition créée avec succès', response);
        
        // Charger les propositions de la question après la création
        this.loadPropositions(this.createdQuestionId);
      },
      error: (err) => {
        console.error('Erreur lors de la création de la proposition', err);
      }
    });
  });
}

 // Méthode pour réinitialiser le formulaire de propositions
resetPropositionsForm(questionIndex: number): void {
  const propositionsArray = this.getPropositions(questionIndex);
  
  // Efface toutes les propositions
  propositionsArray.clear(); 
  
  // Optionnel : Vous pouvez également ajouter une nouvelle proposition vide si nécessaire
  this.addProposition(questionIndex);
} 
/* reset(){
  this.questionGroup.reset()
}
 */
filteredPropositions:any
loadPropositions(createdQuestionId:any): void {
  if (this.createdQuestionId) {
    this.quizPropositionService.getAllPropositionsForQuestion(createdQuestionId).subscribe({
      next: (propositions: any) => {
        this.propositions = propositions.quiz;  // Stocker les propositions
        console.log("listprop",this.propositions)
        this.filteredPropositions = this.propositions.filter(proposition => proposition.questionId === createdQuestionId);
        console.log("145555fofiff",this.filteredPropositions)
      },
      error: (err) => {
        console.error('Erreur lors du chargement des propositions', err);
      }
    });
  }
}




editQuestion(index: number): void {
  this.showFormFlags[index] = true; // Rendre le formulaire visible
}



resppnsedelete:any
onCheckboxChange(proposition: any, event: any) {
  const isChecked = event.target.checked;

  if (isChecked) {
    // Si la case est cochée, appelez la fonction saveresponse
    const request = { proposition: proposition.id }; // Format du payload attendu
    this.myService.saveresponse(request).subscribe({
      next: (response) => {
        this.resppnsedelete=response
        console.log('Response saved:', response);
        Swal.fire("Reponse checked")
        proposition.isChecked = true; // Mettez à jour l'état local
      },
      error: (err) => {
        console.error('Error saving response:', err);
        proposition.isChecked = false; // Réinitialisez en cas d'erreur
      }
    });
  } else {
    // Si la case est décochée, appelez la fonction deleteresponse
    this.myService.deleteresponse(this.resppnsedelete.id).subscribe({
      next: () => {
        console.log('Response deleted:', proposition.id);
        Swal.fire("Reponse unchecked")
        proposition.isChecked = false; // Mettez à jour l'état local
      },
      error: (err) => {
        console.error('Error deleting response:', err);
        proposition.isChecked = true; // Réinitialisez en cas d'erreur
      }
    });
  }
}
  
  // Ajouter une nouvelle question
/*   addQuestion(): void {
    const newQuestion = new QuizQuestion();
    this.quiz.questions.push(newQuestion);
    // Ajouter une proposition par défaut pour la nouvelle question
    this.addProposition(this.quiz.questions.length - 1);
  } */

  // Ajouter une proposition pour une question spécifique
/*   addProposition(questionIndex: number): void {
    const newProposition = new QuizProposition();
    newProposition.questionId = this.quiz.questions[questionIndex].id; // Lier la proposition à l'ID de la question
    this.quiz.questions[questionIndex].propositions.push(newProposition);
  } */






  

/*   // Charger toutes les questions d'un quiz
  loadAllQuizQuestions(quizFormId: number): void {
    this.quizQuestionService.getAllQuizQuestions(quizFormId).subscribe({
      next: (questions) => this.quizQuestions = questions,
      error: (err) => console.error(err)
    });
  }
 

 
  // Supprimer une question de quiz
  deleteQuizQuestion(id: number): void {
    this.quizQuestionService.deleteQuizQuestion(id).subscribe({
      next: () => this.quizQuestions = this.quizQuestions.filter(q => q.id !== id),
      error: (err) => console.error(err)
    });
  }

   createQuizQuestionForm(): void {
     this.quizQuestionForm = this.fb.group({
       titre: ['', Validators.required],
       description: ['', Validators.required],
       points: [0, [Validators.required, Validators.min(1)]], 
       quizFormId: ['', Validators.required]
     });
   }

 
   createUpdateQuizQuestionForm(): void {
     this.UpdateQuizQuestionForm = this.fb.group({
       id: ['', Validators.required],
       titre: ['', Validators.required],
       description: ['', Validators.required],
       points: [0, [Validators.required, Validators.min(1)]],
       quizFormId: ['', Validators.required]
     });
   }

 
  // Modifier la réponse correcte d'une question
  correctProposition(idQuestion: number, idProposition: number): void {
    this.quizQuestionService.correctProposition(idQuestion, idProposition).subscribe({
      next: () => console.log('Réponse correcte modifiée'),
      error: (err) => console.error(err)
    });
  } */
}
