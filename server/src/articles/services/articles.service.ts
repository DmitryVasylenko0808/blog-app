import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRecently(page: number, categoriesIds?: string) {
    const LIMIT = 8;

    const parsedCategoriesIds = categoriesIds
      ?.split(',')
      .map((categoryId) => parseInt(categoryId));

    const articles = await this.prismaService.article.findMany({
      where: {
        categoryId: {
          in: parsedCategoriesIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * LIMIT,
      take: LIMIT,
      include: {
        author: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
        category: true,
      },
    });

    const totalCount = await this.prismaService.article.count({
      where: {
        categoryId: {
          in: parsedCategoriesIds,
        },
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);
    const res = {
      data: articles,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }
}
