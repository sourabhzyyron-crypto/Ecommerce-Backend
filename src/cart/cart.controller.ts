import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CartService } from './cart.service';
import { AddCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add product to cart
  @Post('add')
  async addToCart(@Body() cartItemDto: AddCartDto) {
    const userId = 1;
    return this.cartService.addToCart(userId, cartItemDto);
  }

  // Get cart by userId
  @Get(':userId')
  async getUserCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getUserCart(userId);
  }

  // Remove single cart item
  @Delete('remove/:id')
  async removeCartItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeCartItem(id);
  }

  // Clear full cart
  @Delete('clear/:userId')
  async clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.clearCart(userId);
  }
}
