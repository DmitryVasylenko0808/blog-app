import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ArticlesPagination } from '../types/articles.pagination';

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
    const res: ArticlesPagination = {
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
            avatarUrl: true,
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

  async getRelated(id: number) {
    const LIMIT = 2;

    const article = await this.getOneOrThrow(id);
    const relatedArticles = await this.prismaService.article.findMany({
      where: {
        id: {
          not: id,
        },
        categoryId: article.categoryId,
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
            fullname: true,
          },
        },
        category: true,
      },
    });
    const articlesWithoutContent = this.formatArticleWithoutContent(relatedArticles);

    return articlesWithoutContent;
  }

  async search(title: string, page: number) {
    const LIMIT = 10;

    const articles = await this.prismaService.article.findMany({
      where: {
        title: {
          startsWith: title,
          mode: 'insensitive',
        },
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
    const articlesWithoutContent = this.formatArticleWithoutContent(articles);
    const totalCount = await this.prismaService.article.count({
      where: {
        title: {
          startsWith: title,
          mode: 'insensitive',
        },
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);
    const res: ArticlesPagination = {
      data: articlesWithoutContent,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async getByUser(userId: number, page: number) {
    const LIMIT = 8;

    const articles = await this.prismaService.article.findMany({
      where: {
        authorId: userId,
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
    const articlesWithoutContent = this.formatArticleWithoutContent(articles);
    const totalCount = await this.prismaService.article.count({
      where: {
        authorId: userId,
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);
    const res: ArticlesPagination = {
      data: articlesWithoutContent,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async getByCategory(categoryId: number, page: number) {
    const LIMIT = 10;

    const articles = await this.prismaService.article.findMany({
      where: {
        categoryId,
      },
      skip: (page - 1) * LIMIT,
      take: LIMIT,
      orderBy: {
        createdAt: 'desc',
      },
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
    const totalCount = await this.prismaService.article.count({
      where: {
        categoryId,
      },
    });
    const totalPages = Math.ceil(totalCount / LIMIT);
    const res: ArticlesPagination = {
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
