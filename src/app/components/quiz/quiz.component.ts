import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizModel } from '../../Models/quiz-model';
import { QuizService } from '../../services/quiz.service';
import { FavService } from '../../services/fav.service';
import { FavModel } from '../../Models/fav-model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
    AllQuestions: QuizModel[] = [];
    QuestionForm: QuizModel = {} as QuizModel

    showHideAnswer: boolean = false
    selectedQuiz: QuizModel = {} as QuizModel

    @Output() createEvent = new EventEmitter<FavModel>();

    constructor (private quizService: QuizService, private favService: FavService) {}

    ngOnInit() {
      this.quizService.GetAll().subscribe((response: QuizModel[]) => {
      this.AllQuestions = response; 

      console.log("QUESTIONS " + this.AllQuestions[0]);
      })

      this.favService.GetAll().subscribe((response: FavModel[]) => {

  
        console.log("Faves " + response);
        })

    }

    deleteQuestion(q: QuizModel) {
      let index: number = this.AllQuestions.findIndex(x => x == q)
      this.AllQuestions.splice(index,1);
      this.quizService.DeleteQuestion(q).subscribe()
    }

    AddQuestion(q: QuizModel):void {
      this.AllQuestions.push(q)
    };

    DisplayAnswer(q: QuizModel){
      this.selectedQuiz = q;
      this.showHideAnswer = !this.showHideAnswer
    }

    // AddFavorite(q: FavModel){
    //   this.favService.AddFavorite(q).subscribe((fave : FavModel) => {
    //     this.createEvent.emit(fave);
    //   });
    // }

    // AddOrder():void {
    //   this.orderService.addOrder(this.formOrder).subscribe((response:Order) => {
    //     this.createEvent.emit(response);
    //   } )
}
