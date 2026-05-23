import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { UpdateCategoryDto } from './dto/update-category.dto';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads/',
        
        filename: (req, file, callback) => {
          console.log(file);
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    console.log(file.filename);
    createCategoryDto.category_image = file.filename;

    return this.categoryService.create(createCategoryDto);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.categoryService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
