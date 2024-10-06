import { Module } from '@nestjs/common';
import { ReguserService } from './reguser.service';
import { ReguserController } from './reguser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReguserSchema } from './reguser.schema';  // Import the schema
import { Reguser } from './reguser.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Reguser.name, schema: ReguserSchema }]),
    JwtModule.register({
      secret: 'your-secret-key', // Add your secret key
      signOptions: { expiresIn: '1h' }, // Optional: expiry time
    }),

  ],
  controllers: [ReguserController],
  providers: [ReguserService],
  exports: [ReguserService]
})
export class ReguserModule {}
