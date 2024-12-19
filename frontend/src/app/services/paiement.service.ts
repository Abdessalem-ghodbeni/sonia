import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../Modeles/paiement';


@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/paiements';

  constructor(private http: HttpClient) {}

  // Générer un lien de paiement
  generatePaymentLink(etudiantId: number, montant: number): Observable<string> {
    const params = new HttpParams()
      .set('etudiant_id', etudiantId.toString())
      .set('montant', montant.toString());
    return this.http.post(`${this.apiUrl}/generatepaye`, {}, { params, responseType: 'text' });
  }

  // Vérifier l'état du paiement et procéder au paiement
  payerProcess(etudiantId: number, montant: number, paymentId: string): Observable<string> {
    const params = new HttpParams()
      .set('etudiantId', etudiantId.toString())
      .set('montant', montant.toString())
      .set('paymentId', paymentId);
    return this.http.post(`${this.apiUrl}/payerprocess`, {}, { params, responseType: 'text' });
  }

  // Obtenir les paiements d'un étudiant
  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}`);
  }
}

