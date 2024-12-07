import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from '../dto/create.comment.dto';
import { ArticlesService } from './articles.service';
import { EditCommentDto } from '../dto/edit.comment.dto';

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
        parentId: null,
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
        _count: true,
      },
    });
    const totalCount = await this.prismaService.comment.count({
      where: {
        articleId,
        parentId: null,
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

  async edit(articleId: number, commentId: number, dto: EditCommentDto) {
    await this.articlesService.getOneOrThrow(articleId);
    await this.getOneOrThrow(commentId);

    const comment = await this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...dto,
      },
    });

    return comment;
  }

  async delete(articleId: number, commentId: number) {
    await this.articlesService.getOneOrThrow(articleId);
    await this.getOneOrThrow(commentId);

    const comment = await this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });

    return comment;
  }

  async getReplies(articleId: number, commentId: number) {
    await this.articlesService.getOneOrThrow(articleId);
    await this.getOneOrThrow(commentId);

    const replies = await this.prismaService.comment.findMany({
      where: {
        parentId: commentId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: true,
      },
    });

    return replies;
  }

  private async getOneOrThrow(commentId: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }

    return comment;
  }
}
