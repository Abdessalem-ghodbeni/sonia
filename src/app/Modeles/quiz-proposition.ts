export class QuizProposition {
    id: number;
    description: string;
    created_at: Date;
    questionId: number | null | undefined;
    isChecked:boolean
}
