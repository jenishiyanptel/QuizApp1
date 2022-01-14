import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
public name!:string;
public questionlist:any=[];
public currentquestion:number=0;
public points:number=0;
counter=60;
correctanswer:number=0;
incorrectanswer:number=0;
intervals:any=0;
Progress:string="0";
isQuizCompleted:boolean=false;
  constructor(private service:QuestionService) {
   
   }
   
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startcounter();
  }
getAllQuestions(){
  this.service.getQuestionJson().subscribe(res=>{
    this.questionlist=res.questions;
  })
}
nextQuestion(){
  this.currentquestion++;
}
previousQuestion(){
  this.currentquestion--;
}
Answer(currentQno:number,option:any){
  if(currentQno==this.questionlist.length){
    this.isQuizCompleted=true;
    this.stopcounter();
  }
if(option.correct){
  this.points+=10;
  this.correctanswer++;
  setTimeout(()=>{
    this.currentquestion++;
    this.resetthecounter();
    this.getProgresspercent();
      },1000);
 
}else{

  setTimeout(()=>{
    this.points-=10;
  this.incorrectanswer++;
  this.currentquestion++;
  this.resetthecounter();
  this.getProgresspercent();
      },1000);
  
}


}
startcounter(){
  this.intervals=interval(1000).subscribe(val=>{
    this.counter--;
    if(this.counter==0){
      this.currentquestion++;
      this.counter=60;
      this.points-=10;
    }
  });
  setTimeout(()=>{
this.intervals.unsubscribe();
  },600000);
}
stopcounter(){
  this.intervals.unsubscribe();
  this.counter=0;
}
resetthecounter(){
  this.stopcounter();
  this.counter=60;
  this.startcounter();
}
resetQuiz(){
  this.resetthecounter();
  this.getAllQuestions();
  this.points=0;
  this.counter=60;
  this.currentquestion=0;
  this.Progress="0";
}
getProgresspercent(){
  this.Progress=((this.currentquestion/this.questionlist.length)*100).toString();
  return this.Progress;
}
}
