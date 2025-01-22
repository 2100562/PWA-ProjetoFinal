export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface Answer {
  questionId: number;
  answerId: number;
}

export interface SurveyResult {
  username: string;
  correct: number;
  wrong: number;
  answers: Answer[];
}

export interface NewResult extends Partial<SurveyResult> {
  surveyId: string;
  answers: Answer[];
}

export interface Survey {
  _id: string;
  title: string;
  validity: Date;
  state: 'active' | 'expired';
  questions: Question[];
  results: SurveyResult[];
}

export interface NewQuestion extends Partial<Question> {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface NewSurvey extends Partial<Survey> {
  title: string;
  validity: Date;
  newQuestions: NewQuestion[];
}
