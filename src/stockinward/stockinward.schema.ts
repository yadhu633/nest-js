import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from '../product/product.schema';

export type StockinwardDocument = Document & Stockinward;

@Schema({ timestamps: true })
export class Stockinward  {
 
  @Prop({ required: true })
  date: Date;

  @Prop({
    type: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: { product_id: mongoose.Types.ObjectId | Product; quantity: number }[];

}

export const StockinwardSchema  = SchemaFactory.createForClass(Stockinward);
