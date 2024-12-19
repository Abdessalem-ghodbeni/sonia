import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reclamation } from '../../modeles/reclamation';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationsComponent implements OnInit {
  // reclamation : Reclamation[] = new Reclamation ();
  reclamation :Reclamation = new Reclamation();
  formAjout: FormGroup;
  formUpdate: FormGroup;
  selectedReclamation!: Reclamation;
 

  constructor(
    private reclamationService: ReclamationService,
    private fb: FormBuilder
  ) {
    this.formAjout = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statut: ['', Validators.required]
    });

    this.formUpdate = this.fb.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statut: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  // Récupérer toutes les réclamations
  getAllReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (res: Reclamation[]) => {
       // this.reclamation = res;
        console.log('Liste des réclamations', this.reclamation);
      },
      (error) => {
        console.error('Erreur lors de la récupération des réclamations', error);
      }
    );
  }
  

 // Ajouter une réclamation
  addReclamation() {
    this.reclamationService.createReclamation(this.formAjout.value).subscribe(
      (res: Reclamation) => {
        Swal.fire('Succès', 'Réclamation ajoutée avec succès', 'success');
        this.getAllReclamations();
        this.formAjout.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réclamation', error);
      }
    );
  }

  // Ouvrir le formulaire de mise à jour


  openUpdateModal(reclamation: any) {
    this.formUpdate.patchValue({
      id: reclamation.id,
      titre: reclamation.titre,
      description: reclamation.description,
      statut: reclamation.statut
    });
  }

  // Mettre à jour la réclamation
  updateReclamation() {
    const reclamation = this.formUpdate.value;
    this.reclamationService.updateReclamation(reclamation.id, reclamation).subscribe(
      (res: any) => {
        Swal.fire('Succès', 'Réclamation mise à jour avec succès', 'success');
        this.getAllReclamations();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la réclamation', error);
      }
    );
  }

  // Supprimer une réclamation
  deleteReclamation(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer cette réclamation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reclamationService.deleteReclamation(id).subscribe(
          () => {
            Swal.fire('Supprimée', 'Réclamation supprimée avec succès', 'success');
            this.getAllReclamations();
          },
          (error) => {
            console.error('Erreur lors de la suppression de la réclamation', error);
          }
        );
      }
    });
  }
}
