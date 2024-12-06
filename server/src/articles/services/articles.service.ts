import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPopular() {
    const LIMIT = 6;

    const articles = await this.prismaService.article.findMany({
      orderBy: {
        viewsCount: 'desc',
      },
      take: LIMIT,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        category: true,
      },
    });

    const articlesWithoutContent = this.formatArticleWithoutContent(articles);

    return articlesWithoutContent;
  }

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
            id: true,
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
    const articlesWithoutContent = this.formatArticleWithoutContent(articles);
    const res = {
      data: articlesWithoutContent,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  private formatArticleWithoutContent(articles: Article[]) {
    const articlesWithoutContent = articles.map((a) => {
      const { content, ...item } = a;

      return item;
    });

    return articlesWithoutContent;
  }
}
