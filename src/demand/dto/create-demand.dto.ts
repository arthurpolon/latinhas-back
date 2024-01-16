import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateDemandDto {
  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseFloat(value))
  @IsInt()
  @Min(0)
  totalPlan: number;

  @IsDateString()
  date: string;
}
