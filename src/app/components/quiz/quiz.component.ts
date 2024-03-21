import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizModel } from '../../Models/quiz-model';
import { QuizService } from '../../services/quiz.service';

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

displayanswer: boolean = false

constructor (private quizService: QuizService) {}

ngOnInit() {
  this.quizService.GetAll().subscribe((response: QuizModel[]) => {
   this.AllQuestions = response; 
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
}
