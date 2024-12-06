import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { ArticlesService } from './articles.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly articlesService: ArticlesService,
  ) {}

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

  async create(userId: number, articleId: number, dto: CreateCommentDto) {
    await this.articlesService.getOneOrThrow(articleId);

    const comment = await this.prismaService.comment.create({
      data: {
        ...dto,
        userId,
        articleId,
      },
    });

    return comment;
  }
}
