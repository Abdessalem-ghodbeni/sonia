import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Classe } from '../../modeles/classe';
import Swal from 'sweetalert2';
import { ClasseService } from '../../services/classe.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule,NgxPaginationModule],
})
export class ClasseComponent implements OnInit {
  Classe: Classe = new Classe();  
  classes: Classe[] = [];       
  classe: number = 1
  formajout!: FormGroup;         
  formupdate!: FormGroup;        
  selectedClasse!: Classe;         

  constructor(
    private classeService: ClasseService, 
    private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAllClasses();

    
    this.formajout = this.formbuilder.group({
      nom: ['', Validators.required],  
    });

    this.formupdate = this.formbuilder.group({
      id: ['', Validators.required],  
      nom: ['', Validators.required],  
    });
  }

  
  getAllClasses() {
    this.classeService.getAllClasse().subscribe(
      (res: Classe[]) => {
        this.classes = res;  
        console.log('Liste des classes', this.classes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes', error);
      }
    );
  }

  addClasse() {
    if (this.formajout.valid) {
      this.Classe.nom = this.formajout.value.nom; 
      this.classeService.addClasse(this.Classe).subscribe(
        (res) => {
          Swal.fire('Succès', 'La classe a été ajoutée avec succès', 'success');
          this.getAllClasses();  
          this.formajout.reset(); 
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de l\'ajout de la classe', 'error');
          console.error('Erreur lors de l\'ajout', error);
        }
      );
    }
  }

  onReset(): void {
    this.formajout.reset()
    this.getAllClasses()
 //   this.router.navigateByUrl('/classe')
  }

  openUpdateModal(classe: any) {
   // this.selectedClasse = classe;  
    this.formupdate.patchValue({   
      id: classe.id,
      nom: classe.nom,
    });
  }

  // Méthode pour mettre à jour une classe
  updateClasse() {
    if (this.formupdate.valid) {
    //  const updatedClasse: Classe = this.formupdate.value; 
      this.classeService.updateClasse(this.formupdate.value.id, this.formupdate.value).subscribe(
        (res) => {
          Swal.fire('Succès', 'La classe a été mise à jour avec succès', 'success');
          this.getAllClasses(); 
          this.formupdate.reset(); 
        },
        (error) => {
          Swal.fire('Erreur', 'Erreur lors de la mise à jour de la classe', 'error');
          console.error('Erreur lors de la mise à jour', error);
        }
      );
    }
  }

  // Méthode pour supprimer une classe
  deleteClasse(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classeService.deleteClasse(id).subscribe(
          (res) => {
            Swal.fire('Supprimé !', 'La classe a été supprimée avec succès.', 'success');
            this.getAllClasses();  
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression de la classe', 'error');
            console.error('Erreur lors de la suppression', error);
          }
        );
      }
    });
  }
}
