import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthenticationRequest } from '../modeles/authentication-request';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../modeles/register-request';
import { Utilisateur } from '../modeles/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationRequest> {
    return this.httpClient.post<AuthenticationRequest>(`${this.baseUrl}/login`, authenticationRequest)
  }
  register(registerRequest: any): Observable<RegisterRequest> {
    return this.httpClient.post<RegisterRequest>(`${environment.baseurl}/register`, registerRequest);
  }
  setUserToken(authenticationResponse: any) {
    localStorage.setItem("access_token", JSON.stringify(authenticationResponse))
    // localStorage.setItem('userconnect', JSON.stringify(authenticationResponse));

  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }




  // Méthode pour récupérer les rôles d'utilisateurs
  getAllUserRoles(): Observable<string[]> {
    return this.httpClient.get<any[]>(`${environment.baseurl}/roles`)
  }


  //methode pour recuperer tout les user 

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${this.baseUrl}/all`);
  }
  deleteUtilisatuer(id: number): Observable<Utilisateur> {
    return this.httpClient.delete<Utilisateur>(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}

