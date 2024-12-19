import { Component, OnInit } from '@angular/core';
import { Cour } from '../../modeles/cour';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Classe } from '../../modeles/classe';
import { Utilisateur } from '../../modeles/utilisateur';
import { ClasseService } from '../../services/classe.service';
import { AuthserviceService } from '../../services/authservice.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  item : number = 1
  cour: Cour = new Cour();
  cours: Cour[] = [];
  classe: Classe[] = []
  enseignant: Utilisateur[] = []
  
  // formajout!: FormGroup;  
  formajout: FormGroup = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl(''),
    datedebut: new FormControl(''),
    datefin: new FormControl(''),
    enseignantId: new FormControl(''),
    classeId: new FormControl(''),
  })
  formupdate!: FormGroup;
  selectedCour!: Cour;
  isLoading = false;

  constructor(
    private CoursService: CoursService, private fb: FormBuilder, private router: Router, private classeService: ClasseService, private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.getAllCours();
    this.getAllClasses();
    this.getAllEnseignat();

    // Initialisation des formulaires
    this.formajout = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      enseignantId: ['', Validators.required],
      classeId: ['', Validators.required],
    });

    this.formupdate = this.fb.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      enseignantId: ['', Validators.required],
      classeId: ['', Validators.required],


    });
  }

  // Méthode pour récupérer tous les cours
  getAllCours() {
    this.CoursService.getAllCours().subscribe(
      (res: Cour[]) => {
        this.cours = res;
        console.log('Liste des cours', this.cours);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }

  // Méthode pour ajouter un nouveau cours
  addCour() {
    // if (this.formajout.valid) {
    console.log(this.formajout.value);
    this.CoursService.addCour(this.formajout.value).subscribe(
      (res: Cour) => {
        Swal.fire('Succès', 'Le cours a été ajouté avec succès', 'success');
        console.log('res', res);

        this.getAllCours();
        this.formajout.reset();
      },
      (error) => {
        //  Swal.fire('Erreur', 'Erreur lors de l\'ajout du cours', 'error');
        console.error('Erreur lors de l\'ajout', error);
      }
    );
    // }
  }
  onReset(): void {
    this.formajout.reset()
    this.getAllCours()
    this.router.navigateByUrl('/cours')
  }
  onSubmit() {
    if (this.formajout.valid) {
      this.isLoading = true;
      console.log('Formulaire soumis:', this.formajout.value);

      setTimeout(() => {
        this.isLoading = false;
        alert('Cours ajouté avec succès !');
      }, 2000);
    }
  }


  // Méthode pour ouvrir un cours pour mise à jour
  openUpdateModal(cour: any) {
    // this.selectedCour = cour;
    this.formupdate.patchValue({
      id: cour.id,
      titre: cour.titre,
      description: cour.description,
      datedebut: cour.datedebut,
      datefin: cour.datefin,
      enseignantId : cour.enseignantId.nom,
      classeId : cour.classeId.nom

    });
  }
  //methode  
  // search() {
  // this.lists= this.lists.filter(item =>item.type.toLocaleLowerCase()==this.searchText.toLocaleLowerCase() || item.type.includes(this.searchText))

  //}

  // Méthode pour mettre à jour un cours
  updateCour() {
   // if (this.formupdate.valid) {
     // const updatedCour: Cour = this.formupdate.value;

      this.CoursService.updateCour(this.formupdate.value.id, this.formupdate.value).subscribe(
        (res:any) => {
          Swal.fire('Succès', 'Le cours a été mis à jour avec succès', 'success');
          this.getAllCours();
          console.log(res);
          
          //this.formupdate.reset(); 
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de la mise à jour du cours', 'error');
          console.error('Erreur lors de la mise à jour', error);
        }
      );
    
  }

  // Méthode pour supprimer un cours
  deleteCour(id: any, titre:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${titre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CoursService.deleteCour(id).subscribe(
          (res: any) => {
            Swal.fire('Deleted!', `You have deleted ${titre}!.`, 'success');
            console.log(res);
            this.getAllCours();
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression du cours', 'error');
            console.error('Erreur lors de la suppression', error);
          }
        );
      }
    });
  }

  // Méthode pour obtenir un cours par son ID (optionnel)
  getCourById(id: number) {
    this.CoursService.getCourById(id).subscribe(
      (res: Cour) => {
        console.log('Détails du cours', res);
      },
      (error) => {
        console.error('Erreur lors de la récupération du cours', error);
      }
    );
  }

  getAllClasses() {
    this.classeService.getAllClasse().subscribe(
      (res: Classe[]) => {
        this.classe = res;
        console.log('Liste des classes', this.classe);
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes', error);
      }
    );
  }
  getAllEnseignat() {
    this.authService.getUtilisateurs().subscribe(
      (res: Utilisateur[]) => {
        this.enseignant = res.filter(
          (el: any) => el.role == 'ENSEIGNANT');;
        console.log('Liste des enseignant', this.enseignant);
      },
      (error) => {
        console.error('Erreur lors de la récupération des enseignant', error);
      }
    );
  }
}             