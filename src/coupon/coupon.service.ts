import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCouponDto) {
    const existingCoupon = await this.prisma.coupon.findUnique({
      where: {
        code: dto.code,
      },
    });

    if (existingCoupon) {
      throw new BadRequestException('Coupon already exists');
    }

    return this.prisma.coupon.create({
      data: {
        code: dto.code,
        discount: dto.discount,
        expiryDate: new Date(dto.expiryDate),
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.coupon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    return coupon;
  }
}
