import { Survey, SurveyState } from '@pwa-projeto-final/model';

export class SurveyService {
  async getAll(): Promise<Survey[]> {
    return Promise.resolve([
      {
        _id: '01',
        title: 'Questionário 1',
        answers: 0,
        state: SurveyState.ACTIVE,
      },
      {
        _id: '02',
        title: 'Questionário 2',
        answers: 0,
        state: SurveyState.ACTIVE,
      },
      {
        _id: '03',
        title: 'Questionário 3',
        answers: 0,
        state: SurveyState.ACTIVE,
      },
    ]);
  }
}
