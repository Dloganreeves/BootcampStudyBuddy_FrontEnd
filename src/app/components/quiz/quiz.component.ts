import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizModel } from '../../Models/quiz-model';
import { QuizService } from '../../services/quiz.service';
import { FavService } from '../../services/fav.service';
import { FavModel } from '../../Models/fav-model';
import { FavDtoModel } from '../../Models/fav-dto-model';
import { FormComponent } from '../form/form.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, FormComponent, RouterOutlet, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
    AllQuestions: QuizModel[] = [];
    QuestionForm: QuizModel = {} as QuizModel
    AllFavorites: FavModel[] = []
    showHideAnswer: boolean = false
    selectedQuiz: QuizModel = {} as QuizModel
    user: SocialUser = {} as SocialUser;
    loggedIn: boolean = false;
  
  
    constructor (private quizService: QuizService, private favService: FavService, 
      private socialAuthServiceConfig: SocialAuthService, private router: Router) {}

    ngOnInit() {
      this.quizService.GetAll().subscribe((response: QuizModel[]) => {
        this.AllQuestions = response; 
      })
      this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
        this.user = userResponse;
        //if login fails, it will return null.
        this.loggedIn = (userResponse != null);


      });
    }

    deleteQuestion(q: QuizModel) {
      let index: number = this.AllQuestions.findIndex(x => x == q)
      this.AllQuestions.splice(index,1);
      this.quizService.DeleteQuestion(q).subscribe()
    }

    addQuiz(q: QuizModel):void {
      this.AllQuestions.push(q);
    }

    DisplayAnswer(q: QuizModel){
      this.selectedQuiz = q;
      this.showHideAnswer = !this.showHideAnswer
    }

    AddFavorite(q: QuizModel){
      console.log(q)
      // update database
      let fav:FavDtoModel = {} as FavDtoModel
      fav.quizID = q.id
      fav.userID = this.user.id
      console.log(fav)
      this.favService.AddFavorite(fav).subscribe((response: FavModel) => {
        this.AllFavorites.push(response)
        //confirm by hiding answer
        this.showHideAnswer = false;
      })
    };
    signOut(): void {
      this.socialAuthServiceConfig.signOut();
      this.router.navigate([""]); 
    }
}

    

