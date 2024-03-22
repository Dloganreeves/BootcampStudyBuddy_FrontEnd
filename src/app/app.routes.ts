import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FavComponent } from './components/fav/fav.component';

export const routes: Routes = [
    {path: "", component:LoginComponent},
    {path: "questions", component: QuizComponent },
    {path: "fav", component: FavComponent},
    {path: "**", redirectTo:"", pathMatch:"full"}
];
