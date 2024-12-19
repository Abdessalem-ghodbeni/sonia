import { QuizProposition } from "./quiz-proposition";

export class QuizQuestion {

/*    id: number;
    title: string;
    description: string;
    points: number;
    responseCorrectId?: number;
    created_at: Date; */
    id: number;
    title: string;
    description: string;
    points: number;
    createdAt: Date;
    propositions: QuizProposition[] = [];

    constructor() {
        this.id = Date.now(); // Utilisation de la date comme identifiant temporaire
      }
}
