import { Classe } from "./classe";
import { Enseignant } from "./enseignant";
import { Utilisateur } from "./utilisateur";

export class Cour {
    id:Number
  titre!:String;
  description!:string;
  datedebut!:Date;
  datefin!:Date
  enseignantId!:Enseignant
  classeId!:Classe
  
}
