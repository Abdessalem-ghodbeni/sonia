import { QuizQuestion } from "./quiz-question";

export class QuizForm {
    id: number;
    description: string;
    createdAt: string; // format date ISO
    lastUpdatedAt: string; // format date ISO
    quizQuestions: QuizQuestion[];
}