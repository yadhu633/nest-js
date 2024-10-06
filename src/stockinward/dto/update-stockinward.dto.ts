import { IsNumber, IsDateString, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsString()
  productId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}

export class UpdateStockinwardDto {
  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductQuantityDto)
  products?: UpdateProductQuantityDto[];
}
