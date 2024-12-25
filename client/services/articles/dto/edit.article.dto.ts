export type Category = {
  id: number;
  title: string;
};

export type Author = {
  id: number;
  username: string;
  avatarUrl?: string;
};

export type ArticleDetails = {
  id: number;
  title: string;
  description: string;
  content: string;
  viewsCount: number;
  createdAt: Date;
  categoryId: number;
  category: Category;
  authorId: number;
  author: Author;
  imageUrl?: string;
};

export type EditArticleDto = ArticleDetails;
