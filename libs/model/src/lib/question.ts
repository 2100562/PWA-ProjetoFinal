export interface Question {
  _id: string;
  question: string;
  answers: string[];
  correctAnswer: undefined | number;
}

export interface NewQuestion extends Partial<Question> {
  question: string;
  answers: string[];
  correctAnswer: undefined | number;
}
