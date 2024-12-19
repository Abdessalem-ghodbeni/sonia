import { Component, OnInit } from '@angular/core';
import { Classe } from '../../Modeles/classe';
import { ClasseService } from '../../services/classe.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface classe{
  id:number,
  nom:string
}



@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classes: Classe[] = [];
  selectedClasse: Classe = new Classe();
formUpdate:FormGroup
  id=this.activatedRoute.snapshot.params["id"] //t3adi fl ID fl params 

  constructor(private classeService:ClasseService,private activatedRoute:ActivatedRoute,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.getClasses(); 
    this.updatedClasse() 
    this.patchValue()

  }
  updatedClasse():void{
    this.formUpdate = this.fb.group({
      nom:['',Validators.required]
    })
  }
  patchValue():void{
    this.formUpdate.patchValue({
      nom:this.selectedClasse.nom  
    })
  }       

  getClasses(): void {
    this.classeService.getClasses().subscribe((data: Classe[]) => { 
      this.classes = data;
      console.log("listes des classe",this.classes);
      
  
    });
  }
 
  addClasse(): void {
    this.classeService.addClasse(this.selectedClasse).subscribe((classe: Classe) => {
      this.classes.push(classe);
      this.selectedClasse = new Classe();  // Réinitialiser le formulaire
    });
  }

  updateClasse(): void {
     this.classeService.updateClasse(this.id,this.formUpdate.value).subscribe((res:any) => {
      console.log("res",res);      
       this.getClasses();  // Actualiser la liste des classes
      // this.selectedClasse = new Classe();  // Réinitialiser le formulaire
    });
  }

  deleteClasse(id: number): void {
    this.classeService.deleteClasse(id).subscribe(() => {
      this.classes = this.classes.filter(classe => classe.id !== id);
    });
  }

  selectClasse(classe: Classe): void {
    this.selectedClasse = { ...classe };  
  }

  clearSelection(): void {
    this.selectedClasse = new Classe();
  }
}

