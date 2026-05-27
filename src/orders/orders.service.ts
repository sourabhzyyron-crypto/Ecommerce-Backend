import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

async createOrder(
  userId: number,
  dto: CreateOrderDto,
) {
  const cart = await this.prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
  console.log('Cart:', cart); // Debug log

  if (!cart || cart.items.length === 0) {
    throw new BadRequestException(
      'Cart is empty',
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  const tax = dto.tax || 0;
  const shippingCharge =
    dto.shippingCharge || 0;

  const discount = dto.discount || 0;

  const grandTotal =
    subtotal +
    tax +
    shippingCharge -
    discount;

  const order = await this.prisma.order.create({
    data: {
      userId,
      addressId: dto.addressId,
      paymentMethod: dto.paymentMethod,
      notes: dto.notes,

      subtotal,
      tax,
      shippingCharge,
      discount,
      grandTotal,

      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
      },
    },

    include: {
      items: true,
    },
  });

  return order;
}

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    return order;
  }

  // async updateStatus(id: number, status: any) {
  //   const order = await this.prisma.order.findUnique({
  //     where: { id },
  //   });

  //   if (!order) {
  //     throw new BadRequestException('Order not found');
  //   }

  //   return this.prisma.order.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       status,
  //     },
  //   });
  // }

  // async delete(id: number) {
  //   const order = await this.prisma.order.findUnique({
  //     where: { id },
  //   });

  //   if (!order) {
  //     throw new BadRequestException('Order not found');
  //   }

  //   await this.prisma.order.delete({
  //     where: {
  //       id,
  //     },
  //   });

  //   return {
  //     message: 'Order deleted successfully',
  //   };
  // }
}