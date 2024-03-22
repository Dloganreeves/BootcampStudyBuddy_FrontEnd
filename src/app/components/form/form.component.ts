import { Component, EventEmitter, Output } from '@angular/core';
import { QuizModel } from '../../Models/quiz-model';
import { QuizService } from '../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormComponent, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  newQuiz : QuizModel = {} as QuizModel;

  constructor(private quizService: QuizService, private quizPage: QuizComponent){}

  @Output() createEvent = new EventEmitter<QuizModel>();

  addQuiz():void {
    this.quizService.AddQuestion(this.newQuiz).subscribe((response : QuizModel) => {
      //console.log(response);
      this.createEvent.emit(response);
    })
  }
}
