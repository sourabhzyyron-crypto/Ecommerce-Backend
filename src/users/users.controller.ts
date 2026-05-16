import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser() {
    return this.usersService.createUser();
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}