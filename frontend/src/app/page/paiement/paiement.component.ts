import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../Modeles/paiement';
;

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiements: Paiement[] = []; 
  montant: number = 0;
  etudiantId: number = 0;
  Id: number = 0;
  paymentLink: string = '';
  errorMessage: string = ''; 

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  // Charger les paiements
  loadPaiements(): void {
    this.paiementService.getPaiements().subscribe(
      (data) => (this.paiements = data),
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des paiements';
        console.error(error);
      }
    );
  }

  // Générer un lien de paiement
  generatePaymentLink(): void {
    this.paiementService.generatePaymentLink(this.etudiantId, this.montant).subscribe(
      (link) => {
        this.paymentLink = link;
        this.errorMessage = ''; 
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la génération du lien de paiement';
        console.error(error);
      }
    );
  }
}
