import { Injectable } from '@nestjs/common';
import { CreateReguserDto } from './dto/create-reguser.dto';
import { UpdateReguserDto } from './dto/update-reguser.dto';
import { InjectModel } from '@nestjs/mongoose';  // Import InjectModel here
import { Reguser } from './reguser.schema';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ReguserService {
  constructor(
    @InjectModel(Reguser.name) private ReguserModel: Model<Reguser>,
  private readonly jwtService:JwtService
  ) {}

  async create(createReguserDto: CreateReguserDto): Promise<Reguser> {
    try {
      // Logging to check the data being passed
      console.log('Data received:', createReguserDto);
  
      // Convert the DTO into a plain object and create a new user
      const createdUser = new this.ReguserModel(createReguserDto);
      
      return await createdUser.save();
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  
  }
  
  
  async findAll(): Promise<Reguser[]> {
    return this.ReguserModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} reguser`;
  }

  update(id: number, updateReguserDto: UpdateReguserDto) {
    return `This action updates a #${id} reguser`;
  }

  remove(id: number) {
    return `This action removes a #${id} reguser`;
  }

  async findByname(username: string): Promise<Reguser | null> {
    return this.ReguserModel.findOne({ username }).exec();
  }
}
