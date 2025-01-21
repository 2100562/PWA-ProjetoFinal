import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Model } from 'mongoose';
import { SurveyEntity } from './entities/survey.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from '@pwa-projeto-final/model';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(SurveyEntity.name)
    private surveyModel: Model<SurveyEntity>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyModel.create(createSurveyDto);
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  async findOne(id: string): Promise<Survey | null> {
    return this.surveyModel.findOne({ _id: id }).exec();
  }

  async remove(id: string): Promise<Survey | null> {
    return this.surveyModel.findByIdAndDelete({ _id: id }).exec();
  }
}
