import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';


@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    console.log(createBrandDto);
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }
}
