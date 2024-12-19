import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supportcour } from '../../Modeles/supportcour';
import { SupportCoursService } from '../../services/supportcour.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourService } from '../../services/cour.service';
import { Cour } from '../../Modeles/cour';
import { log } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-supportcour',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supportcour.component.html',
  styleUrls: ['./supportcour.component.css']
})
export class SupportcourComponent implements OnInit {
  userconnect = JSON.parse(localStorage.getItem('access_token')!);
  //id = this.activatedRoute.snapshot.params['id'];
  supportcours: Supportcour[] = [];
  supportCourRequest: Supportcour = new Supportcour();
  supportcourForm!: FormGroup;
  updateForm!: FormGroup;
  user!:any;
  // typeQuiz: any         
  typeQuiz: Supportcour[]
  
  filetoupload: ReadonlyArray<File> = []
  cours: Cour[] = [];
  constructor(private fb: FormBuilder,
    private supportcourService: SupportCoursService,
    private activatedRoute: ActivatedRoute,
    private serviceCour: CourService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    // this.createSupportcourForm();
    //this.createUpdateForm();
    //this.loadSupportcours();
    this.getTypeQuiz();
    this.getAllCourses()
   this.user = JSON.parse(localStorage.getItem('user')!);
console.log("ridha",this.user.role)
    this.supportcourForm = this.fb.group({
      typeSupportCours: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required],
      type: ['', Validators.required],
      coursId: ['', Validators.required],    
      enseignantId: ['', Validators.required]
    });
  }
  handlefileinput(files: any) {   //fonction bech ta9ra l image
    this.filetoupload = <ReadonlyArray<File>>files.target.files
    console.log(this.filetoupload)
  }
  createSupportCour(): void {

    this.supportcourForm.patchValue({
     
       enseignantId: this.userconnect.id,
    });
    let formdata = new FormData();
    formdata.append("enseignantId", this.supportcourForm.value.enseignantId.toString());
    formdata.append("typeSupportCours", this.supportcourForm.value.typeSupportCours);
    formdata.append("description", this.supportcourForm.value.description);
    formdata.append("typeQuiz", this.supportcourForm.value.type);
    formdata.append("coursId", this.supportcourForm.value.coursId);
    formdata.append("file", this.filetoupload[0]);
  

    this.supportcourService.createSupportCours(formdata).subscribe({
      next: (result) => {
        Swal.fire("Création avec succès !");
        console.log("Résultat :", result);
      if(result){
        this.router.navigate(['/qform', result.id]);
      }
        
      },
      error: (err) => {
        console.error("Erreur lors de la création :", err);
        alert("Erreur lors de la création.");
      },
    });
  }
  
  getTypeQuiz(): void {
    this.supportcourService.getTypeQuiz().subscribe((res: any) => {
      this.typeQuiz = res
      console.log("type quiz", this.typeQuiz);
    })
  }
  getAllCourses(): void {
    this.serviceCour.getAllCours().subscribe((res: any) => {
      this.cours = res
      // .filter(
      //   (el: any) => el.enseignantId.id == this.userconnect.id
      // );
      console.log("Liste des cours :", this.cours);
    }, (error) => {
      console.error("Erreur lors de la récupération des cours :", error);
    });
  }


  // Méthode pour initialiser le formulaire de création
  // createSupportcourForm(): void {
  //   this.supportcourForm = this.fb.group({
  //     typeSupportCours: ['', Validators.required],
  //     description: ['', Validators.required],
  //     image: ['', Validators.required],
  //     typeQuiz: ['', Validators.required],
  //     coursId: ['', Validators.required],
  //     enseignantId: ['', Validators.required]
  //   });
  // }

  // Méthode pour initialiser le formulaire de mise à jour
  /*  createUpdateForm(): void {
     this.updateForm = this.fb.group({
       id: ['', Validators.required],
       typeSupportCours: ['', Validators.required],
       description: ['', Validators.required],
       image: ['', Validators.required],
       typeQuiz: ['', Validators.required],
       coursId: ['', Validators.required],
       enseignantId: ['', Validators.required]
     });
   } */
  /*  loadSupportcours(): void {
     this.supportcourService.getQuizByCoursId(1).subscribe((data: Supportcour[]) => {
       this.supportcours = data;
       console.log("data",this.supportcours);
       
     }, (error) => {
       console.error('Erreur lors du chargement des supports de cours', error);
     });  
 
   } */
  /*   createSupportcour(): void {
      if (this.supportcourForm.valid) {
        const newSupportcour = this.supportcourForm.value;
        const sub = this.supportcourService.createSupportCours(newSupportcour).subscribe(() => {
          this.loadSupportcours(); // Recharger la liste après la création
        }, (error) => {
          console.error('Erreur lors de la création du support de cours', error);
        });
  
      }
    } */

  /*   updateSupportcour(): void {
      if (this.updateForm.valid) {
        const updatedSupportcour = this.updateForm.value;
        const sub = this.supportcourService.updateSupportCours(updatedSupportcour.id, updatedSupportcour).subscribe(() => {
          this.loadSupportcours(); // Recharger la liste après la mise à jour
        }, (error) => {
          console.error('Erreur lors de la mise à jour du support de cours', error);
        });
  
      }
    } */
  /*  deleteSupportcour(id: number): void {
     const sub = this.supportcourService.deleteSupportCours(id).subscribe(() => {
       this.supportcours = this.supportcours.filter(supportcour => supportcour.id !== id);
     }, (error) => {
       console.error('Erreur lors de la suppression du support de cours', error);
     });
 
   } */


}
