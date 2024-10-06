import { PartialType } from '@nestjs/mapped-types';
import { CreateStockoutwardDto } from './create-stockoutward.dto';

export class UpdateStockoutwardDto extends PartialType(CreateStockoutwardDto) {}
