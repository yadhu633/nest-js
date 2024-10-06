import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reguser extends Document {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true})
  phone: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type ReguserDocument = Reguser & Document;

export const ReguserSchema = SchemaFactory.createForClass(Reguser);

