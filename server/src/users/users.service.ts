import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './types/create.user';
import { EditUserDto } from './types/edit.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOneOrThrow(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        about: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

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

  async edit(id: number, dto: EditUserDto) {
    await this.getOneOrThrow(id);

    const editedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: dto,
      select: {
        id: true,
        username: true,
        fullname: true,
        about: true,
        avatarUrl: true,
      },
    });

    return editedUser;
  }
}
