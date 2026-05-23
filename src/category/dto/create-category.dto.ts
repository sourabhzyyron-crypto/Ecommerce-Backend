import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateCategoryDto {
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  category_name!: string;

  // @IsNotEmpty()
  // @IsString()
  category_image?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  status?: boolean;
}
