import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBrandDto) {
    const exists = await this.prisma.brand.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (exists) {
      throw new BadRequestException('Brand already exists');
    }

    const slug = dto.name.toLowerCase().replace(/\s+/g, '-');

    return this.prisma.brand.create({
      data: {
        name: dto.name,
        slug,
        logo: dto.logo,
        description: dto.description,
      },
    });
  }

  findAll() {
    return this.prisma.brand.findMany();
  }
}
