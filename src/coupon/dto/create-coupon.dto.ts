import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber()
  @Min(1)
  discount!: number;

  @IsDateString()
  expiryDate!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
