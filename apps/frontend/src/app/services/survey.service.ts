import {
  NewSurvey,
  Question,
  Survey,
  SurveyState,
} from '@pwa-projeto-final/model';

const questions: Question[] = [
  {
    _id: '0',
    question: 'Pergunta 1',
    answers: ['Resposta 1_1', 'Resposta 1_2', 'Resposta 1_3', 'Resposta 1_4'],
    correctAnswer: 1,
  },
  {
    _id: '1',
    question: 'Pergunta 2',
    answers: ['Resposta 2_1', 'Resposta 2_2', 'Resposta 2_3', 'Resposta 2_4'],
    correctAnswer: 2,
  },
  {
    _id: '2',
    question: 'Pergunta 3',
    answers: ['Resposta 3_1', 'Resposta 3_2', 'Resposta 3_3', 'Resposta 3_4'],
    correctAnswer: 3,
  },
];

const surveys: Survey[] = [
  {
    _id: '0',
    title: 'Questionário 1',
    validity: new Date(),
    answers: 0,
    state: SurveyState.ACTIVE,
    questionIds: ['0', '1', '2'],
  },
  {
    _id: '1',
    title: 'Questionário 2',
    validity: new Date(),
    answers: 0,
    state: SurveyState.ACTIVE,
    questionIds: ['0', '1', '2'],
  },
  {
    _id: '2',
    title: 'Questionário 3',
    validity: new Date(),
    answers: 0,
    state: SurveyState.ACTIVE,
    questionIds: ['0', '1', '2'],
  },
];

export class SurveyService {
  async getAll(): Promise<Survey[]> {
    return Promise.resolve(surveys);
  }

  async create(survey: NewSurvey): Promise<Survey> {
    const _questions = survey.questions.map((question) => {
      return {
        _id: questions.length.toString(),
        ...question,
      };
    });

    questions.push(..._questions);

    const _survey = {
      _id: surveys.length.toString(),
      title: survey.title,
      validity: survey.validity,
      answers: 0,
      state: SurveyState.ACTIVE,
      questionIds: questions.map((q) => q._id),
    };

    surveys.push(_survey);

    return Promise.resolve(_survey);
  }
}
