import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const slug = dto.title
      .toLowerCase()
      .replace(/\s+/g, '-');

    return this.prisma.product.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        price: dto.price,
        comparePrice: dto.comparePrice,
        stock: dto.stock,
        brandId: dto.brandId,
        categoryId: dto.categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        brand: true,
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        reviews: true,
      },
    });
  }
}