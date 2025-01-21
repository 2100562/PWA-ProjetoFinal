import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ username: loginDto.username })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await this.validatePassword(loginDto.password, user.password)) {
      return this.generateToken({ username: user.username, role: user.role });
    }

    throw new BadRequestException('Invalid login credentials');
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.hashPassword(createUserDto.password);

    await this.userModel.create(createUserDto);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(payload: {
    username: string;
    role: string;
  }): Promise<string> {
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 11);
  }
}
