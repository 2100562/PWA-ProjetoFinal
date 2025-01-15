export enum SurveyState {
  ACTIVE = 'active',
  EXPIRED = 'expired',
}

export interface Survey {
  _id: string;
  title: string;
  answers: number;
  state: SurveyState;
}
