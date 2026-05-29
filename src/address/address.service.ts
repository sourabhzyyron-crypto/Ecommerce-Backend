import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  // CREATE ADDRESS
  async create(createAddressDto: CreateAddressDto) {
    const address = await this.prisma.address.create({
      data: {
        userId: createAddressDto.userId,
        street: createAddressDto.street,
        city: createAddressDto.city,
        state: createAddressDto.state,
        country: createAddressDto.country,
        postalCode: createAddressDto.postalCode,
        isDefault: createAddressDto.isDefault ?? false,
      },
    });

    return {
      message: 'Address created successfully',
      data: address,
    };
  }

  // GET ALL ADDRESSES
  async findAll() {
    const addresses = await this.prisma.address.findMany({
      include: {
        user: true,
      },
    });

    return {
      message: 'All addresses fetched successfully',
      data: addresses,
    };
  }

  // GET SINGLE ADDRESS
  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return {
      message: 'Address fetched successfully',
      data: address,
    };
  }

  // UPDATE ADDRESS
  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const existingAddress = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }

    const updatedAddress = await this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });

    return {
      message: 'Address updated successfully',
      data: updatedAddress,
    };
  }

  // DELETE ADDRESS
  async remove(id: number) {
    const existingAddress = await this.prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }

    await this.prisma.address.delete({
      where: { id },
    });

    return {
      message: 'Address deleted successfully',
    };
  }
}