import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from '../product/product.schema';

@Schema()
export class Stockoutward extends Document {
 
  @Prop({ required: true,index:true })
  date: Date;

  @Prop({
    type:[{
      product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
      quantity:Number,
    }],
    required:true,
  })
  products: { product_id: mongoose.Types.ObjectId | Product, quantity: number }[];

}

export const StockoutwardSchema  = SchemaFactory.createForClass(Stockoutward);
