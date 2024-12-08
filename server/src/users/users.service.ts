import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './types/create.user';
import { EditUserDto } from './types/edit.user.dto';
import { ArticlesStatsService } from 'src/articles/services/articles.stats.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly articlesStatsService: ArticlesStatsService,
  ) {}

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

  async getTop() {
    const topSummaryViews = await this.articlesStatsService.getTopSummaryViews(3);
    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: topSummaryViews.usersIds,
        },
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        avatarUrl: true,
      },
    });

    const res = users
      .map((user) => ({ ...user, viewCount: topSummaryViews.stats[user.id] }))
      .sort((a, b) => (a.viewCount < b.viewCount ? 1 : -1));

    return res;
  }

  async create(data: CreateUser) {
    const user = await this.prismaService.user.create({
      data,
      select: {
        id: true,
        username: true,
        fullname: true,
        avatarUrl: true,
      },
    });

    return user;
  }

  async edit(id: number, dto: EditUserDto, filename?: string) {
    await this.getOneOrThrow(id);

    const editedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...dto,
        avatarUrl: filename,
      },
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
