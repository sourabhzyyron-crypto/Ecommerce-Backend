import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBrandDto) {
   
    const slug = dto.name.trim().toLowerCase().replace(/\s+/g, '-');

    
    const existingBrand = await this.prisma.brand.findFirst({
      where: {
        OR: [{ name: dto.name }, { slug }],
      },
    });

    if (existingBrand) {
      throw new BadRequestException('Brand already exists');
    }

    // Create brand
    const brand = await this.prisma.brand.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
      },
    });

    return {
      message: 'Brand created successfully',
      data: brand,
    };
  }

  findAll() {
    return this.prisma.brand.findMany();
  }

  findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
    });
  }
}
