import { PartialType } from '@nestjs/mapped-types';
import { CreateReguserDto } from './create-reguser.dto';

export class UpdateReguserDto extends PartialType(CreateReguserDto) {}
