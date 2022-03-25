import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetTodoPaginationDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  skip?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 50;
}
