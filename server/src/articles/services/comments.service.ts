import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(articleId: number, page: number, sort: 'asc' | 'desc' = 'desc') {
    const LIMIT = 10;

    const comments = await this.prismaService.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        createdAt: sort,
      },
      skip: (page - 1) * LIMIT,
      take: LIMIT,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
    const totalCount = await this.prismaService.comment.count({
      where: {
        articleId,
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);
    const res = {
      data: comments,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }
}
