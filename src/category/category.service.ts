import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (exists) {
      throw new BadRequestException('Category already exists');
    }

    const slug = dto.name
      .toLowerCase()
      .replace(/\s+/g, '-');

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        image: dto.image,
        parentId: dto.parentId,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
  }
}