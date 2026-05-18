import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ProductsModule,
    PrismaModule,
    UsersModule,
    JwtModule.register({
      global: true, 
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
