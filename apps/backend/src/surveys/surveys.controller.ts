import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { RolesGuard } from '../auth/roles-guard';
import { Role } from '../auth/role';
import { Roles } from '../auth/roles-decorator';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthorizedUser } from '../auth/user-decorator';
import { User } from '../auth/entities/user.entity';

@Controller('surveys')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Roles(Role.Lecturer)
  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    createSurveyDto['state'] = 'active';
    createSurveyDto['questions'] = createSurveyDto.newQuestions.map(
      (q, idx) => {
        return {
          id: idx,
          question: q.question,
          answers: q.answers,
          correctAnswer: q.correctAnswer,
        };
      },
    );

    return this.surveysService.create(createSurveyDto);
  }

  @Roles(Role.Student, Role.Lecturer)
  @Get()
  findAll() {
    return this.surveysService.findAll();
  }

  @Roles(Role.Student, Role.Lecturer)
  @Get('/unanswered')
  findAllUnanswered(@AuthorizedUser() user: User) {
    switch (user.role) {
      case Role.Student:
        return this.surveysService.findAllUnanswered(user.username);
      case Role.Lecturer:
        return this.surveysService.findAllWithoutResults();
    }
  }

  @Roles(Role.Student, Role.Lecturer)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findOne(id);
  }

  @Roles(Role.Lecturer)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
