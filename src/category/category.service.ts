import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        category_name: createCategoryDto.category_name,
      },
    });
    console.log(createCategoryDto);

    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const category_name = createCategoryDto.category_name;

    const category_image = createCategoryDto.category_image ?? '';
    const status = createCategoryDto.status ?? true;

    return await this.prisma.category.create({
      data: {
        category_name,
        category_image,
        status,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      where: {
        status: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number) {
    try {
      return this.prisma.category.update({
        where: {
          id: id,
        },
        data: { status: false },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update category');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
