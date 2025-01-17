import { Logger, Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { SurveyEntity, SurveySchema } from './entities/survey.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SurveyEntity.name,
        useFactory: () => {
          const schema = SurveySchema;

          schema.post('save', (next: { _doc: Document }) => {
            Logger.debug(`MongoDB Saving Survey ${JSON.stringify(next._doc)}`);
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
