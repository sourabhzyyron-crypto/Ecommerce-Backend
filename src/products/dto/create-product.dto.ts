import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price!: number;
}