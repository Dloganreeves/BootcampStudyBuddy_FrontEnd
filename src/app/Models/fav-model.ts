import { QuizModel } from "./quiz-model";
import { UserModel } from "./user-model";
export interface FavModel {
    id: number;
    quizId: number;
    userId: number;
    quiz: QuizModel;
    user: UserModel;
}