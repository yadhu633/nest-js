import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reguser, ReguserDocument } from 'src/reguser/reguser.schema';
import * as bcrypt from 'bcrypt';  

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Reguser.name) private reguserModel: Model<ReguserDocument>, 
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    if (username.trim() === '' || password.trim() === '') {
      throw new BadRequestException('Username or password cannot be empty');
    }

    const userCount = await this.reguserModel.countDocuments();

    if (userCount === 0) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('admin@123', saltRounds);  

      const newUser = new this.reguserModel({
        fullname: 'Admin', 
        username: 'admin',
        email: 'admin@example.com',
        phone: '9061736024',
        password: hashedPassword, 
      });

      await newUser.save();
      console.log(`Admin user created as the first user in the system.`);
    }

    next();
  }
}
