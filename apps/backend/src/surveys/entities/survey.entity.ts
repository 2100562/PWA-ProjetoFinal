import { Question, Survey, SurveyResult } from '@pwa-projeto-final/model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SurveyDocument = HydratedDocument<SurveyEntity>;

@Schema({ collection: 'surveys' })
export class SurveyEntity extends Document implements Survey {
  _id: string;

  @Prop({ required: true })
  questions: Question[];

  @Prop({ required: true })
  results: SurveyResult[];

  @Prop({ required: true })
  state: 'active' | 'expired';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  validity: Date;
}

export const SurveySchema = SchemaFactory.createForClass(SurveyEntity);
