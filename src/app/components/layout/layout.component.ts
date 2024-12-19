import { Component, OnInit } from '@angular/core';
import { CourService } from '../../services/cour.service';
import { Cour } from '../../Modeles/cour';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Utilisateur } from '../../Modeles/utilisateur';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  cours: Cour[] = [];
  utilisateurs: Utilisateur[] = [];  

  constructor(private serviceCour: CourService, private authService: AuthService) { }
  ngOnInit(): void {
    this.getAllCourses();
    this.getUtilisateurs()
  }
  getAllCourses(): void {
    this.serviceCour.getAllCours().subscribe((res: any) => {
      this.cours = res
      console.log("Liste des cours :", this.cours);
    }, (error) => {
      console.error("Erreur lors de la récupération des cours :", error);
    });
  }
  // Méthode pour récupérer les utilisateurs     
  getUtilisateurs(): void {
    this.authService.getAllUtilisateur().subscribe(
      (data: any) => { 
        this.utilisateurs = data.filter(
          (el: any) =>{
            return(
           el.role =='ENSEIGNANT' 
            )
       } );
        // this.utilisateurs = this.utilisateurs.filter((el:any) =>{
        //   el.role =='ENSEIGNANT'
        // })
        console.log("Liste des utilisateurs", this.utilisateurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

}
