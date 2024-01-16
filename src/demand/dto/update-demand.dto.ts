import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandDto } from './create-demand.dto';
import { IsIn } from 'class-validator';

export class UpdateDemandDto extends PartialType(CreateDemandDto) {
  @IsIn(['planning', 'in_progress', 'completed'])
  status: 'planning' | 'in_progress' | 'completed';
}
