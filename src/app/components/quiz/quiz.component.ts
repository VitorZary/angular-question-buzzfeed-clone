import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title: string = "";

  questions:any;
  questionSelected:any;

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  answers: string[] = [];
  answerSelected:string = "";

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      console.log(this.answers);
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers:string[]){
    let resultA:number = 0;
    let resultB:number = 0;
    for (let index = 0; index < answers.length; index++) {
      if(answers[index] === "A"){
        resultA++;
      }else if(answers[index] === "B"){
        resultB++;
      }
    }

    if(resultA > resultB)
      return "A";
    else{
      return "B";
    }
  }

}
