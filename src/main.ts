import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.use(cors({
    origin: 'http://localhost:4200', // Your Angular application URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
  }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
