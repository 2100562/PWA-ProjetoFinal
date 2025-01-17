import { Logger, Module } from '@nestjs/common';
import { SurveysModule } from './surveys/surveys.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    SurveysModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => Logger.log('MongoDB connected'));
          connection.on('open', () => Logger.log('MongoDB connection open'));
          connection.on('disconnected', () =>
            Logger.log('MongoDB disconnected')
          );
          connection.on('reconnected', () => Logger.log('MongoDB reconnected'));
          connection.on('disconnecting', () =>
            Logger.log('MongoDB disconnecting')
          );

          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
