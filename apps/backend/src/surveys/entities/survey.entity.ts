import { Question, Survey, SurveyResult } from '@pwa-projeto-final/model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'surveys' })
export class SurveyEntity
  extends Document<string, never, Survey>
  implements Survey
{
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
