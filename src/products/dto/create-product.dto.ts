import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(1)
  price!: number;

  @IsOptional()
  comparePrice?: number;

  @IsNumber()
  stock!: number;

  @IsOptional()
  brandId?: number;

  @IsOptional()
  categoryId?: number;
}