import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // Add product to cart
  async addToCart(cartItemDto: CartItemDto) {
    try {
      const { userId, productId, quantity } = cartItemDto;

      // Check product exists
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product not found`); // returns proper 404
      }

      // Find or create cart
      let cart = await this.prisma.cart.findUnique({
        where: { userId },
      });
      console.log(cart);

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: {
            userId,
          },
        });
      }

      // Check if product already exists in cart
      const existingCartItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      // If exists → update quantity
      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + quantity;

        const updatedCartItem = await this.prisma.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: updatedQuantity,
            total: updatedQuantity * product.price,
          },
        });

        return {
          message: 'Cart updated successfully',
          cartItem: updatedCartItem,
        };
      }

      // Create new cart item
      const cartItem = await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price,
          total: quantity * product.price,
        },
      });

      return {
        message: 'Product added to cart',
        cartItem,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //Get cart by user
  async getUserCart(userId: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      return cart;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Remove item from cart
  async removeCartItem(id: number) {
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: { id },
      });

      console.log(cartItem);

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      await this.prisma.cartItem.delete({
        where: { id },
      });

      return {
        message: 'Item removed from cart',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Clear cart
  async clearCart(userId: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      await this.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return {
        message: 'Cart cleared successfully',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
