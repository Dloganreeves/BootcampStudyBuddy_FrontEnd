import { QuizModel } from "./quiz-model";
export interface FavModel {
    id: number;
    quizId: number;
    userId: String;
    quiz: QuizModel;
    
}