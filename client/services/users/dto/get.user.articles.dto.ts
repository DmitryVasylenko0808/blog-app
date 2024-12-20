export type Category = {
  id: number;
  title: string;
};

export type Author = {
  id: number;
  username: string;
  avatarUrl?: string;
};

export type Article = {
  id: number;
  title: string;
  description: string;
  viewsCount: number;
  createdAt: Date;
  categoryId: number;
  category: Category;
  authorId: number;
  author: Author;

  imageUrl?: string;
};

export type GetUserArticlesDto = {
  data: Article[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
