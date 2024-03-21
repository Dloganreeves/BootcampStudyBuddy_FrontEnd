import {FavModel} from "./fav-model"
export interface QuizModel {
    id: number;
    question: string;
    answer: string;
    favorites: FavModel[];
}

