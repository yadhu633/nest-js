import { IsNumber,  IsDateString, IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class ProductQuantityDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;
}
  export class CreateStockoutwardDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
 @ValidateNested({ each: true })
 @Type(() => ProductQuantityDto)
  products: ProductQuantityDto[];
} 

