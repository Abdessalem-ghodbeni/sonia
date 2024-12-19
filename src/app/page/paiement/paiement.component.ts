import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../Modeles/paiement';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-paiement',
  imports: [ReactiveFormsModule],
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
  standalone: true,
})
export class PaiementComponent implements OnInit {
  paiements: Paiement[] = [];
  montant: number = 0;
  etudiantId: number = 0;
  Id: number = 0;
  paymentLink: string = '';
  errorMessage: string = '';
  selectedCard: string = '';

  selectCard(cardType: string) {
    this.selectedCard = cardType;
  }
  // constructor(private paiementService: PaiementService) {}

  paymentForm: FormGroup;
  paymentLlink: string | null = null;

  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService
  ) {
    this.paymentForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(1)]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  etudiant_id!: number;
  showModal: boolean = false;
  paymentLinkExtracted!: string;
  extractPaymentLink(apiResponse: string): string {
    const regex = /(https?:\/\/[^\s]+)/; // Expression régulière pour capturer le lien
    const match = apiResponse.match(regex); // Trouver la correspondance
    return match ? match[0] : ''; // Retourner le lien s'il existe, sinon une chaîne vide
  }

  onSubmit() {
    const formData = new FormData();

    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };
    const userData = localStorage.getItem('user'); // Récupérer les données du localStorage

    if (userData) {
      const parsedUserData = JSON.parse(userData); // Convertir les données en objet JS
      this.etudiant_id = parsedUserData.id; // Affecter le rôle récupéré
    } else {
      console.log("Aucune donnée trouvée dans le localStorage pour 'user'.");
    }
    addValueToFormData('etudiant_id', this.etudiant_id);
    addValueToFormData('montant', this.paymentForm.get('montant')?.value);

    if (this.paymentForm.valid) {
      const { montant } = this.paymentForm.value;

      // Appel au service pour générer le lien de paiement
      this.paiementService.generatePaymentLinkk(formData).subscribe({
        next: (link) => {
          // this.paymentLlink = link as any;
          this.paymentLinkExtracted = this.extractPaymentLink(link); // Extraire le lien
          if (this.paymentLinkExtracted) {
            console.log(this.paymentLinkExtracted);
          }
          this.showModal = true;
        },
        error: (err) => {
          console.error('Erreur de génération du lien de paiement:', err);
          alert('Échec de la génération du lien de paiement.');
        },
      });
    }
  }
  closeModal() {
    this.showModal = false; // Fermer le modal
  }
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
    this.paiementService
      .generatePaymentLink(this.etudiantId, this.montant)
      .subscribe(
        (link) => {
          this.paymentLink = link;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage =
            'Erreur lors de la génération du lien de paiement';
          console.error(error);
        }
      );
  }
}
