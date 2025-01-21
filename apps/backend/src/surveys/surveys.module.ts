import { Logger, Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { SurveyEntity, SurveySchema } from './entities/survey.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles-guard';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

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
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'testSecretKey',
    }),
  ],
  controllers: [SurveysController],
  providers: [
    SurveysService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class SurveysModule {}
