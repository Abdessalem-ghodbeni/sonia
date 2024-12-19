import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationResponse } from '../Modeles/authentication-response';
import { AuthenticationRequest } from '../Modeles/authentication-request';
import { RegisterRequest } from '../Modeles/register-request';
import { Utilisateur } from '../Modeles/utilisateur';

@Injectable({
  providedIn: 'root' 
}) 
export class AuthService {     

  constructor(private httpClient:HttpClient) { } 

  login(authenticationRequest : AuthenticationRequest):Observable<AuthenticationRequest>{ 
    return this.httpClient.post<AuthenticationRequest>(`${environment.baseurl}/login`,authenticationRequest)
  }
  register(registerRequest: any): Observable<RegisterRequest> { 
   /*  const headers = new HttpHeaders({  
      'Content-Type': 'application/json'
    }); */
    return this.httpClient.post<RegisterRequest>(`${environment.baseurl}/register`, registerRequest /*, { headers: headers }*/);
  }
  setUserToken (authenticationResponse: AuthenticationResponse ){
    localStorage.setItem("access_token",JSON.stringify(authenticationResponse))
   // localStorage.setItem('userconnect', JSON.stringify(authenticationResponse));

  }
  isLoggedIn(): boolean {     
    return !!localStorage.getItem("access_token");
  }
  getAllRoles():Observable<Utilisateur[]>{
    return this.httpClient.get<Utilisateur[]>(`${environment.baseurl}/roles`)
  }
  getAllUtilisateur():Observable<Utilisateur[]>{
    return this.httpClient.get<Utilisateur[]>(`${environment.baseurl}/all`)
  }


  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseurl}/forgot-password`, { email });
  }
  
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseurl}/reset-password`, { token, newPassword });
  }
  



}         
