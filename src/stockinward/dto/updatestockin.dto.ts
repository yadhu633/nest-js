import { PartialType } from '@nestjs/mapped-types';
import { CreateStockinwardDto } from './create-stockinward.dto';

export class UpdateStockinDto extends PartialType(CreateStockinwardDto) {}