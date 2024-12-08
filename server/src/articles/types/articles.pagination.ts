import { Article } from '@prisma/client';

type ArticleWithoutContent = Omit<Article, 'content'>;

export type ArticlesPagination = {
  data: ArticleWithoutContent[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
