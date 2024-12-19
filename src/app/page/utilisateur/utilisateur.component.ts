import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../Modeles/etudiant';
import { Parent } from '../../Modeles/parent';
import { Enseignant } from '../../Modeles/enseignant';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {

  etudiants: Etudiant[] = [];
  parents: Parent[] = [];
  enseignants: Enseignant[] = [];
  errorMessage = '';
  constructor(private utilisateurService :UtilisateurService){}

ngOnInit(): void {
  this.fetchEtudiants();
  this.fetchParents();
  this.fetchEnseignants();
  
}
fetchEtudiants(): void {
  this.utilisateurService.listEtudiants().subscribe({
    next: (data) => (this.etudiants = data),
    error: (error) => {
      console.error('Erreur lors de la récupération des étudiants:', error);
      this.errorMessage = 'Erreur lors de la récupération des étudiants';
    },
  });
}

fetchParents(): void {
  this.utilisateurService.listParents().subscribe({
    next: (data) => (this.parents = data),
    error: (error) => {
      console.error('Erreur lors de la récupération des parents:', error);
      this.errorMessage = 'Erreur lors de la récupération des parents';
    },
  });
}

fetchEnseignants(): void {
  this.utilisateurService.listEnseignants().subscribe({
    next: (data) => (this.enseignants = data),
    error: (error) => {
      console.error('Erreur lors de la récupération des enseignants:', error);
      this.errorMessage = 'Erreur lors de la récupération des enseignants';
    },
  });
}
}
