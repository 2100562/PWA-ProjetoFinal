import { defineStore } from 'pinia';
import { NewResult, NewSurvey, Survey } from '@pwa-projeto-final/model';
import { SurveyService } from '../api';

const surveyService = new SurveyService();

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    surveys: [] as Survey[],
    unansweredSurveys: [] as Survey[],
    currentSurvey: null as Survey | null,
  }),
  actions: {
    async fetchAllSurveys() {
      try {
        this.surveys = await surveyService.getAll();
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    },
    async fetchUnansweredSurveys() {
      try {
        this.unansweredSurveys = await surveyService.getAllUnanswered();
      } catch (error) {
        console.error('Error fetching unanswered surveys:', error);
      }
    },
    async fetchSurveyById(id: string) {
      try {
        this.currentSurvey = await surveyService.getOne(id);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    },
    async createSurvey(newSurvey: NewSurvey) {
      try {
        const createdSurvey = await surveyService.create(newSurvey);
        this.surveys.push(createdSurvey);
      } catch (error) {
        console.error('Error creating survey:', error);
      }
    },
    async createResult(newResult: NewResult) {
      try {
        await surveyService.createResult(newResult);
        await this.fetchUnansweredSurveys();
      } catch (error) {
        console.error('Error creating result:', error);
      }
    },
  },
});
