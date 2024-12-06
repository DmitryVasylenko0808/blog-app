import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFeatured() {
    const LIMIT = 4;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const dateFrom = new Date(currentYear, currentMonth);
    const dateTo = new Date(currentYear, currentMonth + 1);

    const articles = await this.prismaService.article.findMany({
      where: {
        createdAt: {
          gte: dateFrom,
          lt: dateTo,
        },
      },
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

  async getOneOrThrow(id: number) {
    const article = await this.prismaService.article.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullname: true,
          },
        },
        category: true,
      },
    });

    if (!article) {
      throw new NotFoundException('Article is not found');
    }

    return article;
  }

  private formatArticleWithoutContent(articles: Article[]) {
    const articlesWithoutContent = articles.map((a) => {
      const { content, ...item } = a;

      return item;
    });

    return articlesWithoutContent;
  }
}
