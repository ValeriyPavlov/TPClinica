export class Survey {
    questions: Question[];
  
    constructor(survey: {questions: Question[]}) {
      this.questions = survey.questions;
    }
  }
  
  export class Question {
    question: string;
    response: string;
  
    constructor(question: { question: string; response: string }) {
      this.question = question.question;
      this.response = question.response;
    }
  }
