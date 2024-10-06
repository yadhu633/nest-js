  import { Controller, Get, Post, Body, Patch, Param, Delete,UnauthorizedException, Res  } from '@nestjs/common';
  import { ReguserService } from './reguser.service';
  import { CreateReguserDto } from './dto/create-reguser.dto';
  import { UpdateReguserDto } from './dto/update-reguser.dto';
  import * as bcrypt from 'bcrypt';
  import { IsStrongPassword } from 'class-validator';
  import { LoginReguserDto } from './dto/login-reguser.dto';
  import { JwtService } from '@nestjs/jwt';
  import { Response } from 'express';
  import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard  } from 'src/auth/jwt-auth/jwt-auth.guard';

  @Controller('reguser')
  export class ReguserController {
    constructor(private readonly reguserService: ReguserService,
      private jwtScervice:JwtService,)
    {}

    @UseGuards(JwtAuthGuard)  // Protect this route 
    @Post('/reguser')
    async create(@Body() createReguserDto: CreateReguserDto) {
      const hashedpassword=await bcrypt.hash(createReguserDto.password,10)
      createReguserDto.password = hashedpassword;

      return this.reguserService.create(createReguserDto);
    }

  @Post('/login')
  async login(@Body() loginReguserDto: LoginReguserDto, @Res() response: Response) {
    try {
      const user = await this.reguserService.findByname(loginReguserDto.username);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordMatching = await bcrypt.compare(loginReguserDto.password, user.password);

      if (!isPasswordMatching) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const jwt = await this.jwtScervice.signAsync({ id: user.id });
      console.log('Generated JWT:', jwt); 
      // Send the token in the response
      response.json({ token: jwt });
    } catch (error) {
      console.error('Login error:', error);
      response.status(401).json({ message: 'Internal server error' });
    }
  }


  @UseGuards(JwtAuthGuard)  // Protect this route 
   @Get('/findall')
    findAll() {
      return this.reguserService.findAll();
    }

    @UseGuards(JwtAuthGuard)  // Protect this route
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.reguserService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReguserDto: UpdateReguserDto) {
      return this.reguserService.update(+id, updateReguserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.reguserService.remove(+id);
    }
  }
