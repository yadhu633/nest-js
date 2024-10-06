import { Controller, Post, Body } from '@nestjs/common';
import { Reguser } from 'src/reguser/reguser.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('login')
export class LoginController {
  constructor(
    @InjectModel(Reguser.name) private reguserModel: Model<Reguser>
  ) {}

  @Post()
  async login(@Body() body: any): Promise<any> {
    const { username, password } = body;

    const user = await this.reguserModel.findOne({ username });

    if (!user || user.password !== password) {
      return { message: 'Invalid username or password' };
    }

    return { message: `Welcome ${username}` };
  }
}
