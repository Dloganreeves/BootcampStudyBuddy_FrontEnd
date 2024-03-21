import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizModel } from '../Models/quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  url: string = "https://localhost:7143/api"

  GetAll():Observable<QuizModel[]> {
    return this.http.get<QuizModel[]>(`${this.url}/Quiz`)
  }

  AddQuestion(q: QuizModel):Observable<QuizModel> {
    return this.http.post<QuizModel>(`${this.url}/Quiz`, q)
  }

  DeleteQuestion (q: QuizModel): Observable<QuizModel>  {
    return this.http.delete<QuizModel>(`${this.url}/Quiz/${q.id}`)
  }
}
