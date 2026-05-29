import { Module } from '@nestjs/common';
import { CouponsService } from './coupon.service';
import { CouponsController } from './coupon.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}