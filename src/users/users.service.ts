import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log('Existing user:', existingUser); // Debug log

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;
    return result;
  }
  async loginUser(loginUserDto: LoginUserDto) {
   
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ConflictException('Invalid email or password');
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    const token = await this.jwtService.signAsync(payload);

    const { password: _, ...result } = user;
    return { ...result, token, message: 'Login successful' };
  }
}
