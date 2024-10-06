import { IsNumber, isString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productname: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}