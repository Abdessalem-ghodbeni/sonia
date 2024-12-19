import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../Modeles/etudiant';
import { Parent } from '../Modeles/parent';
import { Enseignant } from '../Modeles/enseignant';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

// Récupérer la liste des étudiants
listEtudiants(): Observable<Etudiant[]> {
  return this.http.get<Etudiant[]>(`${this.apiUrl}/etudiants`);
}

// Récupérer la liste des parents
listParents(): Observable<Parent[]> {
  return this.http.get<Parent[]>(`${this.apiUrl}/parents`);
}

// Récupérer la liste des enseignants
listEnseignants(): Observable<Enseignant[]> {
  return this.http.get<Enseignant[]>(`${this.apiUrl}/enseignants`);
}
}



