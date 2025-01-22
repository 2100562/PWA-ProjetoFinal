import { Answer, NewResult } from '@pwa-projeto-final/model';

export class CreateResultDto implements NewResult {
  surveyId: string;
  answers: Answer[];
}
