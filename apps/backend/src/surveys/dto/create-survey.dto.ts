import { NewQuestion, NewSurvey } from '@pwa-projeto-final/model';

export class CreateSurveyDto implements NewSurvey {
  newQuestions: NewQuestion[];
  title: string;
  validity: Date;
}
