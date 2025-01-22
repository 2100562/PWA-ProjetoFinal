import { NewSurvey, Survey } from '@pwa-projeto-final/model';
import { getRequest, postRequest } from './requests';
import { api_base_url } from '../../constants';

export class SurveyService {
  async getAll(): Promise<Survey[]> {
    return getRequest(api_base_url + '/surveys');
  }

  async getAllUnanswered(): Promise<Survey[]> {
    return getRequest(api_base_url + '/surveys/unanswered');
  }

  async getOne(id: string): Promise<Survey> {
    return getRequest(api_base_url + '/surveys/' + id);
  }

  async create(newSurvey: NewSurvey): Promise<Survey> {
    return postRequest(api_base_url + '/surveys', newSurvey);
  }
}
