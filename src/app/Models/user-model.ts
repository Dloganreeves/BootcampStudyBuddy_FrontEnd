import { FavModel } from "./fav-model";

export interface UserModel {
    id: number;
    favorites: FavModel[];
}

