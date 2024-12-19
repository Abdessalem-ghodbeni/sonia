import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizformService } from '../../services/quizform.service';
import { CommonModule } from '@angular/common';
import { QuizForm } from '../../Modeles/quiz-form';
import { SupportCoursService } from '../../services/supportcour.service';
import { ActivatedRoute, Router, RouterConfigOptions, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quizform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './quizform.component.html',
  styleUrl: './quizform.component.css'
})
export class QuizformComponent {
  quizForms: QuizForm[] = [];
  form: FormGroup;
  quizFormGroup!: FormGroup;
  typeQuiz:any
  id=this.activeroute.snapshot.params["id"]
  constructor(
    private router:Router,
    private supportcourService: SupportCoursService,
    private quizFormService: QuizformService,
    private fb: FormBuilder,
    private activeroute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadQuizForms();
    this.initializeForm();
    this.getTypeQuiz()

    this.form = this.fb.group({
      
      description: ['', Validators.required],    
      supportcoursId: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  

  getTypeQuiz(): void {
    this.supportcourService.getTypeQuiz().subscribe((res: any) => {
      this.typeQuiz = res
      console.log("type quiz", this.typeQuiz);
    })
  }





  quizform(): void {
    this.form.patchValue({
      supportcoursId:this.id ,
    });
    this.quizFormService.createQuizForm(this.form.value).subscribe({
      next: (result) => {
        // alert("Création avec succès !");
         Swal.fire("created")
         console.log("Résultat :", result);
         this.router.navigate([`quizquestion`, result.id]);

      },
      error: (err) => {
        console.error("Erreur lors de la création :", err);
        alert("Erreur lors de la création.");
      },
    });
  }



  // Charger tous les QuizForms
  loadQuizForms(): void {
    this.quizFormService.getQuizForms().subscribe((data) => {
      this.quizForms = data;
    });
  }

  // Initialiser le formulaire réactif
  initializeForm(): void {
    this.quizFormGroup = this.fb.group({
      description: [''],
      quizQuestions: this.fb.array([])
    });
  }

  // Accéder au FormArray des questions
  get quizQuestions(): FormArray {
    return this.quizFormGroup.get('quizQuestions') as FormArray;
  }

  // Ajouter une question au formulaire
  addQuizQuestion(): void {
    const questionGroup = this.fb.group({
      title: [''],
      description: [''],
      points: [0],
      quizPropositions: this.fb.array([])
    });
    this.quizQuestions.push(questionGroup);
  }

  // Accéder aux propositions dans une question
  getQuizPropositions(index: number): FormArray {
    return this.quizQuestions.at(index).get('quizPropositions') as FormArray;
  }

  // Ajouter une proposition à une question
  addQuizProposition(questionIndex: number): void {
    const propositionGroup = this.fb.group({
      title: [''],
      description: ['']
    });
    this.getQuizPropositions(questionIndex).push(propositionGroup);
  }

  // Enregistrer le formulaire
  saveQuizForm(): void {
    const quizForm: QuizForm = this.quizFormGroup.value;
    this.quizFormService.createQuizForm(quizForm).subscribe((response) => {
      console.log('Quiz Form créé avec succès:', response);
      this.loadQuizForms();
    });
  }
}
