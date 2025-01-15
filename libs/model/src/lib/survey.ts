import { NewQuestion } from './question';

export enum SurveyState {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export interface Survey {
  _id: string;
  title: string;
  validity: Date;
  answers: number;
  state: SurveyState;
  questionIds: string[];
}

export interface NewSurvey extends Partial<Survey> {
  title: string;
  validity: Date;
  questions: NewQuestion[];
}
