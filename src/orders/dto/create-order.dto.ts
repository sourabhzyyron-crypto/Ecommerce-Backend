import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsInt()
  addressId?: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @Min(0)
  discount?: number;

  @IsOptional()
  @Min(0)
  shippingCharge?: number;

  @IsOptional()
  @Min(0)
  tax?: number;
}