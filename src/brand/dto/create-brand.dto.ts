import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  name!: string;

  logo?: string;

  description?: string;
}