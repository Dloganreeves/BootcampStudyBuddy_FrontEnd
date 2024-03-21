import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizModel } from '../Models/quiz-model';
import { Observable } from 'rxjs';
import { FavModel } from '../Models/fav-model';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private http:HttpClient) { }

  url: string = "https://localhost:7143/api"

  GetAll():Observable<FavModel[]> {
    return this.http.get<FavModel[]>(`${this.url}/Fav`)
  }

  DeleteFav(f: FavModel):Observable<FavModel> {
    return this.http.delete<FavModel> (`${this.url}/Fav/${f.id}`)
  }

  AddFavorite(q: QuizModel):Observable<QuizModel> {
    return this.http.post<QuizModel> (`${this.url}/Fav`, q)
  }
}
