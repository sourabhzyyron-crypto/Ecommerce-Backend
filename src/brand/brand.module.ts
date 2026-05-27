import { Module } from '@nestjs/common';
import { BrandsService } from './brand.service';
import { BrandController } from './brand.controller';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [BrandsService],
})
export class BrandModule {}
