import {
  Answer,
  NewSurvey,
  Question,
  Survey,
  SurveyResult,
} from '@pwa-projeto-final/model';

const questions: Question[] = [
  {
    id: 0,
    question: 'Pergunta 1',
    answers: ['Resposta 1_1', 'Resposta 1_2', 'Resposta 1_3', 'Resposta 1_4'],
    correctAnswer: 0,
  },
  {
    id: 1,
    question: 'Pergunta 2',
    answers: ['Resposta 2_1', 'Resposta 2_2', 'Resposta 2_3', 'Resposta 2_4'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Pergunta 3',
    answers: ['Resposta 3_1', 'Resposta 3_2', 'Resposta 3_3', 'Resposta 3_4'],
    correctAnswer: 2,
  },
];

const answers: Answer[] = [
  {
    questionId: 0,
    answerId: 0,
  },
  {
    questionId: 1,
    answerId: 1,
  },
  {
    questionId: 2,
    answerId: 2,
  },
];

const results: SurveyResult[] = [
  {
    id: 0,
    userId: '1',
    username: 'testUser1',
    correct: 3,
    wrong: 0,
    answers: answers,
  },
  {
    id: 1,
    userId: '2',
    username: 'testUser2',
    correct: 3,
    wrong: 0,
    answers: answers,
  },
];

const surveys: Survey[] = [
  {
    _id: '0',
    title: 'Questionário 1',
    validity: new Date(),
    state: 'active',
    questions: questions,
    results: results,
  },
  {
    _id: '1',
    title: 'Questionário 2',
    validity: new Date(),
    state: 'active',
    questions: questions,
    results: results,
  },
  {
    _id: '2',
    title: 'Questionário 3',
    validity: new Date(),
    state: 'active',
    questions: questions,
    results: [],
  },
];

export class SurveyService {
  async getAll(): Promise<Survey[]> {
    return Promise.resolve(surveys);
  }

  async getAllUnanswered(): Promise<Survey[]> {
    return Promise.resolve(
      surveys.filter((s) => !s.results.find((r) => r.username === 'testUser1'))
    );
  }

  async getOne(id: string): Promise<Survey> {
    const survey = surveys.find((s) => s._id === id);

    if (!survey) {
      throw new Error('Survey not found');
    }

    return Promise.resolve(survey);
  }

  async create(newSurvey: NewSurvey): Promise<Survey> {
    const _questions = newSurvey.newQuestions.map((question, idx) => {
      return {
        id: idx,
        ...question,
      };
    });

    const survey: Survey = {
      _id: surveys.length.toString(),
      title: newSurvey.title,
      validity: newSurvey.validity,
      state: 'active',
      questions: _questions,
      results: [],
    };

    surveys.push(survey);

    return Promise.resolve(survey);
  }
}
