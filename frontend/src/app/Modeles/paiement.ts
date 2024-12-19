
export interface Paiement {
  id: number;
  date: string; 
  montantTotal: number;
  montantPaye: number;
  montantRestant: number;
  nombreDeTranches: number;
  montantParTranche: number;
  status: string; 
  etudiantId: number;
  
}
  
 