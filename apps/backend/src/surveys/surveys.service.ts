import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Model } from 'mongoose';
import { SurveyEntity } from './entities/survey.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from '@pwa-projeto-final/model';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(SurveyEntity.name)
    private surveyModel: Model<SurveyEntity>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyModel.create(createSurveyDto);
  }

  async createResult(
    user: string,
    createResultDto: CreateResultDto,
  ): Promise<Survey> {
    const id = createResultDto.surveyId;

    const survey = await this.findOne(id);

    if (!survey) {
      throw new NotFoundException('No such survey found');
    }

    let correct = 0;
    let wrong = 0;

    createResultDto.answers.forEach((answer) => {
      if (
        survey.questions[answer.questionId].correctAnswer === answer.answerId
      ) {
        correct++;
      } else {
        wrong++;
      }
    });

    const result = {
      username: user,
      correct,
      wrong,
      answers: createResultDto.answers,
    };

    return this.surveyModel
      .findByIdAndUpdate(
        { _id: id },
        { $push: { results: result } },
        {
          new: true,
        },
      )
      .exec();
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  async findAllWithoutResults(): Promise<Survey[]> {
    return this.surveyModel
      .find({ $or: [{ results: null }, { results: { $size: 0 } }] })
      .exec();
  }

  async findAllUnanswered(username: string): Promise<Survey[]> {
    return this.surveyModel
      .find({
        results: {
          $not: {
            $elemMatch: {
              username: username,
            },
          },
        },
      })
      .exec();
  }

  async findOne(id: string): Promise<Survey | null> {
    return this.surveyModel.findOne({ _id: id }).exec();
  }

  async remove(id: string): Promise<Survey | null> {
    return this.surveyModel.findByIdAndDelete({ _id: id }).exec();
  }
}
