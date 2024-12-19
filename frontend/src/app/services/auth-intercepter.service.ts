import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../Modeles/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {


  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticationResponse: AuthenticationResponse = {
      access_token: ''    
    }; 

    const accessToken = localStorage.getItem("access_token");      
    if (accessToken) {
      try {
        authenticationResponse = JSON.parse(accessToken);
        req = req.clone({
          headers: new HttpHeaders({
            Authorization: "Bearer " + authenticationResponse.access_token
          })
        });
      } catch (error) {
        console.error("Error parsing access token from localStorage:", error);
      }
    }    

    return next.handle(req);
  }
}   
