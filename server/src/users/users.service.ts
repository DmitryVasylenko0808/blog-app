import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './types/create.user';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByUsername(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  async create(data: CreateUser) {
    const user = await this.prismaService.user.create({
      data,
      select: {
        username: true,
        fullname: true,
      },
    });

    return user;
  }
}
