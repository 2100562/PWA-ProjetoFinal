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

@Controller('surveys')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Roles(Role.Lecturer)
  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Roles(Role.Student, Role.Lecturer)
  @Get()
  findAll() {
    return this.surveysService.findAll();
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
